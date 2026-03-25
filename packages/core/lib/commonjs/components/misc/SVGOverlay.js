"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MaskType = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let MaskType = exports.MaskType = /*#__PURE__*/function (MaskType) {
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
  } = (0, _reactNative.useWindowDimensions)();
  const renderCutOutShape = fill => {
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    switch (maskType) {
      case MaskType.OVAL:
        return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Ellipse, {
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
          return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
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
          return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
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
          return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
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
        return customPath ? /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
          d: customPath,
          fill: fill
        }) : null;
      default:
        return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
          cx: centerX,
          cy: centerY,
          r: screenWidth / 2,
          fill: fill
        });
    }
  };
  const maskCutOutShape = renderCutOutShape('black');
  const cutOutShape = renderCutOutShape('transparent');
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: screenWidth,
    height: screenHeight,
    style: {
      position: 'absolute'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Mask, {
    id: "overlayMask"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
    width: screenWidth,
    height: screenHeight,
    fill: "white"
  }), maskCutOutShape)), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
    width: screenWidth,
    height: screenHeight,
    fill: overlayColor,
    fillOpacity: overlayOpacity,
    mask: "url(#overlayMask)"
  }), cutOutShape);
};
var _default = exports.default = SVGOverlay;
//# sourceMappingURL=SVGOverlay.js.map