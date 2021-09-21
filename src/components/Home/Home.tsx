// Modules or libs content
import { FC, useContext, useState, useEffect } from 'react';
import { firebaseDatabase, firebaseAuth, firebaseStorage } from '../../lib/firebase';
// Images
import PlusIcon from '../../assets/plus-solid.svg';
import ManageIcon from '../../assets/hammer-solid.svg';
// Components
import PostList from '../PostList/PostList';
import { Container, UserOption, InputWrapper, Input } from './styles';
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

    const [posts, setPosts] = useState<Posts>([]);
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
                    try {
                        const profileImgURL = await firebaseStorage.child('userimages').child(currentUser.uid).getDownloadURL();
                        context?.setUserData({
                            ...userData,
                            userID: currentUser.uid,
                            profileImg: profileImgURL as string ? profileImgURL as string : '',
                        });
                    } catch(err) {
                        console.log(err);
                    }   
                } catch (err) {
                    if(err instanceof Error) {
                        setError(err.message);
                    }
                }
            })();
        }
        if (!posts.length) {
            (async () => {
                try {
                    const response = await firebaseDatabase
                        .child('posts')
                        .get();
                    if (response.val() !== null && response.val() !== undefined)
                        setPosts(Object.entries(response.val()));
                } catch (err) {
                    if(err instanceof Error) {
                        setError(err.message);
                    };
                } finally {
                    setIsLoaded(true);
                }
            })();
        }
    }, [currentUser, context, posts]);

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
            <PostList
                isLoaded={isLoaded}
                error={error}
                posts={posts}
                filterValue={filterValue}
            />
        </Container>
    );
};

export default Home;
