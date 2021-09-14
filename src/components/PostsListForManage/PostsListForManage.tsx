// Modules or libs content
import { FC } from 'react';
// Components
import { LoaderHOC } from '../../HOCs';
import { NoMatches } from '../PostList/styles';
import { Link } from '../../global/styles';
import { Post, Delete } from './styles';
// Types;
import { Props } from './types';

const PostListForManage: FC<Props> = ({ posts, deletePost }) => {
    if (posts.length) {
        return (
            <>
                {posts?.map(post => (
                    <Post key={post[0]}>
                        <h2>{post[1].title}</h2>
                        <small>{post[1].category}</small>
                        <p>{post[1].description}</p>
                        <Link
                            to={{
                                pathname: '/home/edit',
                                state: post,
                            }}
                        >
                            Edit post
                        </Link>
                        <Delete onClick={() => deletePost(post[0])}>
                            Delete
                        </Delete>
                    </Post>
                ))}
            </>
        );
    } else {
        return <NoMatches></NoMatches>;
    }
};

export default LoaderHOC(PostListForManage);
