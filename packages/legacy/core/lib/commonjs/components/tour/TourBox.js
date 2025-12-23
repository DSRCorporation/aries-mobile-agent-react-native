"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourBox = TourBox;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PaginationDotTypes = /*#__PURE__*/function (PaginationDotTypes) {
  PaginationDotTypes[PaginationDotTypes["Filled"] = 0] = "Filled";
  PaginationDotTypes[PaginationDotTypes["Unfilled"] = 1] = "Unfilled";
  return PaginationDotTypes;
}(PaginationDotTypes || {});
/**
 * A built-in TourBox component which can be used as a tooltip container for
 * each step. While it's somewhat customizable, it's not required and can be
 * replaced by your own component.
 *
 * @param props the component props
 * @returns A TourBox React element
 */
function TourBox(props) {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    leftText = t('Tour.Back'),
    rightText = t('Tour.Next'),
    title,
    hideLeft,
    hideRight,
    onLeft,
    onRight,
    children,
    stop,
    stepOn,
    stepsOutOf
  } = props;
  const {
    TextTheme,
    ColorPallet,
    OnboardingTheme
  } = (0, _theme.useTheme)();
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.notification.infoIcon;
  const [paginationDots, setPaginationDots] = (0, _react.useState)([]);
  const [xPos, setXPos] = (0, _react.useState)(0);
  const swipeThreshold = 75;
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.notification.info,
      borderColor: ColorPallet.notification.infoBorder,
      borderRadius: 5,
      borderWidth: 1,
      padding: 20,
      flex: 1,
      margin: 'auto'
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      flexGrow: 1
    },
    headerText: {
      ...TextTheme.headingThree,
      alignSelf: 'flex-start',
      color: ColorPallet.notification.infoText
    },
    dismissIcon: {
      alignSelf: 'flex-end'
    },
    body: {
      flex: 1,
      marginVertical: 16
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    navText: {
      ...TextTheme.bold,
      color: ColorPallet.brand.primary
    },
    pagerContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5
    },
    pagerDotActive: {
      backgroundColor: OnboardingTheme.pagerDotActive.color
    },
    pagerDotInactive: {
      backgroundColor: 'transparent'
    }
  });
  const handleLeft = (0, _react.useCallback)(() => {
    onLeft === null || onLeft === void 0 || onLeft();
  }, [onLeft]);
  const handleRight = (0, _react.useCallback)(() => {
    onRight === null || onRight === void 0 || onRight();
  }, [onRight]);
  (0, _react.useEffect)(() => {
    const arr = [];
    if (typeof stepOn === 'number' && typeof stepsOutOf === 'number') {
      for (let i = 1; i <= stepsOutOf; i++) {
        if (i === stepOn) {
          arr.push(PaginationDotTypes.Filled);
        } else {
          arr.push(PaginationDotTypes.Unfilled);
        }
      }
    }
    setPaginationDots(arr);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    onTouchStart: e => setXPos(e.nativeEvent.pageX),
    onTouchEnd: e => {
      // if swipe right
      if (xPos - e.nativeEvent.pageX > swipeThreshold) {
        handleRight();

        // if swipe left
      } else if (e.nativeEvent.pageX - xPos > swipeThreshold) {
        handleLeft();
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dismissIcon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: stop,
    testID: (0, _testable.testIdWithKey)('Close'),
    accessibilityLabel: t('Global.Close'),
    accessibilityRole: 'button',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: dismissIconName,
    size: iconSize,
    color: iconColor
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.body
  }, children), (!hideLeft || !hideRight) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, !hideLeft && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: leftText,
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Back'),
    onPress: handleLeft,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: styles.navText
  }, leftText))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pagerContainer
  }, paginationDots.map((dot, index) => dot === PaginationDotTypes.Filled ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: [styles.pagerDot, styles.pagerDotActive]
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: [styles.pagerDot, styles.pagerDotInactive]
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, !hideRight && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: rightText,
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Next'),
    onPress: handleRight,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    allowFontScaling: false,
    style: styles.navText
  }, rightText)))));
}
//# sourceMappingURL=TourBox.js.map