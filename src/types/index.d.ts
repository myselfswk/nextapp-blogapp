export type CommentFormProps = {
    articleId: string
}

export type SearchPageProps = {
    searchParams: { search?: string; page?: string };
}

export type LikeButtonProps = {
    articleId: string,
    likes: Like[],
    isLiked: boolean
}