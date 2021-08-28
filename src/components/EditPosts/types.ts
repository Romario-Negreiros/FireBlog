interface Post {
    title: string,
    category: string,
    description: string,
    content: string,
};

export type State = [string, Post]

export interface Inputs extends Post {

};