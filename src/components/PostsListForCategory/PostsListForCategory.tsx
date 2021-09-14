// Modules or libs content
import { FC } from 'react';
// Components
import { LoaderHOC } from '../../HOCs';
import { Post, Link } from '../../global/styles';
// Types
import { Props } from './types';

const PostsListForCategory: FC<Props> = ({ postsForCategory }) => {
    return (
        <>
            {postsForCategory.map(post => (
                <Post key={post[1]}>
                    <h2>{post[2].title}</h2>
                    <small>{post[2].category}</small>
                    <p>{post[2].description}</p>
                    <Link
                        to={{
                            pathname: `/home/posts/${post[0]}`,
                            state: [post[0], [post[1], post[2]]],
                        }}
                    >
                        Read more
                    </Link>
                </Post>
            ))}
        </>
    );
};

export default LoaderHOC(PostsListForCategory);
