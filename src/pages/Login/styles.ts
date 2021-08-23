import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100vh;
    padding: clamp(1rem, 0.5rem + 1vw, 2rem);
`;

export const Heading = styled.h1`
    margin-bottom: 2rem;
    text-decoration: underline;
    color: ${({theme: { colors }}) => colors.pink };
    font-size: ${({theme: { clamps }}) => clamps.headings };
`;

export const Form = styled.form`
    background: ${({theme: { backgrounds }}) => backgrounds.secondaryblue };
    padding: clamp(1rem, 1rem + 2vw, 6rem) clamp(3rem, 3rem + 2vw, 6rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Fieldset = styled.fieldset`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    color: #ffffff;
    font-size: ${({theme: { clamps }}) => clamps.labels };
    margin-bottom: .4rem;
`;

export const Input = styled.input`
    padding: clamp(5px, 0.5vw, 15px);
    background: transparent;
    border: 0 none;
    border-bottom: 2px solid ${({theme: { colors }}) => colors.pink };
    margin-bottom: 1rem;
    transition: background .5s ease-in-out;
    color: #ffffff;
    font-size: 1.2rem;
    outline: 0;
    :hover, :focus {
        background: ${({theme: { backgrounds }}) => backgrounds.primaryblue };
    }
`;

export const Button = styled.button`
    border: 0 none;
    padding: 1rem;
    margin: .5rem 0;
    width: 100%;
    border-radius: 5px;
    background: ${({theme: { backgrounds }}) => backgrounds.primaryblue };
    color: #fff;
    font-size: ${({theme: { clamps }}) => clamps.texts };
    cursor: pointer;
    border: 1px solid transparent;
    transition: filter .4s, border .3s ease;
    :hover {
        filter: brightness(0.8);
    }
    :active {
        border-color: ${({theme: { colors }}) => colors.pink };
    }
`;

export const Paragraph = styled.p`
    font-size: ${({theme: { clamps }}) => clamps.texts };
    color: #fff;
`;

export const Error = styled.p`
    font-size: ${({theme: { clamps }}) => clamps.texts};
    color: ${({theme: { colors }}) => colors.error };
`;