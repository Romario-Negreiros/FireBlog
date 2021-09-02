export interface Post {
    title: string;
    category: string;
    description: string;
    content: string;
    comments: string;
    rate: string;
}

export type State = [string, Post];

export interface Inputs extends Post {}

export interface Props {
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}
