// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { z } from "zod";
// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// // ✅ Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Zod validation schema for Project
// const createProjectSchema = z.object({
//     title: z.string().min(3, "Title must be at least 3 characters").max(100),
//     description: z.string().min(10, "Description must be at least 10 characters"),
//     githubUrl: z.string().url("Enter a valid GitHub URL").optional().or(z.literal("")),
//     liveUrl: z.string().url("Enter a valid Live URL").optional().or(z.literal("")),
//     techStack: z.string().min(2, "Tech stack is required").max(200),
// });

// // ✅ TypeScript type for error state
// type CreateProjectFormState = {
//     errors: {
//         title?: string[];
//         description?: string[];
//         githubUrl?: string[];
//         liveUrl?: string[];
//         techStack?: string[];
//         projectImage?: string[];
//         formErrors?: string[];
//     };
// };

// // ✅ Server Action: Add Project
// export const addProject = async (
//     prevState: CreateProjectFormState,
//     formData: FormData
// ): Promise<CreateProjectFormState> => {
//     // Validate incoming form data
//     const result = createProjectSchema.safeParse({
//         title: formData.get("title"),
//         description: formData.get("description"),
//         githubUrl: formData.get("githubUrl"),
//         liveUrl: formData.get("liveUrl"),
//         techStack: formData.get("techStack"),
//     });

//     if (!result.success) {
//         return { errors: result.error.flatten().fieldErrors };
//     }

//     // Check user authentication
//     const { userId } = await auth();
//     if (!userId) {
//         return {
//             errors: {
//                 formErrors: ["You must be logged in to add a project."],
//             },
//         };
//     }

//     // Find the user in DB
//     const user = await prisma.user.findUnique({
//         where: { clerkUserId: userId },
//     });

//     if (!user) {
//         return {
//             errors: {
//                 formErrors: ["User not found."],
//             },
//         };
//     }

//     // Handle Image Upload
//     const imageFile = formData.get("projectImage") as File | null;
//     if (!imageFile || !imageFile.name) {
//         return {
//             errors: {
//                 projectImage: ["Project image is required."],
//             },
//         };
//     }

//     let imageUrl: string | undefined;

//     try {
//         const arrayBuffer = await imageFile.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const uploadResponse: UploadApiResponse = await new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 { resource_type: "auto" },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result as UploadApiResponse);
//                 }
//             );
//             uploadStream.end(buffer);
//         });

//         imageUrl = uploadResponse.secure_url;
//     } catch (error) {
//         return {
//             errors: {
//                 projectImage: ["Image upload failed. Please try again."],
//             },
//         };
//     }

//     if (!imageUrl) {
//         return {
//             errors: {
//                 projectImage: ["Image upload failed. Please try again."],
//             },
//         };
//     }

//     // Store project data in Prisma
//     try {
//         await prisma.project.create({
//             data: {
//                 title: result.data.title,
//                 description: result.data.description,
//                 githubUrl: result.data.githubUrl || null,
//                 liveUrl: result.data.liveUrl || null,
//                 techStack: result.data.techStack,
//                 projectImage: imageUrl,
//                 authorId: user.id,
//             },
//         });
//     } catch (error: unknown) {
//         const message =
//             error instanceof Error
//                 ? error.message
//                 : "Something went wrong while creating the project.";

//         return { errors: { formErrors: [message] } };
//     }

//     // Revalidate and Redirect
//     revalidatePath("/dashboard");
//     redirect("/dashboard");
// }