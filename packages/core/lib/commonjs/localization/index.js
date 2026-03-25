"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentLanguage = exports.Locales = void 0;
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function () {
    return _i18next.default;
  }
});
exports.translationResources = exports.storeLanguage = exports.initStoredLanguage = exports.initLanguages = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var RNLocalize = _interopRequireWildcard(require("react-native-localize"));
var _storage = require("../services/storage");
var _constants = require("../constants");
var _en = _interopRequireDefault(require("./en"));
var _fr = _interopRequireDefault(require("./fr"));
var _ptBr = _interopRequireDefault(require("./pt-br"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const translationResources = exports.translationResources = {
  en: {
    translation: _en.default
  },
  fr: {
    translation: _fr.default
  },
  'pt-BR': {
    translation: _ptBr.default
  }
};
let Locales = exports.Locales = /*#__PURE__*/function (Locales) {
  Locales["en"] = "en";
  Locales["fr"] = "fr";
  Locales["ptBr"] = "pt-BR";
  return Locales;
}({});
const currentLanguage = exports.currentLanguage = _i18next.default.language;
const storeLanguage = async id => {
  await _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Language, id);
};
exports.storeLanguage = storeLanguage;
const initLanguages = (resources, fallbackLng = Locales.en) => {
  const availableLanguages = Object.keys(resources);
  const bestLanguageMatch = RNLocalize.findBestAvailableLanguage(availableLanguages);
  let translationToUse = fallbackLng;
  if (bestLanguageMatch && availableLanguages.includes(bestLanguageMatch.languageTag)) {
    translationToUse = bestLanguageMatch.languageTag;
  }
  _i18next.default.use(_reactI18next.initReactI18next).init({
    lng: translationToUse,
    fallbackLng,
    resources
  });
};

//** Fetch user preference language from the AsyncStorage and set if require  */
exports.initLanguages = initLanguages;
const initStoredLanguage = async () => {
  const langId = await _storage.PersistentStorage.fetchValueForKey(_constants.LocalStorageKeys.Language);
  if (langId && langId !== currentLanguage) {
    await _i18next.default.changeLanguage(langId);
  }
};
exports.initStoredLanguage = initStoredLanguage;
//# sourceMappingURL=index.js.map