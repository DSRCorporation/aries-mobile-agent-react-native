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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
    ColorPalette,
    OnboardingTheme
  } = (0, _theme.useTheme)();
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPalette.notification.infoIcon;
  const [paginationDots, setPaginationDots] = (0, _react.useState)([]);
  const [xPos, setXPos] = (0, _react.useState)(0);
  const swipeThreshold = 75;
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder,
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
      color: ColorPalette.notification.infoText
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
      color: ColorPalette.brand.primary
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
  const accessibilityLabel = (0, _react.useMemo)(() => {
    return stepOn && stepsOutOf ? t('Tour.AccessibilitySteps', {
      stepOn,
      stepsOutOf,
      title
    }) : title;
  }, [stepOn, stepsOutOf, title, t]);
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
  }, [stepOn, stepsOutOf]);
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
    testID: (0, _testable.testIdWithKey)('HeaderText'),
    accessibilityRole: "header",
    accessibilityLabel: accessibilityLabel
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