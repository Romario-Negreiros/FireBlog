// Modules or libs content
import { FC, useEffect, useCallback, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { firebaseAuth, firebaseDatabase } from '../../lib/firebase';
// Components
import { Container } from '../CreatePosts/styles';
import { Form, Fieldset, CustomButton } from '../PostsForm/styles';
// Types
import { State, Props } from './types';
import { PostObject } from '../../global/types';
// Context
import userContext from '../../context/UserContext';

const EditPosts: FC<Props> = ({ setHasPostsChanged }) => {
    const { state } = useLocation<State>();
    const context = useContext(userContext);
    const history = useHistory();

    const user = firebaseAuth.currentUser;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostObject>();

    const onSubmit: SubmitHandler<PostObject> = data => {
        (async () => {
            try {
                if (context?.userData) {
                    await firebaseDatabase
                        .child('posts')
                        .child(context.userData.userID)
                        .child(state[0])
                        .update({
                            ...data,
                            comments: JSON.stringify(state[1].comments),
                            rate: String(state[1].rate),
                        });
                    toast.success('Update succeeded!');
                } else
                    throw new Error(
                        "The user either doesn't exist or is not signed in"
                    );
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err);
                } else toast.error('Update failed, please try again!');
            } finally {
                setHasPostsChanged(true);
            }
        })();
    };

    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    useEffect(() => {
        if (!user) userNotLogged();
    }, [user, userNotLogged]);

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer
                    position="top-left"
                    autoClose={2000}
                    closeButton={false}
                    style={{ fontSize: '16px' }}
                />
                <CustomButton onClick={() => history.goBack()}>
                    Go back
                </CustomButton>
                <Fieldset>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            {...register('title', {
                                value: state[1].title,
                                required: 'Password cannot be empty!',
                                minLength: {
                                    value: 5,
                                    message: 'Minimum of 5 characters.',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Max of 50 characters.',
                                },
                            })}
                        />
                        <p>{errors.title?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input
                            {...register('category', {
                                value: state[1].category,
                                required: 'Password cannot be empty!',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum of 3 characters.',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Max of 30 characters.',
                                },
                            })}
                        />
                        <p>{errors.category?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            {...register('description', {
                                value: state[1].description,
                                required: 'Password cannot be empty!',
                                minLength: {
                                    value: 15,
                                    message: 'Minimum of 15 characters.',
                                },
                                maxLength: {
                                    value: 250,
                                    message: 'Max of 250 characters.',
                                },
                            })}
                        />
                        <p>{errors.description?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea
                            {...register('content', {
                                value: state[1].content,
                                required: 'Password cannot be empty!',
                                minLength: {
                                    value: 30,
                                    message: 'Minimum of 30 characters.',
                                },
                                maxLength: {
                                    value: 5000,
                                    message: 'Max of 5000 characters.',
                                },
                            })}
                        />
                        <p>{errors.content?.message}</p>
                    </div>
                </Fieldset>
                <button type="submit">Save changes</button>
            </Form>
        </Container>
    );
};

export default EditPosts;
