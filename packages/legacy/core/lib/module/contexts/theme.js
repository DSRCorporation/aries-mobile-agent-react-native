import { createContext, useContext } from 'react';
import { theme } from '../theme';
export const ThemeContext = /*#__PURE__*/createContext(theme);
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);
//# sourceMappingURL=theme.js.map