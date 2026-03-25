export declare enum StatusBarStyles {
    Light = "light-content",
    Dark = "dark-content"
}
export declare enum Shade {
    Light = "light",
    Dark = "dark"
}
export declare const luminanceForHexColor: (hex: string) => number | undefined;
export declare const shadeIsLightOrDark: (hex: string) => Shade;
export declare const statusBarStyleForColor: (hex: string) => StatusBarStyles | undefined;
//# sourceMappingURL=luminance.d.ts.map