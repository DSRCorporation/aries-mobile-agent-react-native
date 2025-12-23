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
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var RNLocalize = _interopRequireWildcard(require("react-native-localize"));
var _en = _interopRequireDefault(require("./en"));
var _fr = _interopRequireDefault(require("./fr"));
var _ptBr = _interopRequireDefault(require("./pt-br"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-named-as-default

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

//** Store language into the AsyncStorage  */
const storeLanguage = async id => {
  await _asyncStorage.default.setItem('language', id);
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
    debug: true,
    lng: translationToUse,
    fallbackLng,
    resources
  });
};

//** Fetch user preference language from the AsyncStorage and set if require  */
exports.initLanguages = initLanguages;
const initStoredLanguage = async () => {
  const langId = await _asyncStorage.default.getItem('language');
  if (langId && langId !== currentLanguage) {
    await _i18next.default.changeLanguage(langId);
  }
};
exports.initStoredLanguage = initStoredLanguage;
//# sourceMappingURL=index.js.map