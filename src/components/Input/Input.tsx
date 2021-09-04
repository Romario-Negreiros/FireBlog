// Modules or libs content
import { FC, useState } from 'react';
import moment from 'moment';
// Images
import Send from '../../assets/send.svg';
// Components
import { InputWrapper, Warning } from './styles';
// Types
import { Props } from '../Comments/types';

const Input: FC<Props> = ({ setComments, comments, user }) => {

    const [userComment, setUserComment] = useState<string>('');
    const [warning, setWarning] = useState<string>('');

    const sendComment = () => {
        if (userComment.length > 50) {
            setWarning('Maximum of 50 characters!');
        } else {
            const creationDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            setComments([
                {
                    author: user.name,
                    creation: creationDate,
                    comment: userComment,
                },
                ...comments,
            ]);
            setUserComment('');
            setWarning('');
        }
    };

    return (
        <>
            <InputWrapper>
                <input
                    value={userComment}
                    placeholder="Leave a comment!"
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
