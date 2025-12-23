"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RecordLoading = () => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const rowFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const fadeTiming = {
    toValue: 0.2,
    duration: 1100,
    useNativeDriver: true
  };
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    rectangle: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
      height: 30,
      marginVertical: 10
    },
    line: {
      backgroundColor: ColorPallet.grayscale.lightGrey,
      height: 1,
      marginVertical: 5
    }
  });
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rowFadeAnim, fadeTiming)).start();
  }, []);
  const makeARow = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.rectangle, {
        width: '35%'
      }]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.rectangle, {
        width: '85%'
      }]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.line
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container,
    testID: (0, _testable.testIdWithKey)('RecordLoading')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      opacity: rowFadeAnim
    }
  }, makeARow(), makeARow()));
};
var _default = exports.default = RecordLoading;
//# sourceMappingURL=RecordLoading.js.map