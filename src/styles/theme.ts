import { css } from 'styled-components';

const hoverBox = css`
  background-color: white;
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.5);
  }
`;

const boxShadow = css`
  background: rgba(255, 255, 255, 0.53);
  box-shadow: 0px 0.3px 2px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
`;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CSSTheme = { hoverBox, boxShadow, flexCenter };

const Theme = {
  //CSSMixin

  // MainColor&
  ColorMainWhite: '#FFFFFF',
  ColorMainLightGray: '#ECECEC',
  ColorMainGray: '#7A7A7A',
  ColorMainDarkGray: '#87847D',
  ColorMainLightYellow: '#FFFEF3',
  ColorMainYellow: '#F3BC2F',
  ColorMainLightBlue: ' rgba(7, 156, 255, 0.14)',
  ColorMainBlue: '#079CFF',
  ColorMainLightRed: '#FFF3F3',
  ColorMainRed: '#FF0000',
  ColorMainLightGreen: '#D8FFDE',
  ColorMainGreen: '#04BE00',
  // Color*
  ColorMain: 'gray',
  ColorDark: '#263238',
  ColorWhite: '#ffffff',
  ColorGrayL2: '#F6F6F6',
  ColorGrayL1: '#ECECEC',
  ColorGray: '#546E7A',
  ColorGrayD1: '#87847D',
  ColorRed: '#FF5151',
  ColorBlue: '#5193FF',
  ColorYellow: '#F3BC2F',
  // fontSize*
  FontSizeSm: '1.3rem',
  FontSizeMd: '1.4rem',
  FontSizeLg: '1.6rem',
  FontSizeXlg: '1.9rem',
  FontSizeXXlg: '2.3rem',
  // border
  Border: '1px solid #ddd',
  // shadow
  shadowN1: 'box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px',
  shadowN2: 'box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px',
  shadowN3: 'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
  shadowLine1: 'box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px',
  /*breakpoints */
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
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
