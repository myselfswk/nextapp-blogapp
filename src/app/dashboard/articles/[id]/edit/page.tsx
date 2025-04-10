import React from "react";
import EditArticlePage from "@/components/articles/EditArticlePage";
import { prisma } from "@/lib/prisma";

type EditArticlesParams = {
    params: Promise<{ id: string }>
}

const ArticleEdit: React.FC<EditArticlesParams> = async ({ params }) => {
    const { id } = await params;
    const article = await prisma.articles.findUnique({
        where: { id }
    });
    if (!article) {
        return <div className="text-3xl text-center">Article not found</div>;
    }

    return (
        <div>
            <EditArticlePage article={article} />
        </div>
    )
}

export default ArticleEdit;