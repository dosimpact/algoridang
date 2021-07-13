import { createGlobalStyle } from "styled-components";
// import Theme from "./Theme";
import reset from "styled-reset";

// return Class Components
export default createGlobalStyle`
  
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:14px;
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
`;
