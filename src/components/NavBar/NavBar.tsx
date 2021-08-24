import { FC } from 'react';
import { Container, Navigation, Link, Burguer } from './styles';

const NavBar: FC = () => {
    return (
        <Container>
            <h2>FireBlog</h2>
            <Navigation>
                <Burguer>
                    <span className="close-right"></span>
                    <span className="close-left"></span>
                    <span className="fade"></span>
                </Burguer>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Most visited</Link>
                    </li>
                    <li>
                        <Link to="/">Portfólio</Link>
                    </li>
                    <li>
                        <Link to="/">Github</Link>
                    </li>
                </ul>
            </Navigation>
        </Container>
    );
};

export default NavBar;
