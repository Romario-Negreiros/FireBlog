type Data = {
    title: string,
    category: string,
    description: string,
    content: string,
}

type Post = {
    PostId: Data
}

export type Posts = Post[]