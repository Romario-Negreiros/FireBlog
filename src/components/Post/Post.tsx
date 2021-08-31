// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactStars from 'react-stars';
import { firebaseDatabase } from '../../lib/firebase';
// Components
import {
    Container,
    PostContainer,
    CustomButton,
    AvaliationSection,
} from './styles';
// Types
import { State } from './types';

const Post: FC = () => {
    const history = useHistory();
    const { state } = useLocation<State>();
    const [rate, setRate] = useState<number>(Number(state[1][1].rate));

    useEffect(() => {
        return () => {
            (async () => {
                try {
                    await firebaseDatabase.child('posts').child(state[0]).child(state[1][0]).update({
                        rate: String(rate)
                    })
                } catch (err) {
                    console.error(err.message);
                }
            })();
        };
    });
    return (
        <Container>
            <PostContainer>
                <CustomButton onClick={() => history.goBack()}>
                    Go back
                </CustomButton>
                <h1>{state[1][1].title}</h1>
                <small>{state[1][1].category}</small>
                <hr />
                <h2>{state[1][1].description}</h2>
                <hr />
                <article>
                    <p>{state[1][1].content}</p>
                </article>
                <AvaliationSection>
                    <h2>Comments</h2>
                    <small>You must be logged in to comment!</small>
                    <p>{state[1][1].comments}</p>
                    <h2>Rate</h2>
                    <small>You must be logged in to avaliate the post!</small>
                    <ReactStars
                        className='react-stars'
                        value={rate}
                        onChange={rate => {
                            setRate(rate);
                        }}
                        size={30}
                        color2={'#ffd700'}
                    />
                </AvaliationSection>
            </PostContainer>
        </Container>
    );
};

export default Post;
