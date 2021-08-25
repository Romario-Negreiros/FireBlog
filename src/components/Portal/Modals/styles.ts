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
        background: ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
        color: #fff;
        font-size: 1.4rem;
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
    background: ${({ theme: { backgrounds } }) => backgrounds.secondaryblue};
    height: 70vh;
    width: 100%;
    max-width: 500px;
    padding: 2.5rem 1.5rem;
`;
