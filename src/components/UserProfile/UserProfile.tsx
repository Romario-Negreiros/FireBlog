// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Loader } from '..';
import { firebaseAuth } from '../../lib/firebase';
import { CenteredContainer } from '../Home/styles';
import getCurrentUser from './modules/getCurrentUser';
import getTotalPostsCreated from './modules/getTotalPostsCreated';
import getPostsAverageRate from './modules/getPostsAverageRate';
import getTotalComments from './modules/getTotalComments';
import getTotalLikesInComments from './modules/getTotalLikesInComments';
// Images
import UserIcon from '../../assets/user-solid.svg';
// Components
import { Container } from '../Post/styles';
import { ProfileContainer, UserData } from './styles';
// Types
import { UserInfo } from './types';

const UserProfile: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userProfileData, setUserProfileData] = useState<UserInfo | null>(
        null
    );
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (firebaseAuth.currentUser) {
            const { uid } = firebaseAuth.currentUser;
            const getUserInfo = async () => {
                const userProfileData: Partial<UserInfo> = {};
                try {
                    userProfileData['user'] = await getCurrentUser(uid);
                    userProfileData['posts_created'] =
                        await getTotalPostsCreated(uid);
                    userProfileData['posts_average_rate'] =
                        await getPostsAverageRate(uid);
                    userProfileData['total_comments'] = await getTotalComments(
                        username
                    );
                    userProfileData['total_likes_in_comments'] =
                        await getTotalLikesInComments(username);
                    setUserProfileData(userProfileData as UserInfo);
                } catch (err) {
                    if(err instanceof Error) {
                        setError(err.message);
                    }
                } finally {
                    setIsLoaded(true);
                }
            };
            getUserInfo();
        }
    }, [username]);

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
        return (
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
                                    {userProfileData.posts_average_rate} of 5
                                </span>
                            </p>
                            <p>
                                Comments:{' '}
                                <span>{userProfileData.total_comments}</span>
                            </p>
                            <p>
                                Likes on comments:{' '}
                                <span>
                                    {userProfileData.total_likes_in_comments}
                                </span>
                            </p>
                        </li>
                        <li>
                            <img src={UserIcon} alt={`${username}'`} />
                        </li>
                    </UserData>
                </ProfileContainer>
            </Container>
        );
    }
};

export default UserProfile;
