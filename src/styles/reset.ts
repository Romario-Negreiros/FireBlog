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
      background: #f5f5f5;
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
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #081229;
    }
    ::-webkit-scrollbar-thumb {
      background: #ff99ff;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #ec5990;
    }
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
`;

export default Reset;
