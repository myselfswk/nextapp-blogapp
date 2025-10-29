import ArticleDetails from "@/components/articles/ArticleDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ArticleDetail({ params }: {
    params: { id: string };
}) {
    const { id } = await Promise.resolve(params); // ensures type safety

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

    if (!article) return notFound();

    return <ArticleDetails article={article} />;
}

// Optional static generation helper:
export async function generateStaticParams() {
    const articles = await prisma.articles.findMany({ select: { id: true } });
    return articles.map((a) => ({ id: a.id }));
}