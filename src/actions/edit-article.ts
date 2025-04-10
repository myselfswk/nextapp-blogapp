"use server"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const editArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z.string().min(10),
});

// In Typesript, we have to provide a return to return response
type EditArticleFormState = {
    errors: {
        title?: string[],
        category?: string[],
        content?: string[],
        featuredImage?: string[],
        formErrors?: string[]
    }
}

export const editArticle = async (
    articleId: string,
    prevState: EditArticleFormState,
    formData: FormData
): Promise<EditArticleFormState> => {
    const result = editArticleSchema.safeParse({
        title: formData.get("title"),
        category: formData.get("category"),
        content: formData.get("content")
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ["You must be logged in to create an article"]
            }
        }
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!user) {
        return {
            errors: {
                formErrors: ["User not found"]
            }
        }
    }

    const article = await prisma.articles.findUnique({
        where: {
            id: articleId
        }
    });
    if (!article) {
        return {
            errors: {
                formErrors: ["Article not found"]
            }
        }
    }
    if (article.authorId !== user.id) {
        return {
            errors: {
                formErrors: ["You are not authorized to edit this article"]
            }
        }
    }

    let imageUrl = article.featuredImage;
    // Start Creating the article
    const imageFile = formData.get("featuredImage") as File | null;
    if (imageFile && imageFile.name !== "undefined") {
        try {
            const arrayBuffer = await imageFile!.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                uploadStream.end(buffer);
            });
            if (uploadResponse?.secure_url) {
                imageUrl = uploadResponse.secure_url;
            } else {
                return {
                    errors: {
                        featuredImage: ["Image upload failed, Please Try Again"]
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    errors: {
                        formErrors: [error.message]
                    }
                }
            } else {
                return {
                    errors: { formErrors: ["Error uploading image. Please try again."] },
                };
            }
        }
    }

    try {
        await prisma.articles.update({
            where: { id: articleId },
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formErrors: ["Something went wrong, Please try again"]
                }
            }
        }
    }

    // Redirect to dashboard after creating the article, revaliate to update article data on dashboard
    revalidatePath("/dashboard");
    redirect("/dashboard");
}