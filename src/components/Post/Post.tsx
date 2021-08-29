// Modules or libs content
import { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// Components
import { Container, PostContainer, CustomButton } from './styles';
// Types
import { State } from '../EditPosts/types';

const Post: FC = () => {
    const history = useHistory();
    const { state } = useLocation<State>();

    return (
        <Container>
            <PostContainer>
                <CustomButton onClick={() => history.goBack()}>
                    Go back
                </CustomButton>
                <h1>{state[1].title}</h1>
                <small>{state[1].category}</small>
                <hr />
                <h2>{state[1].description}</h2>
                <hr />
                <article>
                    <p>{state[1].content}</p>
                </article>
            </PostContainer>
        </Container>
    );
};

export default Post;
