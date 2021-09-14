// Modules or libs content
import { FC, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { firebaseAuth } from '../../lib/firebase';
import getCurrentUser from './modules/getCurrentUser';
import getTotalPostsCreated from './modules/getTotalPostsCreated';
import getPostsAverageRate from './modules/getPostsAverageRate';
import getTotalComments from './modules/getTotalComments';
import getTotalLikesInComments from './modules/getTotalLikesInComments';
// Images
import UserIcon from '../../assets/user-solid.svg';
// Components
import { CenteredContainer } from '../../global/styles';
import { Loader } from '..';
import { Container } from '../Post/styles';
import { ProfileContainer, UserData, AccountOptions } from './styles';
import { ChangeAccountName, Portal } from '..';
// Types
import { UserInfo } from './types';

const UserProfile: FC = () => {
    const [action, setAction] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userProfileData, setUserProfileData] = useState<UserInfo | null>();
    const { username } = useParams<{ username: string }>();

    const switchModal = () => {
        switch (action) {
            case 'changename':
                return (
                    <ChangeAccountName
                        setIsModalVisible={setIsModalVisible}
                        formerName={username}
                    />
                );
            default:
                return <div>hello world</div>;
        }
    };

    const getUserInfo = useCallback(async () => {
        const userProfileData: Partial<UserInfo> = {};
        try {
            userProfileData['user'] = await getCurrentUser(username);
            if (userProfileData.user) {
                userProfileData['posts_created'] = await getTotalPostsCreated(
                    userProfileData.user.userID
                );
                userProfileData['posts_average_rate'] =
                    await getPostsAverageRate(userProfileData.user.userID);
                userProfileData['total_comments'] = await getTotalComments(
                    username
                );
                userProfileData['total_likes_in_comments'] =
                    await getTotalLikesInComments(username);
                setUserProfileData(userProfileData as UserInfo);
            } else setUserProfileData(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoaded(true);
        }
    }, [username]);

    useEffect(() => {
        getUserInfo();
    }, [username, getUserInfo]);

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
                <p>The user may not have any data!</p>
            </CenteredContainer>
        );
    } else if (!userProfileData) {
        return (
            <CenteredContainer>
                <p>The user doesn't exist!</p>
            </CenteredContainer>
        );
    } else {
        const openModal = (action: string) => {
            setIsModalVisible(true);
            setAction(action);
        };
        const user = firebaseAuth.currentUser;
        return (
            <>
                <Container>
                    <ProfileContainer>
                        <UserData>
                            <li>
                                <h1>{username}</h1>
                                <h2>Stats</h2>
                                <p>
                                    Posts created:{' '}
                                    <span>{userProfileData.posts_created}</span>
                                </p>
                                <p>
                                    Posts average rate:{' '}
                                    <span>
                                        {userProfileData.posts_average_rate} of
                                        5
                                    </span>
                                </p>
                                <p>
                                    Comments:{' '}
                                    <span>
                                        {userProfileData.total_comments}
                                    </span>
                                </p>
                                <p>
                                    Likes on comments:{' '}
                                    <span>
                                        {
                                            userProfileData.total_likes_in_comments
                                        }
                                    </span>
                                </p>
                            </li>
                            <li>
                                <img src={UserIcon} alt={`${username}'`} />
                            </li>
                        </UserData>
                        {user && user.uid === userProfileData.user?.userID ? (
                            <AccountOptions>
                                <li>
                                    <span>Change password</span>
                                </li>
                                <li onClick={() => openModal('changename')}>
                                    <span>Change account name</span>
                                </li>
                                <li>
                                    <span>Private profile?</span>
                                </li>
                                <li>
                                    <span>Two-factor authentication</span>
                                </li>
                            </AccountOptions>
                        ) : (
                            ''
                        )}
                    </ProfileContainer>
                </Container>
                {isModalVisible && <Portal>{switchModal()}</Portal>}
            </>
        );
    }
};

export default UserProfile;
