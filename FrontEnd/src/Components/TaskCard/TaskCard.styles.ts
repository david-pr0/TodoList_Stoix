import styled from "styled-components";

export const StyledTask = styled.section `
    padding: 32px 0;

    .container {
        background-color: #111b21;
        border-radius: 30px;
        padding: 70px;
        gap: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

export const SaveButton = styled.button `
    padding: 32px;
    border: none;
    border-radius: 30px;
    background-color: #195619;
    width: 100%;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: #fff;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const CancelButton = styled.button `
    padding: 32px;
    border: none;
    border-radius: 30px;
    width: 100%;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #e01111;

    @media (max-width: 768px) {
        width: 100%
    }
`

export const Flex = styled.div `
    display: flex;
    gap: 32px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const Content = styled.textarea `
    display: flex;
    background-color: #222E35;
    color: #fff;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    padding: 32px;
    border-radius: 30px;
    overflow: hidden;
    text-align: justify;
    &:focus {
        outline: none;
    }
`