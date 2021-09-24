// Modules or libs content
import { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { firebaseDatabase } from '../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { CustomInput } from '..';
import { Fieldset, Form, CustomButton } from './styles';
// Types
import { Props } from './types';
import { PostObject } from '../../global/types';
// Context
import userContext from '../../context/UserContext';

const PostsForm: FC<Props> = ({ setHasPostsChanged }) => {
    const context = useContext(userContext);
    const history = useHistory();
// https://remirror.io/docs
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<PostObject>();

    const onSubmit: SubmitHandler<PostObject> = inputsData => {
        (async () => {
            try {
                if (context?.userData) {
                    const editable = document.querySelector(
                        '.editable'
                    ) as HTMLParagraphElement;
                    console.log(editable)
                    if (
                        editable.innerText.length > 30 &&
                        editable.innerText.length < 5000
                    ) {
                        console.log('if ok')
                        const data = {
                            ...inputsData,
                            content: editable.innerHTML,
                        };
                        await firebaseDatabase
                            .child('posts')
                            .child(context.userData.userID)
                            .push({
                                ...data,
                                author: context.userData.name,
                                comments: JSON.stringify([
                                    {
                                        author: 'initial',
                                        creation: '03/09/2021',
                                        comment: 'new rocket',
                                        rating: [
                                            {
                                                user: 'initial',
                                                like: false,
                                                dislike: false,
                                            },
                                        ],
                                        replies: [
                                            {
                                                author: 'initial',
                                                creation: '03/09/2021',
                                                comment: 'new rocket',
                                            },
                                        ],
                                    },
                                ]),
                                rate: JSON.stringify([
                                    {
                                        userid: 'initial',
                                        rate: '0',
                                    },
                                ]),
                            });
                        toast.success('Succesfully created the post!');
                        editable.innerHTML = '';
                        reset();
                        setHasPostsChanged(true);
                    } else {
                        throw new Error("Content must have more than 30 characters and less than 5000");
                    }
                } else
                    throw new Error(
                        "The user either doesn't exist or is not signed in"
                    );
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } 
            }
        })();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <CustomButton onClick={() => history.goBack()}>
                Go back
            </CustomButton>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                closeButton={false}
                style={{ fontSize: '16px' }}
            />
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
                <CustomInput />
            </Fieldset>
            <button type="submit">Create post</button>
        </Form>
    );
};

export default PostsForm;

/* <div>
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
</div> */
