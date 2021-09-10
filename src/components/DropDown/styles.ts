import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

import { CustomButton as Button } from '../PostsForm/styles';

import { StyledProps } from './types';

export const Container = styled.div<StyledProps>`
${props =>
            props.isDropDownVisible ? 'visibility: visible' : 'visibility: hidden'};
        ${props =>
            props.isDropDownVisible
                ? 'transform: translateY(0)'
                : 'transform: translateY(-600px)'};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 12;
    background: ${({ theme: { backgrounds } }) => backgrounds.secondary};
    transition: all 0.5s ease-in-out;
    .first-link {
        margin-top: 5rem;
        @media screen and (min-width: 700px) {
            margin: 0;
        }
    }
    @media screen and (min-width: 700px) {
        height: 40vh;
        padding: 2rem;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    @media screen and (max-height: 200px) {
        height: fit-content;
    }
`;

export const Link = styled(ReactRouterLink)`
    color: ${({ theme: { colors } }) => colors.secondary};
    margin-bottom: 1.5rem; 
    padding: 2rem 0;
    font-size: 1.6rem;
    display: block;
    transition: background 0.3s ease, color 0.3s ease;
    width: 100%;
    text-align: center;
    :hover {
        background: rgba(25%, 29%, 58%, 0.5);
        color: ${({ theme: { colors } }) => colors.primary};
    }
    @media screen and (min-width: 700px) {
        padding: 1.5rem;
        width: fit-content;
        text-align: center;
    }
`;

export const CustomButton = styled(Button)`
    display: none;
    margin-top: 2rem;
    background: unset;
    @media screen and (min-width: 700px) {
        display: block;
        width: 100%;
        text-align: left;
        margin: 0 0 2rem;
    }
`;