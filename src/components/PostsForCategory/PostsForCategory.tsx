// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseDatabase } from '../../lib/firebase';
// Components
import { Loader } from '..';
import { CenteredContainer, Post, Link, NoMatches } from '../Home/styles';
import { Container, Title } from './styles';
// Types
import { PostObject } from './types';
import { Posts } from '../ManagePosts/types';
const PostsForCategory: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [postsForCategory, setPostsForCategory] = useState<Posts>([]);

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        (async () => {
            try {
                const response = await firebaseDatabase.child('posts').get();
                const getValues: PostObject[] = Object.values(response.val());
                console.log(getValues);
                const getEntries: Posts[] = getValues.map(value =>
                    Object.entries(value)
                );
                const postsForCategory: Posts = [];
                getEntries.forEach(postsArr => {
                    postsArr.forEach(post => {
                        if (post[1].category === category) {
                            postsForCategory.push(post);
                        }
                    });
                });
                setPostsForCategory(postsForCategory);
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
    } else if (!postsForCategory.length) {
        return (
            <CenteredContainer>
                <NoMatches> No posts for this category were found </NoMatches>
            </CenteredContainer>
        );
    } else {
        return (
            <>
                <Title>{category.charAt(0).toUpperCase() + category.substring(1)}</Title>
                <Container>
                    {postsForCategory.map(post => (
                        <Post>
                            <Post key={post[0]}>
                                <h2>{post[1].title}</h2>
                                <small>{post[1].category}</small>
                                <p>{post[1].description}</p>
                                <Link
                                    to={{
                                        pathname: `/home/posts/${post[0]}`,
                                        state: post,
                                    }}
                                >
                                    Read more
                                </Link>
                            </Post>
                        </Post>
                    ))}
                </Container>
            </>
        );
    }
};

export default PostsForCategory;
