// Modules or libs content
import { FC, useState } from 'react';
import { firebaseAuth, firebaseDatabase } from '../../../../lib/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
// Images
import Eye from '../../../../assets/eye-solid.svg';
import SlashedEye from '../../../../assets/eye-slash-solid.svg';
// Components
import { ToastContainer } from 'react-toastify';
import { Background } from '../../../../global/styles';
import { Form, InputWrapper, IconWrapper } from '../CreateAccount/styles';
import { Fieldset } from '../../../../pages/Login/styles';
import { Close } from '../CreateAccount/styles';
// Types
import { Props } from '../ChangeAccountName/types';

interface Inputs {
    password: string;
    confirmpwd: string;
}

const ChangePassword: FC<Omit<Props, 'formerName'>> = ({
    setIsModalVisible,
    uid,
    firebaseUid,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPwdVisible, setIsConfirmPwdVisible] =
        useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (data.confirmpwd === data.password) {
            (async () => {
                try {
                    const user = firebaseAuth.currentUser;
                    if (user) {
                        await user.updatePassword(data.password);
                        await firebaseDatabase
                            .child('users')
                            .child(uid)
                            .child(firebaseUid)
                            .update({
                                password: data.password,
                            });
                        toast.success('Password changed!');
                        setIsModalVisible(false);
                    } else
                        throw new Error(
                            'Something unnexpected happened, try again!'
                        );
                } catch (err) {
                    if (err instanceof Error) {
                        toast.error(err.message);
                    }
                }
            })();
        }
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
                        <label htmlFor="password">New password</label>
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

                        <label htmlFor="confirmpwd">Confirm new password</label>
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
                    <button type="submit">Confirm</button>
                </Form>
            </Background>
            ;
        </>
    );
};

export default ChangePassword;
