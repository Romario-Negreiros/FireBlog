export type Inputs = {
    title: string;
    category: string;
    description: string;
    content: string;
};

export interface Props {
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}
