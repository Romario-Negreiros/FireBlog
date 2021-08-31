// Modules or libs content
import { FC, useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { firebaseAuth, firebaseDatabase } from '../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { Container, Post, Link, Delete } from './styles';
import { Loader } from '..';
import { CenteredContainer } from '../Home/styles';
// Types
import { Posts } from './types';

const ManagePosts: FC = () => {

    const { userID } = useParams<{ userID: string }>();
    const [wasDeleted, setWasDeleted] = useState<boolean>(false);

    const history = useHistory();
    const user = firebaseAuth.currentUser;
    const [posts, setPosts] = useState<Posts | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    const deletePost = (postID: string) => {
        (async () => {
            try {
                await firebaseDatabase
                    .child('posts')
                    .child(userID)
                    .child(postID)
                    .remove();
                toast.success('Post succesfully deleted!');
                setWasDeleted(true);
            } catch (err) {
                toast.error('Failed to delete post, please try again!');
            }
        })();
    };

    useEffect(() => {
        if (!user) userNotLogged();
        else {
            (async () => {
                try {
                    const response = await firebaseDatabase
                        .child('posts')
                        .child(userID)
                        .get();
                    if (response.val())
                        setPosts(Object.entries(response.val()));
                    else setPosts(null);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoaded(true);
                    setWasDeleted(false);
                }
            })();
        }
    }, [user, userNotLogged, userID, wasDeleted]);

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
    } else if (!posts) {
        return (
            <CenteredContainer>
                <p>You haven't created any post yet!</p>
            </CenteredContainer>
        );
    } else {
        return (
            <>
                <ToastContainer
                    autoClose={3000}
                    closeButton={false}
                    style={{ fontSize: '16px' }}
                />
                <Container>
                    {posts?.map(post => (
                        <Post key={post[0]}>
                            <h2>{post[1].title}</h2>
                            <small>{post[1].category}</small>
                            <p>{post[1].description}</p>
                            <Link
                                to={{
                                    pathname: `/home/edit/${userID}`,
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
                    ;
                </Container>
            </>
        );
    }
};

export default ManagePosts;
