import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 clamp(1rem, 1rem + 1vw, 2.5rem);
    height: 70px;
    background: #191d3a;
    border-bottom: 3px solid #ec5990;
    color: #ec5990;
    h2 {
        font-size: 2.2rem;
    }
`;

export const Navigation = styled.nav`
    height: 100%;
    ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    li {
        margin-left: 30px;
        height: 100%;
    }
`;

export const Link = styled(ReactRouterLink)`
    color: #ff99ff;
    padding: 5px;
    font-size: 1.6rem;
    height: 100%;
    display: block;
    line-height: 55px;
    :hover {
        background: rgba(25%, 29%, 58%, 0.5);
        color: #ec5990;
    }
`;
