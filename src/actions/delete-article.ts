"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {

    await prisma.articles.delete({
        where: {
            id: articleId,
        },
    });
    // revalidate the dashboard page to show the updated articles list
    revalidatePath("/dashboard");
}