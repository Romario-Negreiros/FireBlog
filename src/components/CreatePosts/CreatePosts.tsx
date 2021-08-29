// Modules or libs content
import { FC, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { firebaseAuth } from '../../lib/firebase';
// Components
import { Container } from './styles';
import PostsForm from '../PostsForm/PostsForm';
// Types
import { Props } from '../PostsForm/types';

const CreatePosts: FC<Props> = ({ setHasPostsChanged}) => {
    
    const history = useHistory();
    const user = firebaseAuth.currentUser;
    
    const userNotLogged = useCallback(() => {
        history.push('/login');
    }, [history]);

    useEffect(() => {
        if (!user) userNotLogged();
    }, [user, userNotLogged]);

    return (
        <Container>
            <PostsForm setHasPostsChanged={setHasPostsChanged} />
        </Container>
    );
};

export default CreatePosts;
