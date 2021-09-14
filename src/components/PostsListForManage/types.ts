import { Posts } from '../ManagePosts/types';

export interface Props {
    posts: Posts;
    deletePost: (postID: string) => void;
}