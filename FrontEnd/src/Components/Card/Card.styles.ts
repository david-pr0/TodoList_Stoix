import styled from "styled-components";

export const CardItem = styled.div `
    background-color: #111B21;
    margin-top: 50px;
    border-radius: 30px;
    padding: 20px 40px;
    text-align: justify;
    width: 100%;
    
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    
        @media (max-width: 768px) {
            flex-direction: column;
        }
        * {
            @media (max-width: 768px) {
                flex-direction: column;
                width: 100%;
                text-align: center;
            }
        }
    }

`

export const CardButton = styled.button `
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background-color: #222E35;
    box-sizing: border-box;
    flex-shrink: 0;
    cursor: pointer;

    * {
        max-width: 50%;
        width: 100%;
        max-height: 50%;
        height: 100%;

        stroke: #fff;
    }

    @media (max-width: 768px) {
        border-radius: 30px;
        width: 100%;
    }
`

export const Flex = styled.div `
    display: flex;
    gap: 30px;
`