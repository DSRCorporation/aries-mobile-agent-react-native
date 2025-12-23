import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Vibration, View, useWindowDimensions } from 'react-native';
import { useOrientationChange, OrientationType } from 'react-native-orientation-locker';
import { Camera, useCameraDevice, useCameraFormat, useCodeScanner } from 'react-native-vision-camera';
const ScanCamera = ({
  handleCodeScan,
  error,
  enableCameraOnError,
  torchActive
}) => {
  const [orientation, setOrientation] = useState(OrientationType.PORTRAIT);
  const [cameraActive, setCameraActive] = useState(true);
  const orientationDegrees = {
    [OrientationType.PORTRAIT]: '0deg',
    [OrientationType['LANDSCAPE-LEFT']]: '270deg',
    [OrientationType['PORTRAIT-UPSIDEDOWN']]: '180deg',
    [OrientationType['LANDSCAPE-RIGHT']]: '90deg'
  };
  const invalidQrCodes = new Set();
  const device = useCameraDevice('back');
  const screenAspectRatio = useWindowDimensions().scale;
  const format = useCameraFormat(device, [{
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
  useOrientationChange(orientationType => {
    setOrientation(orientationType);
  });
  const onCodeScanned = useCallback(codes => {
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
      Vibration.vibrate();
      handleCodeScan(value);
      return setCameraActive(false);
    }
  }, [cameraActive]);
  useEffect(() => {
    if (error !== null && error !== void 0 && error.data && enableCameraOnError) {
      setCameraActive(true);
    }
  }, [error]);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onCodeScanned
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      transform: [{
        rotate: orientationDegrees[orientation] ?? '0deg'
      }]
    }]
  }, device && /*#__PURE__*/React.createElement(Camera, {
    style: StyleSheet.absoluteFill,
    device: device,
    torch: torchActive ? 'on' : 'off',
    isActive: cameraActive,
    codeScanner: codeScanner,
    format: format
  }));
};
export default ScanCamera;
//# sourceMappingURL=ScanCamera.js.map