export interface IAnimationDetailResponse {
    animation: IAnimation;
    comments: IComment[];
}

export interface IAnimation {
    id: number;
    author: string;
    tags: string[];
    description: string;
    createdAt: string;
    gifPath: string;
}

export interface IComment {
    id: number;
    isHidden?: boolean;
    content: string;
    user: ICommentUser;
}

export interface ICommentUser {
    id: number;
    name: string;
}

