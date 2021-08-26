import styled from 'styled-components';

export const Container = styled.main`
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 50px auto;
    justify-items: center;
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
`;

export const UserOption = styled.div`
    background: #fff;
    cursor: pointer;
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
        border-color: ${({theme: { colors }}) => colors.weakerpink };
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