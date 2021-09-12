import styled from 'styled-components';

import { PostContainer } from '../Post/styles';

export const ProfileContainer = styled(PostContainer)``;

export const UserData = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    :last-child {
        text-align: center;
        align-self: stretch;
    }
    li {
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
            color: ${({theme: { colors }}) => colors.primary};
        }
        img {
            width: 50%;
            object-fit: cover;
            max-width: 120px;
        }
    }
`;
