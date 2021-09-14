// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseDatabase } from '../../lib/firebase';
// Components
import { Container, Title } from './styles';
import PostsListForCategory from '../PostsListForCategory/PostsListForCategory';
// Types
import { PostsArray } from '../Home/types';
import { Posts } from './types';
import { PostObject } from '../../global/types';

const PostsForCategory: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [postsForCategory, setPostsForCategory] = useState<Posts[]>([]);

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        (async () => {
            try {
                const response = await firebaseDatabase.child('posts').get();
                const getIdAndPostsObject = Object.entries(response.val());
                const getIdAndPostsArray: [string, PostsArray[]][] =
                    getIdAndPostsObject.map(v => {
                        return [v[0], Object.entries(v[1] as PostObject)];
                    });
                const postsForCategory: Posts[] = [];
                getIdAndPostsArray.forEach(uidAndPostsArr => {
                    uidAndPostsArr[1].forEach(post => {
                        if (post[1].category === category) {
                            postsForCategory.push([uidAndPostsArr[0], ...post]);
                        }
                    });
                });
                if (!postsForCategory.length) {
                    throw new Error(
                        JSON.stringify({
                            message:
                                "This category either doesn't exist or is empty",
                        })
                    );
                } else {
                    setPostsForCategory(postsForCategory);
                }
            } catch (err) {
                setError(JSON.stringify(err));
            } finally {
                setIsLoaded(true);
            }
        })();
    }, [category]);

    return (
        <>
            <Title>
                {category.charAt(0).toUpperCase() + category.substring(1)}
            </Title>
            <Container>
                <PostsListForCategory
                    isLoaded={isLoaded}
                    error={error}
                    postsForCategory={postsForCategory}
                />
            </Container>
        </>
    );
};

export default PostsForCategory;
