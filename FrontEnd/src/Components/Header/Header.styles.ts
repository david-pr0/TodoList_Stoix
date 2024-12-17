import styled from "styled-components";

export const Header = styled.header `
    padding: 32px 0;
    background-color: #111b21;
    color: #fff;
    
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        .home-header {
            flex-direction: column;
        }

        h1 {
            margin-bottom: 32px;
        }
    }

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        width: 80px;
        height: 80px;
        color: #fff;

        * {
            width: 50%;
            height: 50%;
            stroke: #fff;
            fill: #fff;
        }
    }
`

export const Button = styled.button `
    padding: 16px;
    border: none;
    background-color: transparent;
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
`

export const SearchBar = styled.input `
    width: 100%;
    padding: 16px;
    border-radius: 30px;
    border: none;
    margin: 0 56px;
`

export const Image = styled.img `
    max-width: 10%;
    max-height: 10%;

    @media (max-width: 768px) {
        max-width: 50%;
        max-height: 50%;
    }
`