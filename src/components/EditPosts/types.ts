import { PostObject } from "../../global/types";

export type State = [string, PostObject];

export interface Props {
    setHasPostsChanged: (hasPostsChanged: boolean) => void;
}
