import styled from 'styled-components';

import { CustomButton as Button } from '../PostsForm/styles';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    min-height: 100vh;
`;

export const CustomButton = styled(Button)`
    align-self: flex-end;
`;

export const PostContainer = styled.div`
    padding: 1.5rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    word-break: break-all;
    min-height: 100vh;
    width: 100%;
    max-width: 800px;
    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    small {
        font-size: 1.2rem;
    }
    hr {
        width: 100%;
        color: #333;
        margin: 2rem 0;
    }
    h2 {
        font-weight: lighter;
    }
    p {
        line-height: 2rem;
        font-size: 1.4rem;
    }
`;

export const AvaliationSection = styled.aside`
    margin-top: 10rem;
    h2 {
        font-weight: bolder;
        margin-bottom: 2rem;
    }
    small {
        display: block;
        margin: -1.4rem 0 2rem;
        text-decoration: underline;
    }
    .react-stars {
        margin-top: -2rem;
    }
`;