// Modules or libs content
import { FC, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { firebaseDatabase } from '../../../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import changeName from './modules/changeName';
import { useHistory } from 'react-router';
// Images
import { Background } from '../../../../global/styles';
// Components
import { Form } from '../CreateAccount/styles';
import { Fieldset, Input } from '../../../../pages/Login/styles';
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
            } catch (err) {
                toast.error(
                    'Unable to change name, please try again!: ' + err
                );
            }
            finally {
                if(context?.setUserData && context?.userData) {
                    context.setUserData({
                        userID: context.userData.userID,
                        email: context.userData.email,
                        name: data.name
                    })
                    history.push(`/home/user/${data.name}`)
                }
            }
        })();
    };

    return (
        <Background>
            <ToastContainer
                autoClose={2000}
                closeButton={false}
                style={{ fontSize: '16px' }}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                </Fieldset>
                <button type="submit">Confirm</button>
            </Form>
        </Background>
    );
};

export default ChangeAccountName;
