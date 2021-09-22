import { PostObject } from '../../../../../global/types';
import { CommentsType } from '../../../../Comments/types';
import convertToObject from '../../../../../utils/convertToObject';

const deleteCommentsAndReplies = async (
    getPosts: [string, [string, PostObject][]][],
    username: string
): Promise<void> => {
    const copyPosts: [string, [string, PostObject][]][] = [...getPosts];
    copyPosts.forEach(postsArr => {
        postsArr[1].forEach(post => {
            const comments: CommentsType = JSON.parse(post[1].comments);
            comments.forEach((comment, index) => {
                if (comment.author === username) {
                    comments.splice(index, 1);
                }
                comment.replies.forEach((reply, index) => {
                    if (reply.author === username) {
                        comment.replies.splice(index, 1);
                    }
                });
            });
            post[1].comments = JSON.stringify(comments);
        });
    });
    convertToObject(copyPosts);
};

export default deleteCommentsAndReplies;
