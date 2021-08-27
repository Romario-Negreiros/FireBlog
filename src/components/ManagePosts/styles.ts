import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

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
    background: #fff;
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
        margin-bottom: 1rem;
        word-break: break-all;
    }
`;

export const Link = styled(ReactRouterLink)`
    color: ${({theme: { colors }}) => colors.weakerpink };
    font-size: 1.4rem;
    :hover {
        color: ${({theme: { colors }}) => colors.pink };
    }
`;