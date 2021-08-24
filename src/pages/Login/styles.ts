import styled from 'styled-components';
import { keyframes } from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

interface StyledProps {
    bg: string;
}

const spin = keyframes`
    to {
        transform: rotate(1turn)
    }
`;

const writing = keyframes`
    0% { content: '' }
    33% { content: '.'}
    66% { content: '..'}
    100% { content: '...'}
`;

export const BannerArea = styled.section<StyledProps>`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        ${props => `url(${props.bg})`};
    background-size: cover;
    width: 100vw;
    height: 100vh;
    p {
        font-size: ${({ theme: { clamps } }) => clamps.texts};
        color: ${({ theme: { colors } }) => colors.error};
        margin-bottom: 1.5rem;
    }
    button {
        border: 0 none;
        padding: 1rem;
        margin: 1.5rem 0;
        width: 100%;
        max-width: 300px;
        border-radius: 5px;
        background: ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
        color: #fff;
        font-size: ${({ theme: { clamps } }) => clamps.texts};
        cursor: pointer;
        border: 1px solid transparent;
        transition: filter 0.4s, border 0.3s ease;
        :hover {
            filter: brightness(0.8);
        }
        :active {
            border-color: ${({ theme: { colors } }) => colors.pink};
        }
    }
`;

export const Container = styled.div`
    
`;

export const ContentArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
`;

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1.5rem;
    background: ${({ theme: { backgrounds } }) => backgrounds.secondaryblue};
    @media screen and (max-height: 400px) {
        flex-flow: row wrap;
        max-width: unset;
    }
    small {
        color: #fff;
        font-size: 1.2rem;
    }
    div {
        width: 100%;
        max-width: 300px;
        text-align: center;
        @media screen and (max-height: 400px) {
            width: 45%;
            max-width: unset;
        }
    }
`;

export const Fieldset = styled.fieldset`
    width: 100%;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    @media screen and (max-height: 400px) {
        width: 45%;
    }
    label {
        color: #ffffff;
        font-size: ${({ theme: { clamps } }) => clamps.labels};
        margin-bottom: 0.4rem;
    }
`;

export const Input = styled.input`
    padding: 1rem;
    background: transparent;
    border: 0 none;
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.pink};
    margin-bottom: 1rem;
    transition: background 0.5s ease-in-out;
    color: #ffffff;
    font-size: 1.2rem;
    outline: 0;
    :hover,
    :focus {
        background: ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
    }
`;

export const Link = styled(ReactRouterLink)`
    display: inline-block;
    margin: 1.5rem 0;
    color: ${({ theme: { colors } }) => colors.pink};
    font-size: ${({ theme: { clamps } }) => clamps.texts};
    :hover {
        text-decoration: underline;
    }
`;

export const LoaderSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ::after {
        content: '';
        width: clamp(20rem, 5vw, 40rem);
        height: clamp(20rem, 5vw, 40rem);
        border-radius: 50%;
        border: 10px solid #c1d5e4;
        border-top: 10px solid #068bef;
        animation: ${spin} 1s linear infinite;
    }
`;

export const LoadingMessage = styled.p`
    color: #fff;
    font-size: ${({ theme: { clamps } }) => clamps.texts};
    margin-top: 10px;
    ::after {
        content: '';
        font-size: ${({ theme: { clamps } }) => clamps.texts};
        color: #fff;
        animation: ${writing} 3s infinite;
    }
`;