import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 150px;
`;

export const Options = styled.ul`
    height: 30px;
    display: flex;
    gap: 10px;
    align-items: center;
    li {
        cursor: pointer;
        :hover {
            opacity: 0.5;
        }
    }
    img {
        width: 20px;
        height: 20px;   
    }
    li:nth-child(3) {
        img {
            transform: translateY(1.2px);
        }
    }
`;

export const Input = styled.div`
    width: 100%;
    height: 100px;
    padding: 1rem;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.primary};
    border-left: 1px solid ${({ theme: { colors } }) => colors.primary};
    :focus,
    :hover {
        background: ${({ theme: { backgrounds } }) => backgrounds.secondary};
    }
    p {
        font-size: 1.2rem;
        text-align: unset;
        color: ${({ theme: { fonts } }) => fonts.primary};
    }
`;

export const Editable = styled.p`
    border: 0 none;
    width: 100%;
    height: 100%;
    :focus {
        outline: 0;
    }
`;
