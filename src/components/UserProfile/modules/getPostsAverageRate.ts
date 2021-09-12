import { firebaseDatabase } from '../../../lib/firebase';

import { PostObject } from '../../../global/types';

type Rates = {
    userid: string;
    rate: string;
}[][];

interface RatesInfo {
    total: number;
    length: number;
}

const getPostsAverageRate = async (userID: string): Promise<string> => {
    const dataToReturn: Partial<{ averageRate: string }> = {};
    const response = await firebaseDatabase.child('posts').child(userID).get();
    if (response.val()) {
        const getValues: PostObject[] = Object.values(response.val());
        const rates: Rates = getValues.map(post => {
            return JSON.parse(post.rate);
        });
        const ratesInfo: RatesInfo = {
            total: 0,
            length: 0,
        };
        rates.forEach(rateArr => {
            ratesInfo.length += rateArr.length;
            rateArr.forEach(rateObj => {
                ratesInfo.total += Number(rateObj.rate);
            });
        });
        dataToReturn['averageRate'] = (
            ratesInfo.total / ratesInfo.length
        ).toFixed(2);
    } else dataToReturn['averageRate'] = '0';
    return dataToReturn.averageRate as string;
};

export default getPostsAverageRate;
