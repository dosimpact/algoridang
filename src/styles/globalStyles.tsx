import { createGlobalStyle } from 'styled-components';
// import Theme from "./Theme";
import reset from 'styled-reset';

// return Class Components
export default createGlobalStyle`
    ${reset};
    html{
        font-size:62.5%;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    html::-webkit-scrollbar {
       display: none; /* Chrome, Safari, Opera*/
    }
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, Noto Sans KR, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.6rem;
        background-color: #fff;
        min-height:100vh;
        /* background: linear-gradient(0deg, #fff2d2 0%, rgba(255, 255, 255, 0) 100%); */

    }
    input {
        border:unset;
        background: rgba(255, 255, 255, 0.53);
        /* box-shadow: 0px 0.3px 2px rgba(0, 0, 0, 0.25); */
        border-radius: 9px;
        width: 100%;
        height: 4.6rem;
        border: ${(props) => props.theme.Border};
        padding: 1.5rem 2.8rem;

        background: rgba(255, 255, 255, 0.53);
        box-shadow: 0px 0.3px 2px rgba(0, 0, 0, 0.25);
        border-radius: 9px;
        font-size: 1.3rem;
    }
    input::placeholder {
            color: rgba(122, 122, 122, 0.67);
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

    .tooltip {
        width: 120px;
        height: 24px;
        position: absolute;
        display: none;
        padding: 6px;
        box-sizing: border-box;
        font-size: 11px;
        border-radius: 2px;
        background-color: rgb(76, 175, 80);
        text-align: center;
        z-index: 1000;
        top: 3px;
        left: 10px;
        pointer-events: none;
        color: #fff;
    }
    .text_ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
        display: block;
    }

`;
