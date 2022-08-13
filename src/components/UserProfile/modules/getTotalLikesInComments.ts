import { firebaseDatabase } from '../../../lib/firebase';

import { PostObject } from '../../../global/types';
import { CommentsType } from '../../Comments/types';

const getTotalLikesInComments = async (username: string): Promise<number> => {
    let totalLikesInComments: number = 0;
    const response = await firebaseDatabase.child('posts').get();
    const getValues = Object.values(response.val());
    const getPosts: PostObject[] = getValues.map(postObj => {
        const post = Object.values(postObj as { postId: PostObject });
        return post[0];
    });
    const getAllComments: CommentsType = getPosts.map(post => {
        const comments = JSON.parse(JSON.parse(post.comments));
        return comments[0];
    });
    getAllComments.forEach(comment => {
        if (comment.author === username) {
            comment.rating.forEach(rate => {
                if (rate.like) totalLikesInComments += 1;
            });
        }
    });
    return totalLikesInComments;
};

export default getTotalLikesInComments;
