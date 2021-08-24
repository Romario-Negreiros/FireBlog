import { FC } from 'react';
import { Container, Navigation, Link } from './styles';

const NavBar: FC = () => {
    return (
        <Container>
            <h2>FireBlog</h2>
            <Navigation>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Most visited
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Portfólio
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Github
                        </Link>
                    </li>
                </ul>
            </Navigation>
        </Container>
    )
}

export default NavBar