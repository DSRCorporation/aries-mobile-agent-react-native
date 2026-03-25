import React from 'react';
import { ITheme } from '../theme';
export interface IThemeContext extends ITheme {
    setTheme: (themeName: string) => void;
}
export interface ThemeProviderProps extends React.PropsWithChildren {
    themes: ITheme[];
    defaultThemeName: string;
}
export declare const ThemeProvider: ({ themes, defaultThemeName, children }: ThemeProviderProps) => React.JSX.Element;
export declare const useTheme: () => IThemeContext;
//# sourceMappingURL=theme.d.ts.map