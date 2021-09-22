import { PostObject } from '../../../../../global/types';
import { CommentsType } from '../../../../Comments/types';
import convertToObject from '../../../../../utils/convertToObject';

const changeName = async (
    getPosts: [string, [string, PostObject][]][],
    newName: string,
    formerName: string
): Promise<void> => {
    const copyPosts: [string, [string, PostObject][]][] = [...getPosts];
    copyPosts.forEach(postsArr => {
        postsArr[1].forEach(post => {
            if (post[1].author === formerName) {
                post[1].author = newName;
            }
            const comments: CommentsType = JSON.parse(post[1].comments);
            comments.forEach(comment => {
                if (comment.author === formerName) {
                    comment.author = newName;
                }
                comment.replies.forEach(reply => {
                    if (reply.author === formerName) {
                        reply.author = newName;
                    }
                });
            });
            post[1].comments = JSON.stringify(comments);
        });
    });
    convertToObject(copyPosts);
};

export default changeName;
