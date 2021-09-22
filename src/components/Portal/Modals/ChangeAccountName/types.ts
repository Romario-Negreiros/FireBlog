import { PostObject } from '../../../../global/types';
import { Props as GlobalProps } from '../../types';

export interface Props extends GlobalProps {
    uid: string;
    firebaseUid: string;
    formerName: string;
}

export interface Inputs {
    name: string;
    password: string;
}

export interface Response {
    postID: PostObject;
}
