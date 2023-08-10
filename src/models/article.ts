export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}

interface Author {
    username: string;
    image: string;
    following: boolean;
}

export type NewArticle = Pick<Article, 'title' | 'description' | 'body' | 'tagList'>
