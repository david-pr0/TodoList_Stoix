import { createGlobalStyle } from "styled-components"

const Styles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;

        .container {
            max-width: 80vw;
            width: 100%;
            margin: 0 auto;
        }

        body {
            background-color: #222E35;
            color: #fff;
        }
    }
`

export default Styles