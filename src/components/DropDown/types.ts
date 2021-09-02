export interface Props {
    isDropDownVisible: boolean;
    setIsDropDownVisible: (isDropDownVisible: boolean) => void;
    hasPostsChanged: boolean;
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}

export interface StyledProps {
    isDropDownVisible: boolean;
}

export type Post = {
    postID: {
        title: string;
        description: string;
        category: string;
        content: string;
        comment: string;
        rate: string;
    };
};
