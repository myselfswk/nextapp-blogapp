import ArticleDetails from "@/components/articles/ArticleDetails";
import { prisma } from "@/lib/prisma";
import React from "react";

type ArticleDetailProps = {
    params: { id: string }
}

const ArticleDetail: React.FC<ArticleDetailProps> = async ({ params }) => {
    const { id } = await params;
    // const id = (await params).id; we can also use this way to get the id

    // Fetch article details using the id
    const article = await prisma.articles.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    });
    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div><ArticleDetails article={article} /></div>
    )
}

export default ArticleDetail;