// Modules or libs content
import { FC, useState, useContext } from 'react';
import handleMenuOpen from './modules/handleMenuOpen';
import { firebaseAuth } from '../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
// Images
import UserIcon from '../../assets/user-solid.svg';
// Components
import {
    Container,
    Navigation,
    NavList,
    Link,
    Button,
    Burguer,
    Line,
    UserWrapper,
} from './styles';
import DropDown from '../DropDown/DropDown';
// Context
import userContext from '../../context/UserContext';

const NavBar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
    const context = useContext(userContext);

    return (
        <>
            <ToastContainer
                autoClose={3000}
                closeButton={false}
                style={{ fontSize: '16px' }}
            />
            <DropDown
                isDropDownVisible={isDropDownVisible}
                setIsDropDownVisible={setIsDropDownVisible}
            />
            <Container>
                <h2>FireBlog</h2>
                {context?.userData && (
                    <UserWrapper>
                        <p>{context?.userData?.name}</p>
                        <div>
                            <img src={UserIcon} alt="user icon"></img>
                        </div>
                    </UserWrapper>
                )}
                <Navigation>
                    <Burguer onClick={() => handleMenuOpen(setIsOpen, isOpen)}>
                        <Line className="first"></Line>
                        <Line className="second"></Line>
                        <Line className="third"></Line>
                    </Burguer>
                    <NavList isOpen={isOpen}>
                        <li>
                            <Link
                                to="/home"
                                onClick={() =>
                                    handleMenuOpen(setIsOpen, isOpen)
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Button onClick={() => setIsDropDownVisible(true)}>
                                Categories
                            </Button>
                        </li>
                        <li>
                            {context?.userData ? (
                                <Button
                                    onClick={() => {
                                        (async () => {
                                            try {
                                                await firebaseAuth.signOut();
                                                toast.success(
                                                    'Succesfully signed out'
                                                );
                                                context.setUserData(null);
                                            } catch (err) {
                                                toast.error(
                                                    'Failed to sign out'
                                                );
                                            }
                                        })();
                                    }}
                                >
                                    Sign out
                                </Button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        handleMenuOpen(setIsOpen, isOpen)
                                    }
                                >
                                    Sign in
                                </Link>
                            )}
                        </li>
                    </NavList>
                </Navigation>
            </Container>
        </>
    );
};

export default NavBar;
