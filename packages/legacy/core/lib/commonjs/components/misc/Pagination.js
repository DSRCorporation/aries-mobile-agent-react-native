"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeAnimatedPaginationDots = require("react-native-animated-pagination-dots");
var _constants = require("../../constants");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Pagination = ({
  pages,
  activeIndex,
  scrollX,
  style,
  next,
  nextButtonText,
  previous,
  previousButtonText
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const shouldHideBack = () => {
    if (activeIndex === 0) {
      return true;
    }
    return false;
  };
  const shouldHideNext = () => {
    if (activeIndex === pages.length - 1) {
      return true;
    }
    return false;
  };

  // FIXME: Issue #204. Better to `disable` the `TouchableOpacity`
  // controls rather than changing the color to transparent.

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.pagerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Global.Back'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Back'),
    onPress: previous,
    accessibilityElementsHidden: shouldHideBack(),
    importantForAccessibility: shouldHideBack() ? 'no-hide-descendants' : 'auto',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.pagerNavigationButton, {
      paddingRight: 20,
      color: shouldHideBack() ? 'transparent' : style.pagerNavigationButton.color
    }]
  }, previousButtonText)), /*#__PURE__*/_react.default.createElement(_reactNativeAnimatedPaginationDots.ScalingDot, {
    data: pages,
    scrollX: scrollX,
    inActiveDotColor: style.pagerDotInactive.color,
    inActiveDotOpacity: 1,
    activeDotColor: style.pagerDotActive.color,
    activeDotScale: 1,
    dotStyle: style.pagerDot,
    containerStyle: style.pagerPosition
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Global.Next'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Next'),
    onPress: next,
    accessibilityElementsHidden: shouldHideNext(),
    importantForAccessibility: shouldHideNext() ? 'no-hide-descendants' : 'auto',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.pagerNavigationButton, {
      paddingLeft: 20,
      color: shouldHideNext() ? 'transparent' : style.pagerNavigationButton.color
    }]
  }, nextButtonText)));
};
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map