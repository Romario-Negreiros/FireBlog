import { UserData } from '../../context/UserContext';

export interface Props {
    setComments: (comments: CommentsType) => void;
    comments: CommentsType;
    user: UserData;
}

export type CommentsType = {
    author: string;
    creation: string;
    comment: string;
}[];
