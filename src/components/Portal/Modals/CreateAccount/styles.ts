import styled from 'styled-components';

import { Form as LoginForm } from '../../../../pages/Login/styles';

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
            background: ${({ theme: { backgrounds } }) => backgrounds.primary};
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
