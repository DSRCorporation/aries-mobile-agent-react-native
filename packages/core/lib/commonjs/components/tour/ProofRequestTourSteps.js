"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proofRequestTourSteps = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _TourBox = require("./TourBox");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const proofRequestTourSteps = exports.proofRequestTourSteps = [{
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
      ColorPalette,
      TextTheme
    } = (0, _theme.useTheme)();
    return /*#__PURE__*/React.createElement(_TourBox.TourBox, {
      title: t('Tour.ProofRequests'),
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
        color: ColorPalette.notification.infoText
      },
      allowFontScaling: false
    }, t('Tour.ProofRequestsDescription')));
  }
}];
//# sourceMappingURL=ProofRequestTourSteps.js.map