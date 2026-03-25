"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeQrcodeSvg = _interopRequireDefault(require("react-native-qrcode-svg"));
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const QRRenderer = ({
  value,
  onError,
  size
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      marginVertical: 20,
      backgroundColor: 'white'
    },
    errorMessage: {
      color: ColorPalette.semantic.error,
      textAlign: 'center'
    }
  });
  const [isInvalidQR, setIsInvalidQR] = (0, _react.useState)(false);
  const handleQRCodeGenerationError = (0, _react.useCallback)(() => {
    setIsInvalidQR(true);
    if (onError) {
      onError();
    }
  }, [onError]);
  const qrSize = size ?? width - 80;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: (0, _testable.testIdWithKey)('QRRenderer')
  }, /*#__PURE__*/_react.default.createElement(_reactNativeQrcodeSvg.default, {
    ecl: "L",
    value: value,
    size: qrSize,
    onError: handleQRCodeGenerationError
  }), isInvalidQR && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.errorMessage
  }, t('QRRender.GenerationError')));
};
var _default = exports.default = QRRenderer;
//# sourceMappingURL=QRRenderer.js.map