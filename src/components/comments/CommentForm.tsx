"use client";
import React, { useActionState } from 'react';
import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createComment } from '@/actions/create-comment';
import { CommentFormProps } from '@/types';

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
    const [formState, action, isPending] = useActionState(createComment.bind(null, articleId), {
        errors: {},
    });

    // Get logged In user from clerk functionality
    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
        return <div>Loading user data...</div>;
    }
    const firstLetter = user && user?.firstName?.slice(0, 1).toUpperCase();

    return (
        <form className="mb-8" action={action}>
            <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Input placeholder="Add a comment..." name="body" className="py-6 text-base" />
                    {formState.errors.body && <p className="text-red-600 text-sm font-medium">{formState.errors.body}</p>}
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={isPending}>{isPending ? "Loading..." : "Post Comment"}</Button>
                    </div>
                    {
                        formState.errors.formErrors && <div className="p-2 border border-red-600 bg-red-100 ">{formState.errors.formErrors[0]}</div>
                    }
                </div>
            </div>
        </form>
    )
}

export default CommentForm;