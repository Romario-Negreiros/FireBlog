import { UserData } from '../../context/UserContext';

export interface Props {
    setComments: (comments: CommentsType) => void;
    comments: CommentsType;
    userConnected: UserData;
}
export type Reply = {
    author: string;
    creation: string;
    comment: string;
};

export type Rate = {
    user: string;
    like: boolean;
    dislike: boolean;
};
export interface RateProps {
    commentIndex: number;
    userRate?: Rate;
}

export type CommentsType = {
    author: string;
    creation: string;
    comment: string;
    rating: Array<Rate>;
    replies: Array<Reply>;
}[];
