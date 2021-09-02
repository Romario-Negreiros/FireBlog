// Modules or libs content
import { FC, useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactStars from 'react-stars';
import { firebaseDatabase, firebaseAuth } from '../../lib/firebase';
// Components
import {
    Container,
    PostContainer,
    CustomButton,
    AvaliationSection,
} from './styles';
// Types
import { State, Rate } from './types';
// Context;
import userContext from '../../context/UserContext';
import { CenteredContainer } from '../Home/styles';

const Post: FC = () => {
    const getAverageRate = (
        rate: Rate,
        setAverageRate: (average: number) => void
    ) => {
        if (rate !== undefined) {
            const toNumber = rate.map(rateObj => parseInt(rateObj.rate));
            const sumAll: number = toNumber.reduce((a, v) => a + v, 0);
            const average: number = sumAll / rate.length;
            setAverageRate(average);
        }
    };

    const getPersonalRateInitialValue = (
        rate: Rate,
        setPersonalRate: (personalRate: number) => void,
        userID: string
    ) => {
        const personalRate: {userid: string, rate: string} | undefined = rate.find(rateObj => rateObj.userid === userID);
        if(personalRate !== undefined) setPersonalRate(Number(personalRate.rate));
        else setPersonalRate(0);
    };

    const { state } = useLocation<State>();
    const [rate, setRate] = useState<Rate>(
        state && JSON.parse(state[1][1].rate)
    );
    const [averageRate, setAverageRate] = useState<number>();
    const [personalRate, setPersonalRate] = useState<number>();

    const user = firebaseAuth.currentUser;
    const history = useHistory();
    const context = useContext(userContext);

    useEffect(() => {
        getAverageRate(rate, setAverageRate);
        if (context !== null && context.userData !== null && user !== null) {
            const { userID } = context.userData;
            getPersonalRateInitialValue(rate, setPersonalRate, userID);
        }
        return () => {
            (async () => {
                try {
                    await firebaseDatabase
                        .child('posts')
                        .child(state[0])
                        .child(state[1][0])
                        .update({
                            rate: JSON.stringify(rate),
                        });
                } catch (err) {
                    if (err instanceof TypeError) console.log(err.message);
                }
            })();
        };
    }, [rate, state, context, user]);
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
                        <small>
                            You must be logged in to avaliate the post!
                        </small>
                        <br />
                        <small>Public rating</small>
                        <ReactStars
                            className="react-stars"
                            value={averageRate}
                            edit={false}
                            size={30}
                            color2={'#ffd700'}
                        />
                        <br />
                        <small>Your rating</small>
                        <ReactStars
                            className="react-stars"
                            value={personalRate}
                            onChange={personalRate => {
                                if (
                                    context !== null &&
                                    context.userData !== null &&
                                    user !== null
                                ) {
                                    const { userID } = context.userData;
                                    setPersonalRate(personalRate);
                                    if (
                                        rate.some(
                                            rateObj => rateObj.userid === userID
                                        )
                                    ) {
                                        const newRateArray: Rate = rate.map(
                                            rateObj => {
                                                if (rateObj.userid === userID) {
                                                    return {
                                                        userid: rateObj.userid,
                                                        rate: String(
                                                            personalRate
                                                        ),
                                                    };
                                                } else return rateObj;
                                            }
                                        );
                                        setRate(newRateArray);
                                    } else
                                        setRate(oldRate => [
                                            ...oldRate,
                                            {
                                                userid: userID,
                                                rate: String(personalRate),
                                            },
                                        ]);
                                } else history.push('/login');
                            }}
                            size={30}
                            color2={'#ffd700'}
                        />
                    </AvaliationSection>
                </PostContainer>
            </Container>
        );
    }
};

export default Post;
