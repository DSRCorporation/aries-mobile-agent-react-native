"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const fadeTiming = {
  toValue: 0.4,
  duration: 1100,
  useNativeDriver: true
};
const borderRadius = 10;
const RecordLoading = ({
  style
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const padding = width * 0.05;
  const logoHeight = width * 0.12;
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const rowFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1));
  const myStyle = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    rectangle: {
      backgroundColor: ColorPalette.grayscale.lightGrey,
      height: 30,
      marginVertical: 5,
      borderRadius
    },
    margin: {
      backgroundColor: ColorPalette.grayscale.lightGrey,
      width: 40,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    },
    logo: {
      marginLeft: -1 * logoHeight + padding,
      marginTop: padding,
      backgroundColor: ColorPalette.grayscale.lightGrey,
      height: logoHeight,
      width: logoHeight,
      borderRadius
    }
  });
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rowFadeAnim.current, fadeTiming)).start();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [{
      opacity: rowFadeAnim.current,
      backgroundColor: ColorPalette.grayscale.white,
      borderRadius: 15
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: myStyle.container,
    testID: (0, _testable.testIdWithKey)('RecordLoading')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: myStyle.margin
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: myStyle.logo
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexGrow: 1,
      marginLeft: 15,
      marginTop: 15,
      marginBottom: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [myStyle.rectangle, {
      width: '100%',
      height: 20
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [myStyle.rectangle, {
      width: '75%',
      height: 25
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [myStyle.rectangle, {
      width: '35%',
      height: 20,
      marginTop: 20
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [myStyle.rectangle, {
      width: '90%',
      height: 25
    }]
  })))));
};
var _default = exports.default = RecordLoading;
//# sourceMappingURL=RecordLoading.js.map