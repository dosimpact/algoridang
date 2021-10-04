import 'styled-components';
import { TypeTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TypeTheme {}
}
