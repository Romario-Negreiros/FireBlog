// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseDatabase } from '../../lib/firebase';
// Components
import { Loader } from '..';
import { CenteredContainer, Post, Link } from '../Home/styles';
import { Container, Title } from './styles';
// Types
import { Posts } from './types';
import { PostsArray, PostObject } from '../Home/types';

const PostsForCategory: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [postsForCategory, setPostsForCategory] = useState<Posts[]>([]);

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        (async () => {
            try {
                const response = await firebaseDatabase.child('posts').get();
                const getIdAndPostsObject = Object.entries(response.val());
                const getIdAndPostsArray: [string, PostsArray[]][] =
                    getIdAndPostsObject.map(v => {
                        return [v[0], Object.entries(v[1] as PostObject)];
                    });
                const postsForCategory: Posts[] = [];
                getIdAndPostsArray.forEach(uidAndPostsArr => {
                    uidAndPostsArr[1].forEach(post => {
                        if (post[1].category === category) {
                            postsForCategory.push([uidAndPostsArr[0], ...post]);
                        }
                    });
                });
                if(!postsForCategory.length) {
                    throw new Error('This category either doesn\'t exist or is empty')
                } else {
                    setPostsForCategory(postsForCategory);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [category]);

    if (!isLoaded) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    } else if (error) {
        return (
            <CenteredContainer>
                <p>{error}</p>
            </CenteredContainer>
        );
    } else {
        return (
            <>
                <Title>
                    {category.charAt(0).toUpperCase() + category.substring(1)}
                </Title>
                <Container>
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
                </Container>
            </>
        );
    }
};

export default PostsForCategory;
