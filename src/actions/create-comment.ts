"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
    body: z.string().min(1)
});

type CreateCommentFormState = {
    errors: {
        body?: string[],
        formErrors?: string[]
    }
}

export const createComment = async (articleId: string, prevState: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> => {
    const result = createCommentSchema.safeParse({ body: formData.get("body") });
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ["You must be logged in to comment"]
            }
        }
    }

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
        return {
            errors: {
                formErrors: ["User not found"]
            }
        }
    }

    try {
        await prisma.comment.create({
            data: {
                body: result.data.body,
                articleId,
                authorId: user.id
            }
        });
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
                    formErrors: ["An error occurred while creating the comment"]
                }
            }
        }
    }

    revalidatePath(`/articles/${articleId}`);
    return { errors: {} };
}