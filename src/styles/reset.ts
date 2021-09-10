import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif
    }
    html {
        font-size: 10px;
    }
    body {
      background: ${({theme: { backgrounds }}) => backgrounds.elements};
      overflow-x: hidden;
    }
    fieldset {
        border: 0 none;
    }
    ul {
        list-style: none;
    }
    h1, h2, p, a, small, span, label, input, ::placeholder {
      color: ${({theme: { fonts }}) => fonts.primary };
    }
    input:hover::placeholder, input:focus::placeholder {
      color: ${({theme: { backgrounds }}) => backgrounds.cards };
    }
    a {
        text-decoration: none;
    }
    input {
        border: 0 none;
        :focus {
            outline: 0;
        }
    }
    textarea {
      border: 0 none;
      :focus {
        outline: 0;
      }
    }
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: ${({theme: { backgrounds }}) => backgrounds.primary};
    }
    ::-webkit-scrollbar-thumb {
      background: ${({theme: { colors }}) => colors.secondary};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({theme: { colors }}) => colors.primary};
    }
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
`;

export default Reset;
