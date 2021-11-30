import { IAnimationListItem } from './animation-list-item.interface';
export interface IAnimationDetail {
    animation: IAnimationListItem;
    comments: IComment[];
}

export interface IComment {
    id: number;
    content: string;
    user: ICommentUser;
}

export interface ICommentUser {
    id: number;
    name: string;
}
