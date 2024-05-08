export interface PostData {
    title: string;
    author: string;
    selftext: string;
}

export interface CommentData {
    author: string;
    body: string;
}

export type Post = {
    data: PostData | CommentData;
    kind: "t1" | "t3";
}

export type RedditApiResponse = {
    data: {
        children: Post[];
        after: string;
    }
}