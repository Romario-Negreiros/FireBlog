type Post = {
    title: string,
    category: string,
    description: string,
    content: string
}

type KeyValue = [
    string,
    Post
]

export type Posts = Array<KeyValue>