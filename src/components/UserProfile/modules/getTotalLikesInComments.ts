import { firebaseDatabase } from '../../../lib/firebase';

import { PostObject } from '../../../global/types';
import { CommentsType } from '../../Comments/types';

const getTotalLikesInComments = async (
    username: string
): Promise<number> => {
    let totalLikesInComments: number = 0;
        const response = await firebaseDatabase.child('posts').get();
        const getValues = Object.values(response.val());
        const getPosts: PostObject[][] = getValues.map(postObj =>
            Object.values(postObj as { postId: PostObject })
        );
        const getAllComments: CommentsType[][] = getPosts.map(postArr => {
            return postArr.map(post => JSON.parse(post.comments));
        });
        getAllComments.forEach(commentsForPost => {
            commentsForPost.forEach(commentsArr => {
                commentsArr.forEach(comment => {
                    if (comment.author === username) {
                        comment.rating.forEach(rate => {
                            if (rate.like) totalLikesInComments += 1;
                        });
                    }
                });
            });
        });
        return totalLikesInComments;
};

export default getTotalLikesInComments;
