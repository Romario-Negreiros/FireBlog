// Modules or libs content
import { FC, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { firebaseAuth } from '../../lib/firebase';
// Components
import { Container } from './styles';
import PostsForm from '../PostsForm/PostsForm';

const CreatePosts: FC = () => {

    const { userID } = useParams<{ userID: string }>();
    console.log(userID)
    const history = useHistory();
    const user = firebaseAuth.currentUser;
    console.log(user)
    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    useEffect(() => {
        if (!user) userNotLogged();
    }, [user, userNotLogged]);

    return (
        <Container>
            <PostsForm />
        </Container>
    );
};

export default CreatePosts;
