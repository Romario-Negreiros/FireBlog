// Modules or libs content
import { FC, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { firebaseDatabase } from '../../../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import changeName from './modules/changeName';
import { useHistory } from 'react-router';
// Images
import Eye from '../../../../assets/eye-solid.svg';
import SlashedEye from '../../../../assets/eye-slash-solid.svg';
// Components
import { Background } from '../../../../global/styles';
import { Form, InputWrapper, IconWrapper } from '../CreateAccount/styles';
import { Fieldset, Input } from '../../../../pages/Login/styles';
import { Close } from '../CreateAccount/styles';
// Types
import { Props, Inputs, Response } from './types';
import { PostObject } from '../../../../global/types';
// Context
import userContext from '../../../../context/UserContext';

const ChangeAccountName: FC<Props> = ({
    setIsModalVisible,
    uid,
    firebaseUid,
    formerName,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const history = useHistory();
    const context = useContext(userContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            name: formerName,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        (async () => {
            try {
                const user = await firebaseDatabase
                    .child('users')
                    .child(uid)
                    .child(firebaseUid)
                    .get();
                if (user.val().password === data.password) {
                    const posts = await firebaseDatabase.child('posts').get();
                    const getEntries: [string, Response][] = Object.entries(
                        posts.val()
                    );
                    const getPosts: [string, [string, PostObject][]][] =
                        getEntries.map(entry => [
                            entry[0],
                            Object.entries(entry[1]),
                        ]);
                    await changeName(getPosts, data.name, formerName);
                    await firebaseDatabase
                        .child('users')
                        .child(uid)
                        .child(firebaseUid)
                        .update({
                            name: data.name,
                        });
                    toast.success('Name changed!');
                    setIsModalVisible(false);
                    if (context?.setUserData && context?.userData) {
                        context.setUserData({
                            userID: context.userData.userID,
                            email: context.userData.email,
                            name: data.name,
                        });
                        history.push(`/home/user/${data.name}`);
                    }
                } else throw new Error('Password is wrong!');
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(
                        'Unable to change name, please try again!: ' +
                            err.message
                    );
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
                        <label htmlFor="name">Name</label>
                        <Input
                            {...register('name', {
                                required: 'Name cannot be empty!',
                                minLength: {
                                    value: 6,
                                    message: 'Minimum of 6 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Maximum of 30 characters',
                                },
                            })}
                        />
                        <p>{errors.name?.message}</p>

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

export default ChangeAccountName;
