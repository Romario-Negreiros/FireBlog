// Modules or libs content
import { FC, useState, useContext } from 'react';
import { firebaseDatabase, firebaseAuth } from '../../../../lib/firebase';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import deleteCommentsAndReplies from './modules/deleteCommentsAndReplies';
// Images
import Eye from '../../../../assets/eye-solid.svg';
import SlashedEye from '../../../../assets/eye-slash-solid.svg';
// Components
import { ToastContainer } from 'react-toastify';
import { Background } from '../../../../global/styles';
import { Fieldset } from '../../../../pages/Login/styles';
import {
    Form,
    InputWrapper,
    IconWrapper,
    Close,
} from '../CreateAccount/styles';
// Types
import { Props, Response } from '../ChangeAccountName/types';
import { PostObject } from '../../../../global/types';
// Context
import userContext from '../../../../context/UserContext';

interface Inputs {
    password: string;
}

const DeleteProfile: FC<Omit<Props & { username: string }, 'formerName'>> = ({
    setIsModalVisible,
    uid,
    firebaseUid,
    username,
}) => {
    const context = useContext(userContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        (async () => {
            try {
                const user = await firebaseDatabase
                    .child('users')
                    .child(uid)
                    .child(firebaseUid)
                    .get();
                if (user.val() && user.val().password === data.password) {
                    const currentUser = firebaseAuth.currentUser;
                    if (currentUser) {
                        await currentUser.delete();
                        await firebaseDatabase
                            .child('users')
                            .child(uid)
                            .remove();
                        const posts = await firebaseDatabase
                            .child('posts')
                            .get();
                        const getEntries: [string, Response][] = Object.entries(
                            posts.val()
                        );
                        const getPosts: [string, [string, PostObject][]][] =
                            getEntries.map(entry => [
                                entry[0],
                                Object.entries(entry[1]),
                            ]);
                        await deleteCommentsAndReplies(getPosts, username);
                        await firebaseDatabase
                            .child('posts')
                            .child(uid)
                            .remove();
                        toast.success('The user has been deleted!');
                        context?.setUserData(null);
                        firebaseAuth.signOut();
                        history.push(`/home/user/`);
                    }
                } else throw new Error('Password is wrong!');
            } catch (err) {
                if (err instanceof Error) {
                    toast.error('Unable to delete profile: ' + err.message);
                }
            }
        })();
    };

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                closeButton={false}
                style={{ fontSize: '16px' }}
            />
            <Background>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Close onClick={() => setIsModalVisible(false)}>
                        Close modal
                    </Close>
                    <Fieldset>
                        <label htmlFor="password">Confirm password</label>
                        <InputWrapper>
                            <input
                                autoComplete=""
                                type={isPasswordVisible ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password cannot be empty!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum of 5 characters.',
                                    },
                                })}
                            ></input>
                            <IconWrapper
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            >
                                <img
                                    src={isPasswordVisible ? SlashedEye : Eye}
                                    alt="toggle visiblity"
                                />
                            </IconWrapper>
                        </InputWrapper>
                        <p>{errors.password?.message}</p>
                    </Fieldset>
                    <button type="submit">Confirm</button>
                </Form>
            </Background>
        </>
    );
};

export default DeleteProfile;
