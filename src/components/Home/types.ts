export type Data = {
    title: string;
    category: string;
    description: string;
    content: string;
    comments: string;
    rate: string;
};

export type PostObject = {
    PostId: Data;
};

export type PostsArray = [
    string,
    Data
]

export type Posts = [string, PostObject[]][];
