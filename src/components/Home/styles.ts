import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

import { Input as LoginInput } from '../../pages/Login/styles';

export const Container = styled.main`
    position: relative;
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 50px) auto;
    justify-items: center;
    div {
        grid-column: span 2;
    }
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50px 50px auto;
        gap: 2rem;
        div:nth-child(n + 2) {
            grid-column: unset;
        }
    }
    @media screen and (min-width: 1300px) {
        padding: 2rem 5rem;
    }
`;

export const UserOption = styled(ReactRouterLink)`
    background: ${({ theme: { backgrounds } }) => backgrounds.cards};
    border-radius: 5px;
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid transparent;
    grid-column: span 2;
    @media screen and (min-width: 700px) {
        margin: 0;
        grid-column: span 1;
    }
    @media screen and (min-width: 1100px) {
        width: 70%;
    }
    :hover {
        border-color: ${({ theme: { colors } }) => colors.secondary};
    }
    p {
        font-size: 1.4rem;
    }
    img {
        width: 20px;
        object-fit: cover;
    }
`;

export const InputWrapper = styled.div`
    width: 100%;
    text-align: center;
`;

export const Input = styled(LoginInput)`
    color: ${({ theme: { fonts } }) => fonts.primary};
    :hover {
        border-bottom-color: ${({ theme: { colors } }) => colors.primary};
    }
    @media screen and (min-width: 700px) {
        width: 50%;
    }
`;
