// Modules or libs content
import { FC, useState } from 'react';
import moment from 'moment';
// Images
import Send from '../../assets/send.svg';
import Close from '../../assets/times-solid.svg';
// Components
import { InputWrapper, Warning } from './styles';
// Types
import { Props } from './types';
import { CommentsType } from '../Comments/types';

const Input: FC<Props> = ({
    setComments,
    comments,
    user,
    reply,
    setWillReply,
}) => {
    const [userComment, setUserComment] = useState<string>('');
    const [warning, setWarning] = useState<string>('');

    const sendComment = () => {
        if (userComment.length > 50) {
            setWarning('Maximum of 50 characters!');
        } else {
            const creationDate: string = moment().format(
                'MMMM Do YYYY, h:mm:ss a'
            );
            setComments([
                {
                    author: user.name,
                    creation: creationDate,
                    comment: userComment,
                    replies: [],
                },
                ...comments,
            ]);
            setUserComment('');
            setWarning('');
        }
    };

    const sendReply = () => {
        if (userComment.length > 50) {
            setWarning('Maximum of 50 characters!');
        } else {
            if (reply !== undefined && setWillReply !== undefined) {
                const replyDate: string = moment().format(
                    'MMMM Do YYYY, h:mm:ss a'
                );
                const commentsCopy: CommentsType = [...comments]
                const getCommentBeingReplied: CommentsType = commentsCopy.splice(
                    reply,
                    1
                );
                getCommentBeingReplied[0].replies.push({
                    author: user.name,
                    creation: replyDate,
                    comment: userComment,
                });
                commentsCopy.splice(reply, 0 , getCommentBeingReplied[0])
                setComments(commentsCopy)
                setWarning('');
                setUserComment('');
            }
        }
    };

    return (
        <>
            <InputWrapper>
                <input
                    value={userComment}
                    placeholder="Leave your comment!"
                    onChange={event =>
                        setUserComment(event.currentTarget.value)
                    }
                    onKeyPress={(
                        event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                        if (event.key === 'Enter') {
                            reply !== undefined ? sendReply() : sendComment();
                        }
                    }}
                />
                <div onClick={() => (reply !== undefined ? sendReply() : sendComment())}>
                    <img src={Send} alt="send comment"></img>
                </div>
                {setWillReply && (
                    <div onClick={() => setWillReply(null)}>
                        <img src={Close} alt="close reply"></img>
                    </div>
                )}
            </InputWrapper>
            {warning && (
                <Warning>
                    <p>{warning}</p>
                </Warning>
            )}
        </>
    );
};

export default Input;
