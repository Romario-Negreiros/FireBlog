import { firebaseDatabase } from '../lib/firebase';
import { PostObject } from '../global/types';

const convertToObject = (posts: [string, [string, PostObject][]][]) => {
    const outerObj: any = {};
    posts.forEach(postsArr => {
        const innerObj: any = {};
        postsArr[1].forEach(post => {
            innerObj[post[0]] = post[1];
        });
        outerObj[postsArr[0]] = innerObj;
    });
    firebaseDatabase.child('posts').set(outerObj);
};

export default convertToObject;
