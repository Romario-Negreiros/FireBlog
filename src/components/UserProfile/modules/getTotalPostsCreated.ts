import { firebaseDatabase } from '../../../lib/firebase';

const getTotalPostsCreated = async (userID: string): Promise<number> => {
    const dataToReturn: Partial<{ totalPosts: number }> = {};
    const response = await firebaseDatabase.child('posts').child(userID).get();
    if (response.val()) {
        const getValues = Object.values(response.val());
        dataToReturn['totalPosts'] = getValues.length;
    } else dataToReturn['totalPosts'] = 0;
    return dataToReturn.totalPosts as number;
};

export default getTotalPostsCreated;
