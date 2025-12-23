"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@react-navigation/core");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderButton = _interopRequireWildcard(require("../../../../components/buttons/HeaderButton"));
var _navigators = require("../../../../types/navigators");
var _testable = require("../../../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HistoryMenu = () => {
  const navigation = (0, _core.useNavigation)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
    buttonLocation: _HeaderButton.ButtonLocation.Right,
    accessibilityLabel: t('Screens.Settings'),
    testID: (0, _testable.testIdWithKey)('Settings'),
    onPress: () => navigation.navigate(_navigators.Stacks.HistoryStack, {
      screen: _navigators.Screens.HistoryPage
    }),
    icon: "history"
  });
};
var _default = exports.default = HistoryMenu;
//# sourceMappingURL=HistoryMenu.js.map