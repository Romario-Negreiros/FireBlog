// Modules or libs content
import { FC, useState } from 'react';
import { useParams } from 'react-router';
import { Loader } from '..';
// import { firebaseStorage } from '../../lib/firebase';
import { CenteredContainer } from '../Home/styles';
// Images
import UserIcon from '../../assets/user-solid.svg';
// Components
import { Container } from '../Post/styles';
import { ProfileContainer, UserData } from './styles';
// Context

const UserProfile: FC = () => {
    
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [userProfileData, setUserProfileData] = useState<any | null>('a');
    console.log(setIsLoaded, setError, setUserProfileData);

    const { username } = useParams<{ username: string }>();

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
                            <p>Posts created: </p>
                        </li>
                        <li>
                            <img src={UserIcon} alt={`${username}'`} />
                        </li>
                    </UserData>
                </ProfileContainer>
            </Container>
        )
    }
};

export default UserProfile;
