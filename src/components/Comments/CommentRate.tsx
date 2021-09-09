// Modules or libs content
import { FC } from 'react';
// Images
import ThumbsUpOn from '../../assets/like-on.svg';
import ThumbsUp from '../../assets/like.svg';
import ThumbsDownOn from '../../assets/dislike-on.svg';
import ThumbsDown from '../../assets/dislike.svg';
// Types
import { RateProps } from './types';

const CommentRate: FC<RateProps> = ({ userRate, commentIndex, sendLike, sendDislike }) => {
    if (userRate !== undefined) {
        return (
            <>
                <div onClick={() => sendLike(commentIndex, userRate)}>
                    <img
                        src={userRate.like ? ThumbsUpOn : ThumbsUp}
                        alt="like"
                    />
                </div>
                <div onClick={() => sendDislike(commentIndex, userRate)}>
                    <img
                        src={userRate.dislike ? ThumbsDownOn : ThumbsDown}
                        alt="dislike"
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div onClick={() => sendLike(commentIndex)}>
                    <img src={ThumbsUp} alt="like" />
                </div>
                <div onClick={() => sendDislike(commentIndex)}>
                    <img src={ThumbsDown} alt="dislike" />
                </div>
            </>
        );
    }
};

export default CommentRate;