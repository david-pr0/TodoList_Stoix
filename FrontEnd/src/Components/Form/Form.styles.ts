import styled from "styled-components";

export const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    input {
        width: 100%;
        padding: 32px;
        border: none;
        background-color: #ccc;
        border-radius: 30px;
    }
`

export const LoginButton = styled.button `
    padding: 32px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    background-color: #111B21;
    color: #fff;
`

export const CreateAccount = styled.button `
    padding: 32px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    background-color: #111B21;
    color: #fff;
`

export const Cancel = styled.button `
    padding: 32px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    color: #fff;
    background-color: #e01111;
`

export const Flex = styled.div `
    display: flex;
    gap: 30px;
    width: 100%;
    @media (max-width: 480px) {
        flex-direction: column;
    }
`

export const Image = styled.img `
    max-width: 50%;
    max-height: 50%;
`