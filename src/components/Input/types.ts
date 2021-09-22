import { Props as CommentProps } from '../Comments/types';

export interface Props extends CommentProps {
    reply?: number;
    setWillReply?: (willReply: number | null) => void;
}
