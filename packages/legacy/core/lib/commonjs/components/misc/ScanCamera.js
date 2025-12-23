"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeOrientationLocker = require("react-native-orientation-locker");
var _reactNativeVisionCamera = require("react-native-vision-camera");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ScanCamera = ({
  handleCodeScan,
  error,
  enableCameraOnError,
  torchActive
}) => {
  const [orientation, setOrientation] = (0, _react.useState)(_reactNativeOrientationLocker.OrientationType.PORTRAIT);
  const [cameraActive, setCameraActive] = (0, _react.useState)(true);
  const orientationDegrees = {
    [_reactNativeOrientationLocker.OrientationType.PORTRAIT]: '0deg',
    [_reactNativeOrientationLocker.OrientationType['LANDSCAPE-LEFT']]: '270deg',
    [_reactNativeOrientationLocker.OrientationType['PORTRAIT-UPSIDEDOWN']]: '180deg',
    [_reactNativeOrientationLocker.OrientationType['LANDSCAPE-RIGHT']]: '90deg'
  };
  const invalidQrCodes = new Set();
  const device = (0, _reactNativeVisionCamera.useCameraDevice)('back');
  const screenAspectRatio = (0, _reactNative.useWindowDimensions)().scale;
  const format = (0, _reactNativeVisionCamera.useCameraFormat)(device, [{
    fps: 20
  }, {
    videoAspectRatio: screenAspectRatio
  }, {
    videoResolution: 'max'
  }, {
    photoAspectRatio: screenAspectRatio
  }, {
    photoResolution: 'max'
  }]);
  (0, _reactNativeOrientationLocker.useOrientationChange)(orientationType => {
    setOrientation(orientationType);
  });
  const onCodeScanned = (0, _react.useCallback)(codes => {
    const value = codes[0].value;
    if (!value || invalidQrCodes.has(value)) {
      return;
    }
    if ((error === null || error === void 0 ? void 0 : error.data) === value) {
      invalidQrCodes.add(value);
      if (enableCameraOnError) {
        return setCameraActive(true);
      }
    }
    if (cameraActive) {
      _reactNative.Vibration.vibrate();
      handleCodeScan(value);
      return setCameraActive(false);
    }
  }, [cameraActive]);
  (0, _react.useEffect)(() => {
    if (error !== null && error !== void 0 && error.data && enableCameraOnError) {
      setCameraActive(true);
    }
  }, [error]);
  const codeScanner = (0, _reactNativeVisionCamera.useCodeScanner)({
    codeTypes: ['qr'],
    onCodeScanned: onCodeScanned
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      transform: [{
        rotate: orientationDegrees[orientation] ?? '0deg'
      }]
    }]
  }, device && /*#__PURE__*/_react.default.createElement(_reactNativeVisionCamera.Camera, {
    style: _reactNative.StyleSheet.absoluteFill,
    device: device,
    torch: torchActive ? 'on' : 'off',
    isActive: cameraActive,
    codeScanner: codeScanner,
    format: format
  }));
};
var _default = exports.default = ScanCamera;
//# sourceMappingURL=ScanCamera.js.map