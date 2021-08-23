import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import createAccount from './modules/createAccount';
import signIn from './modules/signIn';

import {
    Container,
    Heading,
    Form,
    Fieldset,
    Label,
    Input,
    Button,
    Error,
    Paragraph,
} from './styles';

import Inputs from './types/Inputs';
import Props from './types/Props';

const Login: FC<Props> = ({ setUserID }) => {
    const [action, setAction] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    console.log(error, isLoaded)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
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
                    if (action === 'create') createAccount(setUserID, data, setError);
                    else signIn(setUserID, data, setError);
                } else setError("This email doesn't exist!");
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoaded(true);
            }
        })();
    };

    return (
        <Container>
            <Heading>FireBlog</Heading>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="email"
                        {...register('email', {
                            required: 'Email cannot be empty!',
                        })}
                    ></Input>
                    <Error>{errors.email?.message}</Error>

                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register('password', {
                            required: 'Password cannot be empty!',
                            minLength: {
                                value: 5,
                                message:
                                    'The password must have more than 5 characters, numbers or symbols',
                            },
                        })}
                    ></Input>
                    <Error>{errors.password?.message}</Error>
                </Fieldset>

                <Button type="submit" onClick={() => setAction('create')}>
                    Create account
                </Button>

                <Paragraph>Already have an account?</Paragraph>

                <Button type="submit" onClick={() => setAction('signin')}>
                    Sign in
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
