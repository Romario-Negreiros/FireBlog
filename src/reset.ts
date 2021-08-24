import { createGlobalStyle } from "styled-components";

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
    fieldset {
        border: 0 none;
    }
    ul {
        list-style: none;
    }
    a {
        color: #000;
        text-decoration: none;
    }
    input {
        border: 0 none;
        :focus {
            outline: 0;
        }
    }
`;

export default Reset;