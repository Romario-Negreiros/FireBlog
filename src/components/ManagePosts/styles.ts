import styled from 'styled-components';

import { Link as ReactRouterLink } from 'react-router-dom';

import { CustomButton as Close } from '../PostsForm/styles';

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

export const Link = styled(ReactRouterLink)`
    color: ${({ theme: { colors } }) => colors.primary};
    font-size: 1.4rem;
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
