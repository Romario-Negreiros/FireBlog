import styled from 'styled-components';

export const Container = styled.ul`
    width: 100%;
    background: #f5f5f5;
    margin-bottom: 1rem;
`;

export const Comment = styled.li`
    display: block;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid ${({theme: { colors }}) => colors.pink };
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
        font-size: 1.2rem;
    }
    @media screen and (min-width: 600px) {
        flex-direction: row;
        align-items: center;
    }
`;

export const Data = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
        font-size: 1.1rem;
    }
`;

export const Input = styled.li`
    width: 100%;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.pink};
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
        width: 90%;
        background: unset;
        padding: 1.5rem;
    }
    div {
        width: 10%;
        align-self: stretch;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 20px;
        object-fit: cover;
    }
`;
