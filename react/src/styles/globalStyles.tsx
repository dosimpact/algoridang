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
        font-family:-apple-system, Roboto, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.6rem;
        background-color: #fff;
        min-height:98vh;
        /* background: linear-gradient(0deg, #fff2d2 0%, rgba(255, 255, 255, 0) 100%); */

    }
    /* override */
    .ReactModal__Overlay {
        z-index:99
    }
    /* Transition */
    .select:hover::after {
        color: #f39c12;
    }
    /* layout */
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
    /* preset */
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
    /* sroll */
      /* width */
    ::-webkit-scrollbar {
        width: 0rem;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 0.5rem;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 0.5rem;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #aaa;
    }

    /* input check-box */
    input[type="checkbox"]{
        display:none;
    }
    input[type="checkbox"] + label{
        /* display:none; */
        display:flex;
        align-items: center;
    }
    input[type="checkbox"] + label span.checkbox {
        content:" ";
        display: inline-block;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #C4C4C4;
        border-radius: 3px;
        margin-right:1rem;
    }
    input[type="checkbox"]:checked + label span.checkbox {
        background-color:#F3BC2F;
    }
    /* input css reset */
    input[type="text"],input[type="password"] {
        border:unset;
        border-radius: 0.9rem;
        width: 100%;
        height: 4.6rem;
        font-size: 1.3rem;
        padding: 1.5rem 2.8rem;
        background: rgba(255, 255, 255, 0.53);
        border-radius: 9px;
    }
    input[type="text"].gray{    background: "#ECECEC";}
    input[type="text"].disable{    background: rgba(255, 255, 255, 0.53);}
    input::placeholder {
            color: rgba(122, 122, 122, 0.67);
    }
    
    input[type="date"] {
        display:block;
        position:relative;
        padding: 0.2rem 2.8rem;
        
        background:
            white
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='22' viewBox='0 0 20 22'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23688EBB' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' transform='translate(1 1)'%3E%3Crect width='18' height='18' y='2' rx='2'/%3E%3Cpath d='M13 0L13 4M5 0L5 4M0 8L18 8'/%3E%3C/g%3E%3C/svg%3E")
            right 1rem
            center
            no-repeat;
    
        cursor:pointer;
        border:unset;
        border-radius: 9px;
        /* border: ${(props) => props.theme.Border}; */

        width: 100%;
        height: 4.6rem;
        font-size: 1.3rem;
    }
    input[type="date"]:focus {
        outline:none;
        border-color:#3acfff;
        box-shadow:0 0 0 0.25rem rgba(0, 120, 250, 0.1);
    }
    
    ::-webkit-datetime-edit {}
    ::-webkit-datetime-edit-fields-wrapper {}
    ::-webkit-datetime-edit-month-field:hover,
    ::-webkit-datetime-edit-day-field:hover,
    ::-webkit-datetime-edit-year-field:hover {
        background:rgba(0, 120, 250, 0.1);
    }
    ::-webkit-datetime-edit-text {
        opacity:0;
    }
    ::-webkit-clear-button,
    ::-webkit-inner-spin-button {
        display:none;
    }
    ::-webkit-calendar-picker-indicator {
        position:absolute;
        /* width:2.5rem; */
        height:100%;
        top:0;
        right:0;
        bottom:0;
        opacity:0;
        cursor:pointer;
        
        color:rgba(0, 120, 250, 1);
        background:rgba(0, 120, 250, 1);
    
    }

    input[type="date"]:hover::-webkit-calendar-picker-indicator { opacity:0.05; }
    input[type="date"]:hover::-webkit-calendar-picker-indicator:hover { opacity:0.15; }

    .shadow{
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
`;
