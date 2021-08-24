import styled from 'styled-components';

import StyledProps from './types/StyledProps';

import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
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
    li {
        margin-left: 30px;
        height: 100%;
        @media screen and (max-width: 600px) {
            margin-left: 0;
        }
    }
`;

export const NavList = styled.ul<StyledProps>`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 600px) {
        ${props => props.isOpen ? 'visibility: visible' : 'visibility: hidden' };
        ${props => props.isOpen ? 'transform: translateY(0)' : 'transform: translateY(-600px)' };
        position: absolute;
        padding-top: 70px;
        top: 0;
        left: 0;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        background: #191d3a;
        z-index: 10;
        transition: visibility .5s ease-in-out, transform .5s ease-in-out;
        @media screen and (max-height: 200px) {
            height: fit-content;
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
`;

export const Line = styled.span`
        @media screen and (max-width: 600px) {
            background: #ec5990;
            width: 15px;
            height: 2px;
            display: block;
            margin-top: 3px;
            background: $weakGray;
            transition: all 0.4s ease-in-out;
        }
        &.close-left {
            transform: translate(0, 2px) rotate(45deg);
        }
        &.close-right {
            transform: translate(0, -3px) rotate(135deg);
        }
        &.fade {
            opacity: 0;
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
