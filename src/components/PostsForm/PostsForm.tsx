// Modules or libs content
import { FC } from 'react';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { firebaseDatabase } from '../../lib/firebase';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { Fieldset, Form, CustomButton } from './styles';
// Types
import { Inputs, Props } from './types';

const PostsForm: FC<Props> = ({ setHasPostsChanged }) => {
    const { userID } = useParams<{ userID: string }>();

    const history = useHistory();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        (async () => {
            try {
                await firebaseDatabase
                    .child('posts')
                    .child(userID)
                    .push({
                        ...data,
                        comments: JSON.stringify([
                            {
                                author: 'initial',
                                creation: '03/09/2021',
                                comment: 'new rocket',
                                replies: [{
                                    author: 'initial',
                                    creation: '03/09/2021',
                                    comment: 'new rocket',
                                }]
                            }
                        ]),
                        rate: JSON.stringify([
                            {
                                userid: 'initial',
                                rate: '0',
                            },
                        ]),
                    });
                toast.success('Succesfully created the post!');
                reset();
                setHasPostsChanged(true);
            } catch (err) {
                toast.error("We couldn't create the post, please try again!");
            }
        })();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer
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
            <button type="submit">Create post</button>
        </Form>
    );
};

export default PostsForm;
