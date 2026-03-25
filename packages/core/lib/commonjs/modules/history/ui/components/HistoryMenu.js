"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@react-navigation/core");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _IconButton = _interopRequireWildcard(require("../../../../components/buttons/IconButton"));
var _navigators = require("../../../../types/navigators");
var _testable = require("../../../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HistoryMenu = () => {
  const navigation = (0, _core.useNavigation)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    buttonLocation: _IconButton.ButtonLocation.Right,
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