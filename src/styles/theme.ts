// import { css } from "styled-components";

const Theme = {
  mainColor: "gray",
  /*breakpoints */
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

const FTheme = {
  ...Theme,
};

export default FTheme;

export type TypeTheme = typeof Theme;
