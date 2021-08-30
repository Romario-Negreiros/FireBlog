import styled from "styled-components";

export const Container = styled.main`
    position: relative;
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    @media screen and (min-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
        padding: 2rem 5rem;
    }
`;

export const Title = styled.h1`
    color: ${({theme: { colors }}) => colors.pink };
    width: 100%;
    padding: 2rem;
    text-align: center;
`;