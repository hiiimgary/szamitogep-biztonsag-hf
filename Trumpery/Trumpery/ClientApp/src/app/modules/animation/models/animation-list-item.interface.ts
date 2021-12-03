export interface IAnimationListItem {
    id: number;
    author: string;
    tags: string[];
    description: string;
    createdAt: Date;
    gifPath: string;
}

export interface IAnimationListItemResponse {
    id: number;
    author: string;
    tags: string[];
    description: string;
    createdAt: string;
    gifPath: string;
}
