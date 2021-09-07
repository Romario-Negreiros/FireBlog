// Modules or libs content
import { FC, useState } from 'react';
// Images
import ReplyIcon from '../../assets/reply-solid.svg';
// Components
import Input from '../Input/Input';
import { Container, Comment, Data, Mechanisms, RepliesList } from './styles';
// Types
import { Props } from './types';

const Comments: FC<Props> = ({ setComments, comments, userConnected }) => {

    const [isRepliesVisible, setIsRepliesVisible] = useState<number | null>(
        null
    );
    const [willReply, setWillReply] = useState<number | null>(null);

    return (
        <Container>
            <Input
                setComments={setComments}
                comments={comments}
                userConnected={userConnected}
            />
            {comments.map((comment, index) => (
                <Comment key={index}>
                    <p>{comment.comment}</p>
                    <Mechanisms>
                        <div onClick={() => setWillReply(index)}>
                            <img src={ReplyIcon} alt="ReplyIcon" />
                        </div>
                    </Mechanisms>
                    <Data>
                        <div>
                            <span>{comment.author}</span>
                            <span>{comment.creation}</span>
                        </div>
                        <div>
                            <button onClick={() => isRepliesVisible === index ? setIsRepliesVisible(null) : setIsRepliesVisible(index)}>
                                {isRepliesVisible === index ? 'Close' : `Replies (${comment.replies.length})`}
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
            ))}
        </Container>
    );
};

export default Comments;
