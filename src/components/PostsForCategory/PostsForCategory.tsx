// Modules or libs content
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const PostsForCategory: FC = () => {

    const { category } = useParams<{ category: string }>();

    return (
        <div>{category}</div>
    )
};

export default PostsForCategory