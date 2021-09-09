import styled from 'styled-components';

import { Form as LoginForm } from '../../../pages/Login/styles';

export const Background = styled.section`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 20;
    p {
        font-size: 1.4rem;
        text-align: center;
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
        background: ${({ theme: { backgrounds } }) => backgrounds.primary};
        color: #fff;
        font-size: 1.4rem;
        cursor: pointer;
        border: 1px solid transparent;
        transition: filter 0.4s, border 0.3s ease;
        :hover {
            filter: brightness(0.8);
        }
        :active {
            border-color: ${({ theme: { colors } }) => colors.primary};
        }
        @media screen and (max-height: 400px) {
            max-width: none;
        }
    }
`;

export const Form = styled(LoginForm)`
    @media screen and (max-height: 300px) {
        height: 300px;
        overflow: auto;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme: { backgrounds } }) => backgrounds.secondary};
    height: 70vh;
    width: 100%;
    max-width: 500px;
    padding: 2.5rem 1.5rem;
`;

export const InputWrapper = styled.div`
    width: 100%;
    max-width: none !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.primary};
    input {
        padding: 1rem;
        width: 90%;
        background: transparent;
        transition: background 0.5s ease-in-out;
        color: #ffffff;
        font-size: 1.2rem;
        :hover,
        :focus {
            background: ${({ theme: { backgrounds } }) =>
                backgrounds.primary};
        }
    }
`;

export const IconWrapper = styled.div`
    cursor: pointer;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    img {
        width: 25px;
        object-fit: cover;
    }
`;

export const Close = styled.a`
    align-self: flex-end;
    display: inline-block;
    cursor: pointer;
    color: #fff;
    font-size: 1.2rem;
    :hover {
        text-decoration: underline;
    }
    @media screen and (max-height: 400px) {
        width: 100%;
        margin-bottom: 1.5rem;
    }
`;
