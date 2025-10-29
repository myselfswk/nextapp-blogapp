"use client";
import React, { useOptimistic, useTransition } from "react";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { toggleLike } from "@/actions/toggle-like";
import { LikeButtonProps } from "@/types";

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
                    <ThumbsUp className="h-5 w-5" color={isLiked ? "red" : "white"} fill={isLiked ? "red" : ""} />
                    {optimisticLikes}
                </Button>
            </form>
            <Button variant="ghost" className="gap-2" disabled>
                <Bookmark className="h-5 w-5" /> Save
            </Button>
            <Button variant="ghost" className="gap-2" disabled>
                <Share2 className="h-5 w-5" /> Share
            </Button>
        </div>
    )
}

export default LikeButton;