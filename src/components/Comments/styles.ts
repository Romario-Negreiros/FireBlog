import styled from 'styled-components';

export const Container = styled.ul`
    width: 100%;
    background: #f5f5f5;
    margin-bottom: 1rem;
    height: 500px;
    overflow: auto;
`;

export const Comment = styled.li`
    display: block;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.pink};
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    p {
        width: 100%;
        font-size: 1.3rem;
    }
    @media screen and (min-width: 600px) {
        flex-direction: row;
        align-items: center;
    }
`;

export const Data = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
        font-size: 1.1rem;
    }
`;

export const Mechanisms = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    img {
            width: 20px;
            object-fit: cover;
    }
`;

export const Reply = styled.div`

`;
