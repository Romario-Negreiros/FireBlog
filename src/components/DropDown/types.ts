import { PostObject } from "../../global/types";

export interface Props {
    isDropDownVisible: boolean;
    setIsDropDownVisible: (isDropDownVisible: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
    hasPostsChanged: boolean;
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}

export interface StyledProps {
    isDropDownVisible: boolean;
}

export type Post = {
    postID: PostObject
};
