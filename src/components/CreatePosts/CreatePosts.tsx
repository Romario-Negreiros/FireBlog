// Modules or libs content
import { FC, } from 'react';
// Components
import { Container } from './styles';
// Context
// import userContext from '../../context/UserContext';
import PostsForm from '../PostsForm/PostsForm';

const CreatePosts: FC = () => {
    // const context = useContext(userContext);

    return (
        <Container>
            <PostsForm />
        </Container>
    );
};

export default CreatePosts;
