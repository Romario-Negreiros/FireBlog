export type Inputs = {
    title: string;
    category: string;
    description: string;
    content: string;
    comment: string[];
    rate: string;
};

export interface Props {
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}
