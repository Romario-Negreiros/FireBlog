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
        @media screen and (max-width: 600px) {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            background: #191d3a;
            z-index: 10;
        }
        .mobile-nav--active {
            display: flex;
        }
    }
    li {
        margin-left: 30px;
        height: 100%;
        @media screen and (max-width: 600px) {
            margin-left: 0;
            margin-top: 3rem;
        }
    }
`;

export const Burguer = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        cursor: pointer;
        display: block;
        position: absolute;
        top: 22px;
        right: 25px;
        z-index: 11;
    }
    span {
        @media screen and (max-width: 600px) {
            background: #ec5990;
            width: 15px;
            height: 2px;
            display: block;
            margin-top: 3px;
            background: $weakGray;
            transition: all 0.4s ease-in-out;
        }
        .close-left {
            transform: translate(0, 2px) rotate(45deg);
        }
        .close-right {
            transform: translate(0, -3px) rotate(135deg);
        }
        .fade {
            opacity: 0;
        }
    }
`;

export const Link = styled(ReactRouterLink)`
    color: #ff99ff;
    padding: 0.5rem;
    font-size: 1.6rem;
    height: 100%;
    display: block;
    line-height: 55px;
    :hover {
        background: rgba(25%, 29%, 58%, 0.5);
        color: #ec5990;
    }
    @media screen and (max-width: 600px) {
        line-height: 0;
        height: fit-content;
        padding: 2rem 0;
        width: 100vw;
        text-align: center;
    }
`;
