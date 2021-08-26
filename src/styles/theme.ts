import { css } from "styled-components";

const hoverBox = css`
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: none;
  }
`;

const CSSTheme = { hoverBox };

const Theme = {
  // MainColor&
  ColorMainWhite: "#FFFFFF",
  ColorMainLightGray: "#ECECEC",
  ColorMainDarkGray: "#87847D",
  ColorMainYellow: "#F3BC2F",
  // Color*
  ColorMain: "gray",
  ColorDark: "#263238",
  ColorWhite: "#ffffff",
  ColorGrayL1: "#ECECEC",
  ColorGray: "#546E7A",
  ColorGrayD1: "#87847D",
  ColorRed: "#FF5151",
  ColorBlue: "#5193FF",
  ColorYellow: "#F3BC2F",
  // fontSize*
  FontSizeSm: "1.3rem",
  FontSizeMd: "1.4rem",
  FontSizeLg: "1.6rem",
  FontSizeXlg: "1.9rem",
  FontSizeXXlg: "2.3rem",
  // border
  Border: "1PX solid #ddd",
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
  ...CSSTheme,
};

export default FTheme;

// export type CSS = keyof typeof CSSTheme;

export type TypeTheme = typeof Theme;

// export type TypeCSSTheme = TypeTheme & Record<CSS, string>;
