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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      marginVertical: 20,
      backgroundColor: 'white'
    },
    errorMessage: {
      color: ColorPallet.semantic.error,
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
  }), isInvalidQR && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.errorMessage
  }, t('QRRender.GenerationError')));
};
var _default = exports.default = QRRenderer;
//# sourceMappingURL=QRRenderer.js.map