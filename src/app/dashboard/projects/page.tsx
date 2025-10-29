import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import RecentArticles from "../../../components/dashboard/RecentArticles";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

const Projects = async () => {
    const { userId, redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn();
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    const [articles] = await Promise.all([
        // select work same as populate in mongoose
        prisma.articles.findMany({
            where: {
                authorId: user?.id, // 👈 only fetch this user’s articles
            },
            // order by desc get latest articles first
            // this is the same as sort in mongoose
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
        }),
        prisma.comment.count()
    ]);

    return (
        <main className="flex-1 p-4 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                    <p className="text-muted-foreground">Manage your Project Content</p>
                </div>
                <Link href="/dashboard/projects/create">
                    <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add Project
                    </Button>
                </Link>
            </div>

            {/* Recent Articles */}
            <RecentArticles articles={articles} />
        </main>
    )
}

export default Projects;