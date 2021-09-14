// Modules or libs content
import { FC } from 'react';
// Components
import { LoaderHOC } from '../../HOCs/index'
import { NoMatches } from './styles';
import { Post, Link } from '../../global/styles';
// Types
import { Props } from './types';
import { PostsArray } from '../Home/types';
import { PostObject } from '../../global/types';

const PostList: FC<Props> = ({ posts, filterValue }) => {
    const filteredPosts: JSX.Element[] = [];
    posts?.forEach(keyValPair => {
        const postsForId: PostsArray[] = Object.entries(
            keyValPair[1] as unknown as PostObject
        );
        postsForId.forEach(post => {
            if (!filterValue) {
                filteredPosts.push(
                    <Post key={post[0]}>
                        <h2>{post[1].title}</h2>
                        <small>{post[1].category}</small>
                        <p>{post[1].description}</p>
                        <Link to={`/home/user/${post[1].author}`}>
                            {post[1].author}
                        </Link>
                        <Link
                            to={{
                                pathname: `/home/posts/${post[0]}`,
                                state: [keyValPair[0], post],
                            }}
                        >
                            Read more
                        </Link>
                    </Post>
                );
            } else if (
                post[1].title.toLowerCase().includes(filterValue.toLowerCase())
            ) {
                filteredPosts.push(
                    <Post key={post[0]}>
                        <h2>{post[1].title}</h2>
                        <small>{post[1].category}</small>
                        <small>{post[1].author}</small>
                        <p>{post[1].description}</p>
                        <Link
                            to={{
                                pathname: `/home/posts/${post[0]}`,
                                state: [keyValPair[0], post],
                            }}
                        >
                            Read more
                        </Link>
                    </Post>
                );
            }
        });
    });
    return (
        <>
            {filteredPosts.length > 0 ? (
                filteredPosts
            ) : (
                <NoMatches>No matches were found!</NoMatches>
            )}
        </>
    );
};

export default LoaderHOC(PostList);
