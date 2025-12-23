"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentialsTourSteps = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _TourBox = require("./TourBox");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const credentialsTourSteps = exports.credentialsTourSteps = [{
  Render: props => {
    const {
      currentTour,
      currentStep,
      next,
      stop,
      previous
    } = props;
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      ColorPallet,
      TextTheme
    } = (0, _theme.useTheme)();
    return /*#__PURE__*/React.createElement(_TourBox.TourBox, {
      title: t('Tour.AddCredentials'),
      hideLeft: true,
      rightText: t('Tour.Done'),
      onRight: stop,
      currentTour: currentTour,
      currentStep: currentStep,
      previous: previous,
      stop: stop,
      next: next
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: {
        ...TextTheme.normal,
        color: ColorPallet.notification.infoText
      },
      allowFontScaling: false
    }, t('Tour.AddCredentialsDescription')));
  }
}];
//# sourceMappingURL=CredentialsTourSteps.js.map