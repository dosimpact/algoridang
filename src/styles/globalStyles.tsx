import { createGlobalStyle } from "styled-components";
// import Theme from "./Theme";
import reset from "styled-reset";

// return Class Components
export default createGlobalStyle`
    ${reset};
    html{
        font-size:62.5%;
    }
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.6rem;
    }
    input{
        border:unset;
    }
    .flexRow{
        display: flex;
        flex-flow:row nowarp;
        align-items:center;
    }
    .flexRowSBt{
        display: flex;
        flex-flow:row nowarp;
        align-items:center;
        justify-content:space-between;
    }
    .flexCenter{
        display: flex;
        align-items:center;
        justify-content:center;
    }
`;
