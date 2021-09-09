// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { firebaseDatabase } from '../../lib/firebase';
import { toast } from 'react-toastify';
// Components
import { Container, Link, CustomButton } from './styles';
// Types
import { Props, Post } from './types';

const DropDown: FC<Props> = ({
    isDropDownVisible,
    setIsDropDownVisible,
    setIsOpen,
    hasPostsChanged,
    setHasPostsChanged,
}) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await firebaseDatabase.child('posts').get();
                const getValues = Object.values(response.val());
                const getEntries = getValues.map(post =>
                    Object.entries(post as Post)
                );
                const getCategories: string[] = [];
                getEntries.forEach(postArr => {
                    postArr.forEach(post => {
                        if (
                            !getCategories.some(
                                category => category === post[1].category
                            )
                        ) {
                            getCategories.push(post[1].category);
                        }
                    });
                });
                setCategories(getCategories);
            } catch (err) {
                toast.error(JSON.stringify(err));
            } finally {
                if (hasPostsChanged) setHasPostsChanged(false);
            }
        })();
    }, [hasPostsChanged, setHasPostsChanged]);

    return (
        <Container isDropDownVisible={isDropDownVisible}>
            <CustomButton onClick={() => setIsDropDownVisible(false)}>
                Close
            </CustomButton>
            {categories.map(category => (
                <Link
                    key={category}
                    to={{
                        pathname: `/home/categories/${category}`,
                    }}
                    onClick={() => {
                        setIsDropDownVisible(false);
                        setIsOpen(false);
                    }}
                >
                    {category}
                </Link>
            ))}
        </Container>
    );
};

export default DropDown;
