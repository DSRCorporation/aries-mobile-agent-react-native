"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeOrientationLocker = require("react-native-orientation-locker");
var _reactNativeVisionCamera = require("react-native-vision-camera");
var _testable = require("../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const styles = _reactNative.StyleSheet.create({
  focusIndicator: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent'
  }
});
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
  const [invalidQrCodes, setInvalidQrCodes] = (0, _react.useState)(new Set());
  const [focusPoint, setFocusPoint] = (0, _react.useState)(null);
  const focusOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const focusScale = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
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
  const camera = (0, _react.useRef)(null);
  (0, _reactNativeOrientationLocker.useOrientationChange)(orientationType => {
    setOrientation(orientationType);
  });
  const onCodeScanned = (0, _react.useCallback)(codes => {
    const value = codes[0].value;
    if (!value || invalidQrCodes.has(value)) {
      return;
    }
    if ((error === null || error === void 0 ? void 0 : error.data) === value) {
      setInvalidQrCodes(prev => new Set([...prev, value]));
      if (enableCameraOnError) {
        return setCameraActive(true);
      }
    }
    if (cameraActive) {
      _reactNative.Vibration.vibrate();
      handleCodeScan(value);
      return setCameraActive(false);
    }
  }, [invalidQrCodes, error, enableCameraOnError, cameraActive, handleCodeScan]);
  const drawFocusTap = async point => {
    // Draw a focus tap indicator on the camera preview
    setFocusPoint(point);
    focusOpacity.setValue(1);
    focusScale.setValue(1.5);
    _reactNative.Animated.parallel([_reactNative.Animated.timing(focusOpacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true
    }), _reactNative.Animated.spring(focusScale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true
    })]).start(() => {
      setFocusPoint(null);
    });
  };
  const focus = (0, _react.useCallback)(point => {
    const c = camera.current;
    if (c) {
      c.focus(point);
    }
  }, []);
  const handleFocusTap = e => {
    if (!(device !== null && device !== void 0 && device.supportsFocus)) {
      return;
    }
    const {
      locationX: x,
      locationY: y
    } = e.nativeEvent;
    const tapPoint = {
      x,
      y
    };
    drawFocusTap(tapPoint);
    focus(tapPoint);
  };
  (0, _react.useEffect)(() => {
    if (error !== null && error !== void 0 && error.data && enableCameraOnError) {
      setCameraActive(true);
    }
  }, [error, enableCameraOnError]);
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
  }, device && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeVisionCamera.Camera, {
    ref: camera,
    style: _reactNative.StyleSheet.absoluteFillObject,
    device: device,
    torch: torchActive ? 'on' : 'off',
    isActive: cameraActive,
    codeScanner: codeScanner,
    format: format
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    testID: (0, _testable.testIdWithKey)('ScanCameraTapArea'),
    style: _reactNative.StyleSheet.absoluteFill,
    onPressIn: e => {
      handleFocusTap(e);
    }
  }), focusPoint && /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    testID: (0, _testable.testIdWithKey)('FocusIndicator'),
    style: [styles.focusIndicator, {
      left: focusPoint.x - 40,
      top: focusPoint.y - 40,
      opacity: focusOpacity,
      transform: [{
        scale: focusScale
      }]
    }]
  })));
};
var _default = exports.default = ScanCamera;
//# sourceMappingURL=ScanCamera.js.map