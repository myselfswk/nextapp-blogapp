"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const toggleLike = async (articleId: string) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You need to Logged in to like an article");
    }

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
        throw new Error("User not found");
    }

    // Check if the user has already liked the article
    const existingLike = await prisma.like.findFirst({ where: { articleId, userId: user.id } });

    if (existingLike) {
        // Unlike the article
        await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
        // Like the article
        await prisma.like.create({ data: { articleId, userId: user.id } });
    }

    revalidatePath(`/article/${articleId}`)
}