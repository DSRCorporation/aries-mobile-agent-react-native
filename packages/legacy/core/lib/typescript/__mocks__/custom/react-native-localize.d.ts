/// <reference types="jest" />
declare const getLocales: () => {
    countryCode: string;
    languageTag: string;
    languageCode: string;
    isRTL: boolean;
}[];
declare const getNumberFormatSettings: () => {
    decimalSeparator: string;
    groupingSeparator: string;
};
declare const getCalendar: () => string;
declare const getCountry: () => string;
declare const getCurrencies: () => string[];
declare const getTemperatureUnit: () => string;
declare const getTimeZone: () => string;
declare const uses24HourClock: () => boolean;
declare const usesMetricSystem: () => boolean;
declare const addEventListener: jest.Mock<any, any, any>;
declare const removeEventListener: jest.Mock<any, any, any>;
export { getLocales, getNumberFormatSettings, getCalendar, getCountry, getCurrencies, getTemperatureUnit, getTimeZone, uses24HourClock, usesMetricSystem, addEventListener, removeEventListener, };
//# sourceMappingURL=react-native-localize.d.ts.map