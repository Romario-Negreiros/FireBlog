// Modules or libs content
import { FC, useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { firebaseAuth, firebaseDatabase } from '../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
// Components
import {
    Container,
    Post,
    Link,
    Delete,
    CustomButton,
    ButtonWrapper,
} from './styles';
import { Loader } from '..';
import { CenteredContainer } from '../Home/styles';
// Types
import { Posts } from './types';
// Context
import userContext from '../../context/UserContext';

const ManagePosts: FC = () => {
    const [wasDeleted, setWasDeleted] = useState<boolean>(false);
    const [posts, setPosts] = useState<Posts | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const context = useContext(userContext);
    const history = useHistory();
    const user = firebaseAuth.currentUser;

    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    const deletePost = (postID: string) => {
        (async () => {
            try {
                if (context?.userData) {
                    await firebaseDatabase
                        .child('posts')
                        .child(context?.userData.userID)
                        .child(postID)
                        .remove();
                    toast.success('Post succesfully deleted!');
                    setWasDeleted(true);
                } else
                    throw new Error(
                        "The user either doesn't exist or is not signed in"
                    );
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err);
                } else toast.error('Failed to delete post, please try again!');
            }
        })();
    };

    useEffect(() => {
        if (!user) userNotLogged();
        else {
            (async () => {
                try {
                    if (context?.userData) {
                        const response = await firebaseDatabase
                            .child('posts')
                            .child(context.userData.userID)
                            .get();
                        if (response.val())
                            setPosts(Object.entries(response.val()));
                        else setPosts(null);
                    } else
                        throw new Error(
                            "The user either doesn't exist or is not signed in"
                        );
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else setError(JSON.stringify(err));
                } finally {
                    setIsLoaded(true);
                    setWasDeleted(false);
                }
            })();
        }
    }, [user, userNotLogged, wasDeleted, context?.userData]);

    if (!isLoaded) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    } else if (error) {
        return (
            <CenteredContainer>
                <p>{JSON.parse(error).message}</p>
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
                <ButtonWrapper>
                    <CustomButton onClick={() => history.goBack()}>
                        Go back
                    </CustomButton>
                </ButtonWrapper>
                <Container>
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
                </Container>
            </>
        );
    }
};

export default ManagePosts;
