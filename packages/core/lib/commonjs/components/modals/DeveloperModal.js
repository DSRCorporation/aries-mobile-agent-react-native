"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _containerApi = require("../../container-api");
var _FauxHeader = _interopRequireDefault(require("../misc/FauxHeader"));
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
var _theme = require("../../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DeveloperModal = ({
  onBackPressed
}) => {
  const {
    NavigationTheme
  } = (0, _theme.useTheme)();
  const [Developer] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_DEVELOPER]);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, null, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right', 'top'],
    style: {
      flex: 1,
      backgroundColor: NavigationTheme.colors.primary
    }
  }, /*#__PURE__*/_react.default.createElement(_FauxHeader.default, {
    title: t('Screens.Developer'),
    onBackPressed: onBackPressed
  }), /*#__PURE__*/_react.default.createElement(Developer, null)));
};
var _default = exports.default = DeveloperModal;
//# sourceMappingURL=DeveloperModal.js.map