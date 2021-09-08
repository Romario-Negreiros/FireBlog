// Modules or libs content
import { FC, useState } from 'react';
// Images
import ReplyIcon from '../../assets/reply-solid.svg';
import ThumbsUpOn from '../../assets/like-on.svg';
import ThumbsUp from '../../assets/like.svg';
import ThumbsDownOn from '../../assets/dislike-on.svg';
import ThumbsDown from '../../assets/dislike.svg';
// Components
import Input from '../Input/Input';
import { Container, Comment, Data, Mechanisms, RepliesList } from './styles';
// Types
import { Props, Rate, RateProps } from './types';

const Comments: FC<Props> = ({ setComments, comments, userConnected }) => {
    const [isRepliesVisible, setIsRepliesVisible] = useState<number | null>(
        null
    );
    const [willReply, setWillReply] = useState<number | null>(null);

    const sendLike = (commentIndex: number, userRate?: Rate) => {
        if (userRate !== undefined) {
            const commentsCopy = [...comments];
            commentsCopy.forEach((comment, index) => {
                if (index === commentIndex) {
                    comment.rating.forEach(rate => {
                        if (rate.user === userRate.user) {
                            if (userRate.like) userRate.like = false;
                            else {
                                userRate.like = true;
                                if (userRate.dislike) userRate.dislike = false;
                            }
                        }
                    });
                }
            });
            setComments(commentsCopy);
        } else {
            const commentsCopy = [...comments];
            commentsCopy.forEach((comment, index) => {
                if (index === commentIndex) {
                    comment.rating.push({
                        user: userConnected.name,
                        like: true,
                        dislike: false,
                    });
                }
            });
            setComments(commentsCopy);
        }
    };

    const sendDislike = (commentIndex: number, userRate?: Rate) => {
        if (userRate !== undefined) {
            const commentsCopy = [...comments];
            commentsCopy.forEach((comment, index) => {
                if (index === commentIndex) {
                    comment.rating.forEach(rate => {
                        if (rate.user === userRate.user) {
                            if (userRate.dislike) userRate.dislike = false;
                            else {
                                userRate.dislike = true;
                                if (userRate.like) userRate.like = false;
                            }
                        }
                    });
                }
            });
            setComments(commentsCopy);
        } else {
            const commentsCopy = [...comments];
            commentsCopy.forEach((comment, index) => {
                if (index === commentIndex) {
                    comment.rating.push({
                        user: userConnected.name,
                        like: false,
                        dislike: true,
                    });
                }
            });
            setComments(commentsCopy);
        }
    };

    const CommentRate: FC<RateProps> = ({ userRate, commentIndex }) => {
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

    return (
        <Container>
            <Input
                setComments={setComments}
                comments={comments}
                userConnected={userConnected}
            />
            {comments.map((comment, index) => {
                const userRate: Rate | undefined = comment.rating.find(
                    rate => rate.user === userConnected.name
                );
                return (
                    <Comment key={comment.creation}>
                        <p>{comment.comment}</p>
                        <Mechanisms>
                            <div onClick={() => setWillReply(index)}>
                                <img src={ReplyIcon} alt="ReplyIcon" />
                            </div>
                            {userRate !== undefined ? (
                                <CommentRate
                                    userRate={userRate}
                                    commentIndex={index}
                                />
                            ) : (
                                <CommentRate commentIndex={index} />
                            )}
                        </Mechanisms>
                        <Data>
                            <div>
                                <span>{comment.author}</span>
                                <span>{comment.creation}</span>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        isRepliesVisible === index
                                            ? setIsRepliesVisible(null)
                                            : setIsRepliesVisible(index)
                                    }
                                >
                                    {isRepliesVisible === index
                                        ? 'Close'
                                        : `Replies (${comment.replies.length})`}
                                </button>
                            </div>
                        </Data>
                        {willReply === index && (
                            <Input
                                setComments={setComments}
                                comments={comments}
                                userConnected={userConnected}
                                reply={willReply}
                                setWillReply={setWillReply}
                            />
                        )}
                        {isRepliesVisible === index && (
                            <Container>
                                {comment.replies.map(reply => (
                                    <RepliesList>
                                        <p>{reply.comment}</p>
                                        <Data>
                                            <div>
                                                <span>{reply.author}</span>
                                                <span>{reply.creation}</span>
                                            </div>
                                        </Data>
                                    </RepliesList>
                                ))}
                            </Container>
                        )}
                    </Comment>
                );
            })}
        </Container>
    );
};

export default Comments;
