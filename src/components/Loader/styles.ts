import styled from "styled-components";

import { keyframes } from 'styled-components';


const spin = keyframes`
    to {
        transform: rotate(1turn)
    }
`;

const writing = keyframes`
    0% { content: '' }
    33% { content: '.'}
    66% { content: '..'}
    100% { content: '...'}
`;

export const LoaderSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ::after {
        content: '';
        width: 25vw;
        height: 25vw;
        border-radius: 50%;
        border: 10px solid #c1d5e4;
        border-top: 10px solid #068bef;
        animation: ${spin} 1s linear infinite;
    }
`;

export const LoadingMessage = styled.p`
    color: #fff !important;
    font-size: 1.6rem;
    margin-top: 10px;
    ::after {
        content: '';
        font-size: 1.6rem;
        color: #fff;
        animation: ${writing} 3s infinite;
    }
`;