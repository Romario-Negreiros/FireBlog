// Modules or libs content
import { FC, useContext, useState, useEffect } from 'react';
import { firebaseDatabase, firebaseAuth } from '../../lib/firebase';
// Images
import PlusIcon from '../../assets/plus-solid.svg';
import ManageIcon from '../../assets/hammer-solid.svg';
// Components
import {
    Container,
    UserOption,
    Post,
    Link,
    CenteredContainer,
    InputWrapper,
    Input,
    NoMatches,
} from './styles';
import Loader from '../Loader/Loader';
// Types
import { Posts } from './types';
import { DatabaseResponse } from '../../pages/Login/types';
// Context
import userContext from '../../context/UserContext';

const Home: FC = () => {
    const [currentUser, setCurrentUser] =
        useState<firebase.default.User | null>(null);
    firebaseAuth.onAuthStateChanged(currentUser => setCurrentUser(currentUser));

    const context = useContext(userContext);

    const [posts, setPosts] = useState<Posts | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        if (context?.userData?.userID === undefined && currentUser) {
            (async () => {
                    try {
                        const response = await firebaseDatabase
                            .child('users')
                            .child(currentUser.uid)
                            .get();
                        const userData = Object.values(
                            response.val()
                        )[0] as DatabaseResponse;
                        context?.setUserData({
                            ...userData,
                            userID: currentUser.uid,
                        });
                    } catch (err) {
                        console.error(err.message);
                    }
            })();
        }
        if (posts === null) {
            (async () => {
                try {
                    const response = await firebaseDatabase
                        .child('posts')
                        .get();
                    setPosts(Object.values(response.val()));
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoaded(true);
                }
            })();
        }
    }, [currentUser, context, posts]);

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
        const postsArray = posts?.map(post => Object.entries(post));
        const filteredPosts: JSX.Element[] = [];
        postsArray?.forEach(keyValPair =>
            keyValPair.forEach(post => {
                if (!filterValue) {
                    filteredPosts.push(
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
                    );
                } else if (post[1].title.toLowerCase().includes(filterValue.toLowerCase())) {
                    filteredPosts.push(
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
                    );
                }
            })
        );

        return (
            <Container>
                <InputWrapper>
                    <Input
                        onChange={event =>
                            setFilterValue(event.currentTarget.value)
                        }
                        onKeyPress={event =>
                            event.key === 'Enter'
                                ? setFilterValue(event.currentTarget.value)
                                : ''
                        }
                        placeholder="Search for posts"
                        value={filterValue}
                    />
                </InputWrapper>
                <UserOption to={`/home/create/${context?.userData?.userID}`}>
                    <p>Create new post</p>
                    <img src={PlusIcon} alt="plus icon"></img>
                </UserOption>
                <UserOption to={`/home/manage/${context?.userData?.userID}`}>
                    <p>Manage posts</p>
                    <img src={ManageIcon} alt="manage icon"></img>
                </UserOption>
                {filteredPosts.length > 0 ? (
                    filteredPosts
                ) : (
                    <NoMatches>No matches were found!</NoMatches>
                )}
                ;
            </Container>
        );
    }
};

export default Home;
