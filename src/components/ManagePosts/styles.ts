import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

import { CustomButton as Close} from '../PostsForm/styles';

export const Container = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    padding: 1.5rem;
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const Post = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: ${({theme: { backgrounds }}) => backgrounds.cards};
    padding: 1.5rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    @media screen and (min-width: 700px) {
        margin: 2rem;
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
        margin-bottom: 1.5rem;
        word-break: break-all;
    }
`;

export const Link = styled(ReactRouterLink)`
    color: ${({ theme: { colors } }) => colors.primary};
    font-size: 1.4rem;
    :hover {
        color: ${({ theme: { colors } }) => colors.primary};
    }
`;

export const Delete = styled.span`
    cursor: pointer;
    color: ${({ theme: { colors } }) => colors.primary};
    font-size: 1.4rem;
    margin-top: 1rem;
    :hover {
        color: ${({ theme: { colors } }) => colors.primary};
    }
`;

export const ButtonWrapper = styled.div`
    margin: 3rem 1.5rem 1.5rem;
`;

export const CustomButton = styled(Close)`
    border-radius: 5px;
`;
