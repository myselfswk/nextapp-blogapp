import ArticleDetails from "@/components/articles/ArticleDetails";
import { prisma } from "@/lib/prisma";
import React from "react";

type ArticleDetailProps = {
    params: { id: string };
};

const ArticleDetail = async ({ params }: ArticleDetailProps) => {
    const { id } = params;

    const article = await prisma.articles.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    if (!article) {
        return <div>Article not found</div>;
    }

    return <ArticleDetails article={article} />;
};

export default ArticleDetail;