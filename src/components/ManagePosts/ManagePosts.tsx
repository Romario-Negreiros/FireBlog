// Modules or libs content
import { FC, useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { firebaseAuth, firebaseDatabase } from '../../lib/firebase';
// Components
import { Container, Post, Link } from './styles';
import { Loader } from '..';
import { CenteredContainer } from '../Home/styles';
// Types
import { Posts } from './types';

const ManagePosts: FC = () => {
    const { userID } = useParams<{ userID: string }>();

    const history = useHistory();
    const user = firebaseAuth.currentUser;
    const [posts, setPosts] = useState<Posts | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    useEffect(() => {
        if (!user) userNotLogged();
        else {
            (async () => {
                try {
                    const response = await firebaseDatabase
                        .child('posts')
                        .child(userID)
                        .get();
                    if(response.val()) setPosts(Object.entries(response.val()));
                    else return
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoaded(true);
                }
            })();
        }
    }, [user, userNotLogged, userID]);

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
        )
    } else {
        return (
            <Container>
                {posts?.map(post => (
                    <Post key={post[0]}>
                        <h2>{post[1].title}</h2>
                        <small>{post[1].category}</small>
                        <p>{post[1].description}</p>
                        <Link to={`/home/edit/${post[0]}`}>Edit post</Link>
                    </Post>
                ))};
            </Container>
        );
    }
};

export default ManagePosts;
