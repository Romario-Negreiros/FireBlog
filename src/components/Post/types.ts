import { Post } from '../EditPosts/types';

export type State = [string, [string, Post]];

export type Rate = {
    userid: string;
    rate: string;
}[];
