"use client";
import React, { useOptimistic, useTransition } from "react";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Like } from "@prisma/client";
import { toggleLike } from "@/actions/toggle-like";

type LikeButtonProps = {
    articleId: string,
    likes: Like[],
    isLiked: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId, isLiked, likes }) => {
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
    const [isPending, startTransition] = useTransition();

    const handleLike = async () => {
        startTransition(async () => {
            // Optimistically update the likes count
            setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);
            await toggleLike(articleId);
        });
    };

    return (
        <div className="flex gap-4 mb-12 border-t pt-8">
            <form action={handleLike}>
                <Button
                    type="submit"
                    variant="ghost"
                    className="gap-2"
                    disabled={isPending}
                >
                    <ThumbsUp className="h-5 w-5" />
                    {optimisticLikes}
                </Button>
            </form>
            <Button title="Coming Soon!" variant="ghost" className="gap-2">
                <Bookmark className="h-5 w-5" /> Save
            </Button>
            <Button title="Coming Soon!" variant="ghost" className="gap-2">
                <Share2 className="h-5 w-5" /> Share
            </Button>
        </div>
    )
}

export default LikeButton;