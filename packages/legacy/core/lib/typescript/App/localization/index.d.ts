import i18n from 'i18next';
import en from './en';
export type Translation = typeof en;
export type TranslationResources = {
    [key: string]: any;
};
export declare const translationResources: TranslationResources;
export declare enum Locales {
    en = "en",
    fr = "fr",
    ptBr = "pt-BR"
}
declare const currentLanguage: string;
declare const storeLanguage: (id: string) => Promise<void>;
declare const initLanguages: (resources: TranslationResources, fallbackLng?: Locales) => void;
declare const initStoredLanguage: () => Promise<void>;
export { i18n, initStoredLanguage, initLanguages, storeLanguage, currentLanguage };
//# sourceMappingURL=index.d.ts.map