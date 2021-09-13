import styled from 'styled-components';

import { PostContainer } from '../Post/styles';

export const ProfileContainer = styled(PostContainer)``;

export const UserData = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    li {
        :nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        text-align: center;
        width: 100%;
        padding: 1rem;
        @media screen and (min-width: 400px) {
            width: 50%;
            text-align: unset;
        }
        h2 {
            font-weight: bolder;
            font-size: 1.8rem;
        }
        span {
            font-weight: bolder;
            color: ${({ theme: { colors } }) => colors.primary};
        }
        img {
            width: 50%;
            object-fit: cover;
            max-width: 120px;
        }
    }
`;

export const AccountOptions = styled.ul`
    margin-top: 9rem;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    li {
        width: 100%;
        padding: 2rem;
        background: ${({ theme: { backgrounds } }) => backgrounds.elements};
        border-radius: 5px;
        margin: 1rem 0;
        cursor: pointer;
        transition: opacity 0.3s ease, transform 0.3s ease;
        :hover {
            opacity: 0.5;
            transform: scale(1.05);
        }
        @media screen and (min-width: 700px) {
            max-width: calc(100% / 2 - 2rem);
            margin: 1rem;
        }
    }
    span {
        color: ${({ theme: { fonts } }) => fonts.primary};
        font-size: 1.4rem;
    }
`;
