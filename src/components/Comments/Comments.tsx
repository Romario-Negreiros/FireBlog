// Modules or libs content
import { FC, useState } from 'react';
// Images
import ReplyIcon from '../../assets/reply-solid.svg';
// Components
import Input from '../Input/Input';
import CommentRate from './CommentRate';
import { Container, Comment, Data, Mechanisms, RepliesList } from './styles';
// Types
import { Props, Rate } from './types';

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
                                    sendLike={sendLike}
                                    sendDislike={sendDislike}
                                />
                            ) : (
                                <CommentRate
                                    commentIndex={index}
                                    sendLike={sendLike}
                                    sendDislike={sendDislike}
                                />
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
