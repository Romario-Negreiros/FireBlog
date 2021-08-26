// Modules or libs content
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// Components
import { Fieldset, Form } from './styles';
// Types
import { Inputs } from './types';

const PostsForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
            <Form onSubmit={handleSubmit(onSubmit)}>
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
