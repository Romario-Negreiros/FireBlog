import styled from 'styled-components';

export const Container = styled.main`
    padding: 1rem 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    border-radius: 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    width: 100%;
    max-width: 800px;
    padding: 1.5rem;
    button {
        padding: 1rem;
        margin: 1.5rem auto;
        width: 100%;
        max-width: 300px;
        border-radius: 5px;
        background: ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
        color: #fff;
        font-size: 1.4rem;
        cursor: pointer;
        border: 1px solid transparent;
        transition: filter 0.4s, border 0.3s ease;
        :hover {
            filter: brightness(0.8);
        }
        :active {
            border-color: ${({ theme: { colors } }) => colors.pink};
        }
    }
`;

export const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    div {
        width: 100%;
        margin-bottom: 1.4rem;
    }
    label {
        font-size: 1.4rem;
        display: block;
    }
    textarea {
        width: 100%;
        height: 100px;
        padding: 1rem;
        font-size: 1.2rem;
        border: 1px solid
            ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
    }
    input {
        width: 100%;
        font-size: 1.2rem;
        padding: 0.5rem 1.5rem;
        background: unset;
        transition: background 0.3s ease;
        border-bottom: 1px solid
            ${({ theme: { backgrounds } }) => backgrounds.primaryblue};
        :focus {
            background: #f5f5f5;
        }
    }
    p {
        font-size: 1.4rem;
        text-align: center;
        color: ${({ theme: { colors } }) => colors.error};
        margin-bottom: 1.5rem;
    }
`;
