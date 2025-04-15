import { prisma } from "@/lib/prisma";

export const fetchArticleByQuery = async (searchText: string, skip: number, take: number) => {
    // transaction is used when we need more than one query to be executed in a single transaction
    // in this case, we need to fetch the articles and the total count of articles that match the search text
    const [articles, total] = await prisma.$transaction([
        prisma.articles.findMany({
            where: {
                OR: [
                    { title: { contains: searchText, mode: 'insensitive' } },
                    { category: { contains: searchText, mode: 'insensitive' } },
                ],
            },
            include: {
                author: {
                    select: { name: true, imageUrl: true, email: true },
                },
            },
            skip: skip,
            take: take,
        }),
        prisma.articles.count({
            where: {
                OR: [
                    { title: { contains: searchText, mode: 'insensitive' } },
                    { category: { contains: searchText, mode: 'insensitive' } },
                ],
            },
        }),
    ]);

    return { articles, total };
};