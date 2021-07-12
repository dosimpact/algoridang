import "styled-components";
import { TypeTheme, TypeCSSTheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends TypeTheme, TypeCSSTheme {}
}
