import styled from 'styled-components';

export const NoMatches = styled.p`
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme: { colors } }) => colors.error };
    @media screen and (min-width: 700px) {
        grid-column: span 2;
    }
`;