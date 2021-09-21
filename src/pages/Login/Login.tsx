// Modules or lib content
import { FC, useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import signIn from './modules/signIn';
import { useHistory } from 'react-router';
import { ToastContainer } from 'react-toastify';
// Images
import Eye from '../../assets/eye-solid.svg';
import SlashedEye from '../../assets/eye-slash-solid.svg';
import bg from '../../assets/bg.jpg';
// Components
import { Loader, Portal, CreateAccount } from '../../components/index';
import {
    InputWrapper,
    IconWrapper,
} from '../../components/Portal/Modals/CreateAccount/styles';
import {
    BannerArea,
    ContentArea,
    Form,
    Fieldset,
    Input,
    OpenModal,
    BottomContentWrapper,
    Close,
} from './styles';
// Types
import { Inputs } from './types';
// Contexts
import userContext from '../../context/UserContext';

const Login: FC = () => {
    const userData = useContext(userContext);

    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        (async () => {
            setIsLoaded(false);
            try {
                if (userData?.setUserData) {
                    signIn(userData.setUserData, data, setError, history);
                }
            } catch (err) {
                if(err instanceof Error) setError(err.message);
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
                <ToastContainer
                    autoClose={2000}
                    closeButton={false}
                    style={{ fontSize: '16px' }}
                />
                <ContentArea>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Close to="/home">Back to home</Close>
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
                            <InputWrapper>
                                <input
                                    autoComplete=""
                                    type={
                                        isPasswordVisible ? 'text' : 'password'
                                    }
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
                                        src={
                                            isPasswordVisible ? SlashedEye : Eye
                                        }
                                        alt="toggle visiblity"
                                    />
                                </IconWrapper>
                            </InputWrapper>
                            <p>{errors.password?.message}</p>
                        </Fieldset>
                        <BottomContentWrapper>
                            <button type="submit">Sign in</button>
                            <small> Don't have an account yet? </small> <br />
                            <OpenModal onClick={() => setIsModalVisible(true)}>
                                Create account
                            </OpenModal>
                        </BottomContentWrapper>
                    </Form>
                </ContentArea>
                {isModalVisible && (
                    <Portal>
                        <CreateAccount setIsModalVisible={setIsModalVisible} />
                    </Portal>
                )}
            </BannerArea>
        );
    }
};

export default Login;
