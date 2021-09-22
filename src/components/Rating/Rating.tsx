// Modules or libs content
import { FC, useState, useEffect } from 'react';
// Components
import ReactStars from 'react-stars';
// Types
import { Rate, Props } from './types';

const Rating: FC<Props> = ({ setRate, rate, user }) => {
    const [averageRate, setAverageRate] = useState<number>();
    const [personalRate, setPersonalRate] = useState<number>();

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
        const personalRate: { userid: string; rate: string } | undefined =
            rate.find(rateObj => rateObj.userid === userID);
        if (personalRate !== undefined)
            setPersonalRate(Number(personalRate.rate));
        else setPersonalRate(0);
    };

    useEffect(() => {
        getAverageRate(rate, setAverageRate);
        getPersonalRateInitialValue(rate, setPersonalRate, user.userID);
    }, [rate, user]);

    return (
        <>
            <small>Public rating</small>
            <ReactStars
                value={averageRate}
                edit={false}
                size={30}
                color2={'#ffd700'}
            />
            <br />
            <small>Your rating</small>
            <ReactStars
                value={personalRate}
                onChange={personalRate => {
                    const { userID } = user;
                    setPersonalRate(personalRate);
                    if (rate.some(rateObj => rateObj.userid === userID)) {
                        const newRateArray: Rate = rate.map(rateObj => {
                            if (rateObj.userid === userID) {
                                return {
                                    userid: rateObj.userid,
                                    rate: String(personalRate),
                                };
                            } else return rateObj;
                        });
                        setRate(newRateArray);
                    } else {
                        setRate([
                            ...rate,
                            { userid: userID, rate: String(personalRate) },
                        ]);
                    }
                }}
                size={30}
                color2={'#ffd700'}
            />
        </>
    );
};

export default Rating;
