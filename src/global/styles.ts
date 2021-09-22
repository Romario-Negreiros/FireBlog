import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

export const Post = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: ${({ theme: { backgrounds } }) => backgrounds.cards};
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
    color: ${({ theme: { colors } }) => colors.secondary};
    font-size: 1.4rem;
    :hover {
        color: ${({ theme: { colors } }) => colors.primary};
    }
`;

export const CenteredContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    grid-column: span 2;
    width: 100vw;
    flex-basis: 100vh;
    height: 100vh;
    p {
        font-size: 1.4rem;
        text-align: center;
        color: ${({ theme: { colors } }) => colors.error};
        margin-bottom: 1.5rem;
    }
`;

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
