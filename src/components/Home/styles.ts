import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

import { Input as LoginInput } from '../../pages/Login/styles';

export const CenteredContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    height: 100vh;
    p {
        font-size: 1.4rem;
        text-align: center;
        color: ${({ theme: { colors } }) => colors.error};
        margin-bottom: 1.5rem;
    }
`;

export const Container = styled.main`
    position: relative;
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 50px) auto;
    justify-items: center;
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50px 50px auto;
        gap: 2rem;
    }
    @media screen and (min-width: 1300px) {
        padding: 2rem 5rem;
    }
`;

export const UserOption = styled(ReactRouterLink)`
    background: #fff;
    border-radius: 5px;
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid transparent;
    @media screen and (min-width: 700px) {
        margin: 0;
    }
    @media screen and (min-width: 1100px) {
        width: 70%;
    }
    :hover {
        border-color: ${({ theme: { colors } }) => colors.weakerpink};
    }
    p {
        color: #333;
        font-size: 1.4rem;
    }
    img {
        width: 20px;
        object-fit: cover;
    }
`;

export const Post = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: #fff;
    padding: 1.5rem;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 1rem;

    @media screen and (min-width: 700px) {
        margin: 0rem;
    }
    h2 {
        font-size: 2.4rem;
        margin-bottom: 1rem;
        word-break: break-all;
    }
    small {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        word-break: break-all;
    }
    p {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        word-break: break-all;
    }
`;

export const Link = styled(ReactRouterLink)`
    color: ${({ theme: { colors } }) => colors.weakerpink};
    font-size: 1.4rem;
    :hover {
        color: ${({ theme: { colors } }) => colors.pink};
    }
`;

export const InputWrapper = styled.div`
    width: 100%;
    text-align: center;
    @media screen and (min-width: 700px) {
        grid-column: span 2;
    }
`;

export const Input = styled(LoginInput)`
    ::placeholder {
        color: #333;
    }
    :focus,
    :hover {
        ::placeholder {
            color: #fff;
        }
    }
    @media screen and (min-width: 700px) {
        width: 50%;
    }
`;

export const NoMatches = styled.p`
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme: { colors } }) => colors.red};
    @media screen and (min-width: 700px) {
        grid-column: span 2;
    }
`;
