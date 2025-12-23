import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import { hitSlop } from '../../constants';
import { testIdWithKey } from '../../utils/testable';
export const Pagination = ({
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
  } = useTranslation();
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

  return /*#__PURE__*/React.createElement(View, {
    style: style.pagerContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Global.Back'),
    accessibilityRole: 'button',
    testID: testIdWithKey('Back'),
    onPress: previous,
    accessibilityElementsHidden: shouldHideBack(),
    importantForAccessibility: shouldHideBack() ? 'no-hide-descendants' : 'auto',
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Text, {
    style: [style.pagerNavigationButton, {
      paddingRight: 20,
      color: shouldHideBack() ? 'transparent' : style.pagerNavigationButton.color
    }]
  }, previousButtonText)), /*#__PURE__*/React.createElement(ScalingDot, {
    data: pages,
    scrollX: scrollX,
    inActiveDotColor: style.pagerDotInactive.color,
    inActiveDotOpacity: 1,
    activeDotColor: style.pagerDotActive.color,
    activeDotScale: 1,
    dotStyle: style.pagerDot,
    containerStyle: style.pagerPosition
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Global.Next'),
    accessibilityRole: 'button',
    testID: testIdWithKey('Next'),
    onPress: next,
    accessibilityElementsHidden: shouldHideNext(),
    importantForAccessibility: shouldHideNext() ? 'no-hide-descendants' : 'auto',
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Text, {
    style: [style.pagerNavigationButton, {
      paddingLeft: 20,
      color: shouldHideNext() ? 'transparent' : style.pagerNavigationButton.color
    }]
  }, nextButtonText)));
};
//# sourceMappingURL=Pagination.js.map