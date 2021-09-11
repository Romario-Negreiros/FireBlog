import styled from 'styled-components';

import { PostContainer } from '../Post/styles';

export const ProfileContainer = styled(PostContainer)``;

export const UserData = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    li {
        width: 100%;
        padding: 1rem;
        @media screen and (min-width: 400px) {
            width: 50%;
        }
    }
`;
