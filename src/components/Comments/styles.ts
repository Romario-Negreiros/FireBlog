import styled from 'styled-components';

export const Container = styled.ul`
    width: 100%;
    background: ${({theme: { backgrounds }}) => backgrounds.elements};
    margin-bottom: 1rem;
    max-height: 500px;
    overflow: auto;
`;

export const Comment = styled.li`
    display: block;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.primary};
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    p {
        width: 100%;
        font-size: 1.3rem;
    }
    @media screen and (min-width: 600px) {
        flex-direction: row;
        align-items: center;
    }
`;

export const RepliesList = styled(Comment)`
    
`;

export const Data = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    button {
        color: ${({theme: { fonts }}) => fonts.primary };
        border: 0 none;
        background: unset;
        cursor: pointer;
        font-size: 1.2rem;
        :hover {
            opacity: .5;
        }
    }
    span {
        font-size: 1.1rem;
    }
`;

export const Mechanisms = styled.div`
    margin-top: 1rem;
    width: 100%;
    text-align: left;
    div {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 3rem;
        :hover {
            opacity: 0.5;
        }
    }
    img {
        width: 20px;
        object-fit: cover;
    }
`;

export const Reply = styled.div``;
