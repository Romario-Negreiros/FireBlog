import styled from 'styled-components';

export const Container = styled.section`
    border-radius: 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme: { backgrounds } }) => backgrounds.primary};
    width: 100%;
    max-width: 800px;
    padding: 1.5rem; 
    h2 {
        width: 100%;
        text-align: center;
        color: white;
        font-size: 2rem;
    }
    div {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }
`;