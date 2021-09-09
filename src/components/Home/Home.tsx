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
import { Posts, PostsArray } from './types';
import { PostObject } from '../../global/types';
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
                    setError(JSON.stringify(err))
                }
            })();
        }
        if (posts === null) {
            (async () => {
                try {
                    const response = await firebaseDatabase
                        .child('posts')
                        .get();
                    if (
                        response.val() !== null &&
                        response.val() !== undefined
                    ) {
                        setPosts(Object.entries(response.val()));
                    }
                } catch (err) {
                    setError(JSON.stringify(err))
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
                <p>{JSON.parse(error).message}</p>
            </CenteredContainer>
        );
    } else if (posts === null) {
        return (
            <CenteredContainer>
                 <UserOption to={'/home/create'}>
                    <p>Create new post</p>
                    <img src={PlusIcon} alt="plus icon"></img>
                </UserOption>
                <UserOption to={`/home/manage/${context?.userData?.userID}`}>
                    <p>Manage posts</p>
                    <img src={ManageIcon} alt="manage icon"></img>
                </UserOption>
                <p>Hmmm, something went wrong!</p>
            </CenteredContainer>
        );
    } else {
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
                } else if (
                    post[1].title
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
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
            </Container>
        );
    }
};

export default Home;
