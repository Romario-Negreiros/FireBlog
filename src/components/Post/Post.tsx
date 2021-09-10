// Modules or libs content
import { FC, useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { firebaseDatabase, firebaseAuth } from '../../lib/firebase';
import { toast } from 'react-toastify';
// Components
import {
    Container,
    PostContainer,
    CustomButton,
    Redirect,
    AvaliationSection,
} from './styles';
import Comments from '../Comments/Comments';
import Rating from '../Rating/Rating';
// Types
import { State } from './types';
import { Rate } from '../Rating/types';
import { CommentsType } from '../Comments/types';
// Context;
import userContext from '../../context/UserContext';
import { CenteredContainer } from '../Home/styles';

const Post: FC = () => {
    const { state } = useLocation<State>();
    const [rate, setRate] = useState<Rate>(
        state && JSON.parse(state[1][1].rate)
    );
    const [comments, setComments] = useState<CommentsType>(
        state && JSON.parse(state[1][1].comments)
    );

    const user = firebaseAuth.currentUser;
    const context = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                await firebaseDatabase
                    .child('posts')
                    .child(state[0])
                    .child(state[1][0])
                    .update({
                        comments: JSON.stringify(comments),
                        rate: JSON.stringify(rate),
                    });
            } catch (err) {
                toast.error(JSON.stringify(err));
            }
        })();
    }, [rate, comments, state]);

    if (state === undefined) {
        return (
            <CenteredContainer>
                <p>Something went wrong here ...</p>
            </CenteredContainer>
        );
    } else {
        return (
            <Container>
                <PostContainer>
                    <CustomButton onClick={() => history.goBack()}>
                        Go back
                    </CustomButton>
                    <h1>{state[1][1].title}</h1>
                    <h3>{state[1][1].author}</h3>
                    <small>{state[1][1].category}</small>
                    <hr />
                    <h2>{state[1][1].description}</h2>
                    <hr />
                    <article>
                        <p>{state[1][1].content}</p>
                    </article>
                    <AvaliationSection>
                        <h2>Comments</h2>
                        {context && context.userData && user ? (
                            <Comments
                                setComments={setComments}
                                comments={comments}
                                userConnected={context.userData}
                            />
                        ) : (
                            <Redirect to="/login">
                                You must be logged in to comment!
                            </Redirect>
                        )}
                        <h2>Rate</h2>
                        {context && context.userData && user ? (
                            <Rating
                                setRate={setRate}
                                rate={rate}
                                user={context.userData}
                            />
                        ) : (
                            <Redirect to="/login">
                                You must be logged in to avaliate the post!
                            </Redirect>
                        )}
                    </AvaliationSection>
                </PostContainer>
            </Container>
        );
    }
};

export default Post;
