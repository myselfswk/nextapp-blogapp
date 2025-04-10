"use client";
import React, { useTransition } from "react";
import { Prisma } from "@prisma/client";
import { Car, EditIcon, MoveRight, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { deleteArticle } from "@/actions/delete-article";

// get type for props
type RecentArticlesProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            comments: true;
            author: {
                select: {
                    name: true;
                    email: true;
                    imageUrl: true;
                }
            }
        }
    }>[]
}

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Articles</CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">View All <MoveRight /></Button>
                </div>
            </CardHeader>
            {
                articles?.length === 0 ? (
                    <CardContent className="text-center text-muted-foreground">
                        <p>No articles found</p>
                    </CardContent>
                ) : (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comments</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    articles.map((item, key) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>
                                                    <Badge className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800" variant="outline">Published</Badge>
                                                </TableCell>
                                                <TableCell>{item.comments.length}</TableCell>
                                                <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex">
                                                        <Link href={`/dashboard/articles/${item.id}/edit`}>
                                                            <Button variant="ghost" size="sm" className="text-amber-600"><EditIcon /></Button>
                                                        </Link>
                                                        <DeleteButton articleId={item.id} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                )
            }
        </Card>
    )
}

export default RecentArticles;

type DeleteButtonProps = {
    articleId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
    const [isPending, startTransition] = useTransition();
    return (
        <form action={async () => {
            startTransition(async () => {
                await deleteArticle(articleId);
            })
        }}>
            <Button
                variant="ghost" size="sm" className="text-red-500"
                disabled={isPending}
            >{isPending ? <Car className="animate-spin" /> : <TrashIcon />}</Button>
        </form>
    )
}