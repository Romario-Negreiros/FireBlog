import React, { FC, useState } from 'react';
import { Container, Navigation, NavList, Link, Burguer, Line } from './styles';

const NavBar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(!isOpen);
        if (event.currentTarget.firstElementChild)
            event.currentTarget.firstElementChild.classList.toggle(
                'close-left'
            );
        if (event.currentTarget.firstElementChild?.nextElementSibling)
            event.currentTarget.firstElementChild.nextElementSibling.classList.toggle(
                'close-right'
            );
        if (event.currentTarget.lastElementChild) {
            event.currentTarget.lastElementChild.classList.toggle('fade');
        }
    };

    return (
        <Container>
            <h2>FireBlog</h2>
            <Navigation>
                <Burguer onClick={event => handleMenuOpen(event)}>
                    <Line></Line>
                    <Line></Line>
                    <Line></Line>
                </Burguer>
                <NavList isOpen={isOpen}>
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
                </NavList>
            </Navigation>
        </Container>
    );
};

export default NavBar;
