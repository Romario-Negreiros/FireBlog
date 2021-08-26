// Modules or libs content
import { FC, useContext } from 'react';
// Images
import PlusIcon from '../../assets/plus-solid.svg';
import ManageIcon from '../../assets/hammer-solid.svg';
// Components
import { Container, UserOption } from './styles';
// Context
import userContext from '../../context/UserContext';

const Home: FC = () => {
    const context = useContext(userContext);
    console.log(context);

    return (
        <Container>
            <UserOption>
                <p>Create new post</p>
                <img src={PlusIcon} alt="plus icon"></img>
            </UserOption>
            <UserOption>
                <p>Manage posts</p>
                <img src={ManageIcon} alt="manage icon"></img>
            </UserOption>
        </Container>
    );
};

export default Home;
