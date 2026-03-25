import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, Ellipse, Mask, Path, Rect } from 'react-native-svg';
export let MaskType = /*#__PURE__*/function (MaskType) {
  MaskType["QR_CODE"] = "qr-code";
  MaskType["OVAL"] = "oval";
  MaskType["RECTANGLE"] = "rectangle";
  MaskType["ID_CARD"] = "id-card";
  MaskType["CUSTOM"] = "custom";
  return MaskType;
}({});
const SVGOverlay = ({
  maskType = MaskType.OVAL,
  customPath,
  strokeColor = undefined,
  overlayColor = 'black',
  overlayOpacity = 0.6
}) => {
  const {
    width: screenWidth,
    height: screenHeight
  } = useWindowDimensions();
  const renderCutOutShape = fill => {
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    switch (maskType) {
      case MaskType.OVAL:
        return /*#__PURE__*/React.createElement(Ellipse, {
          cx: centerX,
          cy: centerY - 10,
          rx: screenWidth * 0.45,
          ry: screenHeight * 0.28,
          fill: fill,
          stroke: strokeColor
        });
      case MaskType.RECTANGLE:
        {
          const rectSize = screenWidth * 0.8;
          return /*#__PURE__*/React.createElement(Rect, {
            x: centerX - rectSize / 2,
            y: centerY - rectSize / 2,
            width: rectSize,
            height: rectSize,
            fill: fill
          });
        }
      case MaskType.ID_CARD:
        {
          // ID card shape with rounded corners
          const cardWidth = screenWidth * 0.9;
          const cardHeight = cardWidth / 1.6; // Common ID/ Credit card size ratio
          return /*#__PURE__*/React.createElement(Rect, {
            x: centerX - cardWidth / 2,
            y: centerY - cardHeight,
            width: cardWidth,
            height: cardHeight,
            rx: 15,
            ry: 15,
            fill: fill,
            stroke: strokeColor,
            strokeWidth: 2
          });
        }
      case MaskType.QR_CODE:
        {
          const qrSize = screenWidth * 0.9;
          return /*#__PURE__*/React.createElement(Rect, {
            x: centerX - qrSize / 2,
            y: centerY - qrSize / 1.5,
            width: qrSize,
            height: qrSize,
            fill: fill,
            stroke: strokeColor,
            strokeWidth: 2
          });
        }
      case MaskType.CUSTOM:
        return customPath ? /*#__PURE__*/React.createElement(Path, {
          d: customPath,
          fill: fill
        }) : null;
      default:
        return /*#__PURE__*/React.createElement(Circle, {
          cx: centerX,
          cy: centerY,
          r: screenWidth / 2,
          fill: fill
        });
    }
  };
  const maskCutOutShape = renderCutOutShape('black');
  const cutOutShape = renderCutOutShape('transparent');
  return /*#__PURE__*/React.createElement(Svg, {
    width: screenWidth,
    height: screenHeight,
    style: {
      position: 'absolute'
    }
  }, /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(Mask, {
    id: "overlayMask"
  }, /*#__PURE__*/React.createElement(Rect, {
    width: screenWidth,
    height: screenHeight,
    fill: "white"
  }), maskCutOutShape)), /*#__PURE__*/React.createElement(Rect, {
    width: screenWidth,
    height: screenHeight,
    fill: overlayColor,
    fillOpacity: overlayOpacity,
    mask: "url(#overlayMask)"
  }), cutOutShape);
};
export default SVGOverlay;
//# sourceMappingURL=SVGOverlay.js.map