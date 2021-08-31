export type Post = {
    title: string;
    category: string;
    description: string;
    content: string;
    comment: string[];
    rate: string;
};

type KeyValue = [string, Post];

export type Posts = Array<KeyValue>;
