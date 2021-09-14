import styled from 'styled-components';

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

export const Delete = styled.span`
    cursor: pointer;
    color: ${({ theme: { colors } }) => colors.secondary};
    font-size: 1.4rem;
    margin-top: 1rem;
    :hover {
        color: ${({ theme: { colors } }) => colors.primary};
    }
`;
