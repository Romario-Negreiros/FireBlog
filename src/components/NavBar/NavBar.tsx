// Modules or libs content
import { FC, useState, useContext } from 'react';
import handleMenuOpen from './modules/handleMenuOpen';
// Images
import UserIcon from '../../assets/user-solid.svg';
// Components
import {
    Container,
    Navigation,
    NavList,
    Link,
    Burguer,
    Line,
    UserWrapper,
} from './styles';
// Context
import userContext from '../../context/UserContext';

const NavBar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const context = useContext(userContext);

    return (
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
                <Burguer
                    onClick={() => handleMenuOpen(setIsOpen, isOpen)}
                >
                    <Line className="first"></Line>
                    <Line className="second"></Line>
                    <Line className="third"></Line>
                </Burguer>
                <NavList isOpen={isOpen}>
                    <li>
                        <Link to="/home" onClick={() => handleMenuOpen(setIsOpen, isOpen)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/home" onClick={() => handleMenuOpen(setIsOpen, isOpen)}>Categores</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={() => handleMenuOpen(setIsOpen, isOpen)}>Login</Link>
                    </li>
                </NavList>
            </Navigation>
        </Container>
    );
};

export default NavBar;
