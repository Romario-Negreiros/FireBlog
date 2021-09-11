// Modules or libs content
import { FC, useState, useContext } from 'react';
import handleMenuOpen from './modules/handleMenuOpen';
import { firebaseAuth } from '../../lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
// Images
import UserIcon from '../../assets/user-solid.svg';
import Moon from '../../assets/moon-solid.svg';
import Sun from '../../assets/sun-solid.svg';
// Components
import Switch from 'react-switch';
import {
    Container,
    Navigation,
    NavList,
    Link,
    Button,
    Burguer,
    Line,
    UserWrapper,
    Icon,
} from './styles';
import DropDown from '../DropDown/DropDown';
// Types
import { Props } from './types';
// Context
import userContext from '../../context/UserContext';

const NavBar: FC<Props> = ({
    hasPostsChanged,
    setHasPostsChanged,
    toggleTheme,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
    const context = useContext(userContext);
    const theme = useContext(ThemeContext);

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
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                hasPostsChanged={hasPostsChanged}
                setHasPostsChanged={setHasPostsChanged}
            />
            <Container>
                <section>
                    <h2>FireBlog</h2>
                    <Navigation>
                        <Burguer
                            onClick={() => {
                                if (isDropDownVisible)
                                    setIsDropDownVisible(false);
                                handleMenuOpen(setIsOpen, isOpen);
                            }}
                        >
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
                                <Button
                                    onClick={() => setIsDropDownVisible(true)}
                                >
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
                            {context?.userData && (
                                <li>
                                    <Link
                                        to={`/home/user/${context?.userData?.name}`}
                                        onClick={() =>
                                            handleMenuOpen(setIsOpen, isOpen)
                                        }
                                    >
                                        Profile
                                    </Link>
                                </li>
                            )}
                        </NavList>
                    </Navigation>
                </section>
                <section>
                    {context?.userData && (
                        <UserWrapper>
                            <p>{context?.userData?.name}</p>
                            <div>
                                <img src={UserIcon} alt="user icon"></img>
                            </div>
                        </UserWrapper>
                    )}
                    <Switch
                        className="react-switch-desktop"
                        onChange={toggleTheme}
                        checked={theme.title === 'dark'}
                        checkedIcon={
                            <Icon src={Sun} alt="turn to light mode" />
                        }
                        uncheckedIcon={
                            <Icon src={Moon} alt="turn to dark mode" />
                        }
                        height={20}
                        width={60}
                        handleDiameter={25}
                        offColor={'#ee55c9'}
                        onColor={'#D6F5DD'}
                    />
                </section>
            </Container>
        </>
    );
};

export default NavBar;
