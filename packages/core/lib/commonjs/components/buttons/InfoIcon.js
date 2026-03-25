"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _navigators = require("../../types/navigators");
var _testable = require("../../utils/testable");
var _IconButton = _interopRequireWildcard(require("./IconButton"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const InfoIcon = ({
  connectionId
}) => {
  const navigation = (0, _native.useNavigation)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    buttonLocation: _IconButton.ButtonLocation.Right,
    accessibilityLabel: t('Chat.Details'),
    testID: (0, _testable.testIdWithKey)('Settings'),
    onPress: () => navigation.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.ContactDetails,
      params: {
        connectionId: connectionId
      }
    }),
    icon: "dots-vertical"
  });
};
var _default = exports.default = InfoIcon;
//# sourceMappingURL=InfoIcon.js.map