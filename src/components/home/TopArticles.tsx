import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TopArticles = () => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className={cn("group relative overflow-hidden transition-all hover:scale-[1.02]",
                "border border-gray-200/50 dark:border-white/10",
                "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg")}>
                <div className="p-6">
                    <Link href={`/articles/${1234}`}>
                        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Article Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-900 dark:text-white">Waleed Khan</span>
                        </div>
                        {/* Article Title */}
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                            How to build a responsive website using Tailwind CSS
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Website Developement
                        </p>
                        {/* Article Meta Info */}
                        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>10 April, 2025</span>
                            <span>{12} min read</span>
                        </div>
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default TopArticles;