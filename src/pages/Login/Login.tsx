import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import signIn from './modules/signIn';

import bg from '../../assets/bg.jpg';

import { Loader, Portal, CreateAccount } from '../../components/index';

import { BannerArea, ContentArea, Form, Fieldset, Input, Link } from './styles';

import { Inputs, Props } from './types';

const Login: FC<Props> = ({ setUserID }) => {

    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        (async () => {
            setIsLoaded(false);
            try {
                const response = await fetch(
                    `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_EMAIL_APIKEY}&email=${data.email}`
                );
                const { deliverability, is_valid_format } =
                    await response.json();
                if (deliverability === 'DELIVERABLE' && is_valid_format.value) {
                    signIn(setUserID, data, setError);
                } else setError("This email doesn't exist!");
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoaded(true);
            }
        })();
    };

    if (!isLoaded) {
        return (
            <BannerArea bg={bg}>
                <ContentArea>
                    <Loader />
                </ContentArea>
            </BannerArea>
        );
    } else if (error) {
        return (
            <BannerArea bg={bg}>
                <ContentArea>
                    <p>{error}</p>
                    <button onClick={() => setError('')}>Dismiss</button>
                </ContentArea>
            </BannerArea>
        );
    } else {
        return (
            <BannerArea bg={bg}>
                <ContentArea>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Fieldset>
                            <label htmlFor="email">E-mail</label>
                            <Input
                                type="email"
                                {...register('email', {
                                    required: 'Email cannot be empty!',
                                })}
                            ></Input>
                            <p>{errors.email?.message}</p>

                            <label htmlFor="password">Password</label>
                            <Input
                                {...register('password', {
                                    required: 'Password cannot be empty!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum of 5 characters.',
                                    },
                                })}
                            ></Input>
                            <p>{errors.password?.message}</p>
                        </Fieldset>
                        <div>
                            <button type="submit">Sign in</button>
                            <small> Don't have an account yet? </small> <br />
                            <Link to="/createAccount">Create account</Link>
                        </div>
                    </Form>
                </ContentArea>
                <Portal>
                    <CreateAccount />
                </Portal>
            </BannerArea>
        );
    }
};

export default Login;
