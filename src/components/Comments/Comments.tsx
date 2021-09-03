// Modules or libs content
import React, { FC, useState } from 'react';
import moment from 'moment';
// Images
import Send from '../../assets/send.svg';
// Components
import { Container, Comment, Data, Input } from './styles';
// Types
import { Props } from './types';

const Comments: FC<Props> = ({ setComments, comments, user }) => {
    const [userComment, setUserComment] = useState<string>('');

    const sendComment = () => {
        const creationDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        setComments([
            ...comments,
            { author: user.name, creation: creationDate, comment: userComment },
        ]);
        setUserComment('');
    };
    
    return (
        <Container>
            <Input>
                <input
                    value={userComment}
                    onChange={event =>
                        setUserComment(event.currentTarget.value)
                    }
                    onKeyPress={(
                        event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                        if (event.key === 'Enter') {
                            sendComment();
                        }
                    }}
                />
                <div onClick={() => sendComment()}>
                    <img src={Send} alt="send comment"></img>
                </div>
            </Input>
            {comments.map((comment, index) => (
                <Comment key={index}>
                    <p>{comment.comment}</p>
                    <Data>
                        <span>{comment.author}</span>
                        <span>{comment.creation}</span>
                    </Data>
                </Comment>
            ))}
        </Container>
    );
};

export default Comments;
