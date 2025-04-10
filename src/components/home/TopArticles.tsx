import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";

const TopArticles = async () => {
    const articles = await prisma.articles.findMany({
        take: 3, // limits to 3 articles
        orderBy: {
            createdAt: "desc",
        },
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                articles.map((item, key) => {
                    return (
                        <Card key={key} className={cn("group relative overflow-hidden transition-all hover:scale-[1.02]",
                            "border border-gray-200/50 dark:border-white/10",
                            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg")}>
                            <div className="p-6">
                                <Link href={`/articles/${item.id}`}>
                                    <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                                        <Image
                                            src={item.featuredImage}
                                            alt="Article Image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={item.author.imageUrl as string} />
                                            <AvatarFallback> {item.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-gray-900 dark:text-white">{item.author.name}</span>
                                    </div>
                                    {/* Article Title */}
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{item.category}</p>
                                    {/* Article Meta Info */}
                                    <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>{new Date(item.createdAt).toDateString()}</span>
                                        <span>{12} min read</span>
                                    </div>
                                </Link>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default TopArticles;