import styled from 'styled-components';
import { keyframes } from 'styled-components';

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

export const Container = styled.main`
    background: ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100vh;
    padding: clamp(1rem, 0.5rem + 1vw, 2rem);
`;

export const Heading = styled.h1`
    margin-bottom: 2rem;
    text-decoration: underline;
    color: ${({ theme: { colors } }) => colors.pink};
    font-size: ${({ theme: { clamps } }) => clamps.headings};
`;

export const Form = styled.form`
    background: ${({ theme: { backgrounds } }) => backgrounds.secondaryblue};
    padding: clamp(1rem, 1rem + 2vw, 6rem) clamp(3rem, 3rem + 2vw, 6rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
`;

export const Fieldset = styled.fieldset`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    color: #ffffff;
    font-size: ${({ theme: { clamps } }) => clamps.labels};
    margin-bottom: 0.4rem;
`;

export const Input = styled.input`
    padding: clamp(5px, 0.5vw, 15px);
    width: 100%;
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

export const Button = styled.button`
    border: 0 none;
    padding: 1rem;
    margin: 0.5rem 0;
    width: 100%;
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
`;

export const Icon = styled.img`
    width: 20px;
    object-fit: cover;
    align-self: flex-end;
    cursor: pointer;
    :hover {
        opacity: 0.5;
    }
    transform: translate(2rem, -3rem);
`;

export const Paragraph = styled.p`
    font-size: ${({ theme: { clamps } }) => clamps.texts};
    color: #fff;
`;

export const Error = styled.p`
    margin-top: -1rem;
    margin-bottom: 1rem;
    font-size: ${({ theme: { clamps } }) => clamps.texts};
    color: ${({ theme: { colors } }) => colors.error};
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
