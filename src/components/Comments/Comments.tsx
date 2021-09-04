// Modules or libs content
import { FC, useState } from 'react';
// Images
import ReplyIcon from '../../assets/reply-solid.svg';
// Components
import Input from '../Input/Input';
import {
    Container,
    Comment,
    Data,
    Mechanisms,
} from './styles';
// Types
import { Props } from './types';

const Comments: FC<Props> = ({ setComments, comments, user }) => {

    const [willReply, setWillReply] = useState<number | null>(null);

    return (
        <Container>
            <Input setComments={setComments} comments={comments} user={user}/>
            {comments.map((comment, index) => (
                <Comment key={index}>
                    <p>{comment.comment}</p>
                    <Mechanisms>
                        <div onClick={() => setWillReply(index)}>
                            <img src={ReplyIcon} alt="ReplyIcon" />
                        </div>
                    </Mechanisms>
                    <Data>
                        <span>{comment.author}</span>
                        <span>{comment.creation}</span>
                    </Data>
                    {willReply === index ? <Input setComments={setComments} comments={comments} user={user} /> : ''}
                </Comment>
            ))}
        </Container>
    );
};

export default Comments;
