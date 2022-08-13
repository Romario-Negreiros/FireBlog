// Modules or libs content
import { FC, useState, useEffect } from 'react';
import { firebaseDatabase } from '../../lib/firebase';
import { toast } from 'react-toastify';
import handleMenuOpen from '../NavBar/modules/handleMenuOpen';
// Components
import { Container, Link, CustomButton } from './styles';
// Types
import { Props, Post } from './types';

const DropDown: FC<Props> = ({
    isDropDownVisible,
    setIsDropDownVisible,
    isOpen,
    setIsOpen,
    hasPostsChanged,
    setHasPostsChanged,
}) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await firebaseDatabase.child('posts').get();
                if (response.val() && response.val() !== undefined) {
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
                } else throw new Error('No posts have been created yet!');
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err.message);
                }
            } finally {
                if (hasPostsChanged) setHasPostsChanged(false);
            }
        })();
    }, [hasPostsChanged, setHasPostsChanged]);

    return (
        <Container isDropDownVisible={isDropDownVisible}>
            <div style={{ width: '100%' }}>
                <CustomButton
                    style={{ width: 'fit-content' }}
                    onClick={() => setIsDropDownVisible(false)}
                >
                    Close
                </CustomButton>
            </div>
            {categories.map((category, i) => (
                <Link
                    className={i === 0 ? 'first-link' : ''}
                    key={category}
                    to={{
                        pathname: `/home/categories/${category}`,
                    }}
                    onClick={() => {
                        setIsDropDownVisible(false);
                        handleMenuOpen(setIsOpen, isOpen);
                    }}
                >
                    {category}
                </Link>
            ))}
        </Container>
    );
};

export default DropDown;
