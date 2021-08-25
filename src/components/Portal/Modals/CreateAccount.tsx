import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import createAccount from './modules/createAccount';

import Eye from '../../../assets/eye-solid.svg';
import SlashedEye from '../../../assets/eye-slash-solid.svg';

import {
    Background,
    Form,
    Container,
    IconWrapper,
    InputWrapper,
    Close,
} from './styles';
import { Fieldset, Input } from '../../../pages/Login/styles';

import { Inputs, Props } from './types';
import Loader from '../../Loader/Loader';

const CreateAccount: FC<Props> = ({ setIsModalVisible }) => {
    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPwdVisible, setIsConfirmPwdVisible] =
        useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (data.password === data.confirmpwd) {
            (async () => {
                setIsLoaded(false);
                try {
                    const response = await fetch(
                        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_EMAIL_APIKEY}&email=${data.email}`
                    );
                    const { deliverability, is_valid_format } =
                        await response.json();
                    if (
                        deliverability === 'DELIVERABLE' &&
                        is_valid_format.value
                    ) {
                        createAccount(data, setError, setIsModalVisible);
                    } else setError("This email doesn't exist!");
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoaded(true);
                }
            })();
        } else setError('Password and confirm password fields must be equal!');
    };

    if (!isLoaded) {
        return (
            <Background>
                <Loader />
            </Background>
        );
    } else if (error) {
        return (
            <Background>
                <Container>
                    <p>{error}</p>
                    <button onClick={() => setError('')}>Dismiss</button>
                </Container>
            </Background>
        );
    } else {
        return (
            <Background>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Close onClick={() => setIsModalVisible(false)}>
                        Close
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
                            })}
                        />
                        <p>{errors.name?.message}</p>

                        <label htmlFor="email">E-mail</label>
                        <Input
                            type="email"
                            {...register('email', {
                                required: 'Email cannot be empty!',
                            })}
                        ></Input>
                        <p>{errors.email?.message}</p>
                    </Fieldset>
                    <Fieldset>
                        <label htmlFor="password">Password</label>
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

                        <label htmlFor="confirmpwd">Confirm password</label>
                        <InputWrapper>
                            <input
                                autoComplete=""
                                type={isConfirmPwdVisible ? 'text' : 'password'}
                                {...register('confirmpwd', {
                                    required: 'Password cannot be empty!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum of 5 characters.',
                                    },
                                })}
                            ></input>
                            <IconWrapper
                                onClick={() =>
                                    setIsConfirmPwdVisible(!isConfirmPwdVisible)
                                }
                            >
                                <img
                                    src={isConfirmPwdVisible ? SlashedEye : Eye}
                                    alt="toggle visiblity"
                                />
                            </IconWrapper>
                        </InputWrapper>
                        <p>{errors.confirmpwd?.message}</p>
                    </Fieldset>

                    <button type="submit">Create Account</button>
                </Form>
            </Background>
        );
    }
};

export default CreateAccount;
