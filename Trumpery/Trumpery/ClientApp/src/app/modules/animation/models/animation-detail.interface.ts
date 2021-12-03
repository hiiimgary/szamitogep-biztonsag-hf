import { IAnimationListItem } from './animation-list-item.interface';
export interface IAnimationDetail {
    animation: IAnimationListItem;
    comments: IComment[];
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
