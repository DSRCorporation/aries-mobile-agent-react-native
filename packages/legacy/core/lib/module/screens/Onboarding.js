import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, BackHandler, FlatList, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton';
import { Pagination } from '../components/misc/Pagination';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
const Onboarding = ({
  pages,
  nextButtonText,
  previousButtonText,
  style,
  disableSkip = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  const [, dispatch] = useStore();
  const {
    width
  } = useWindowDimensions();
  const onViewableItemsChangedRef = useRef(({
    viewableItems
  }) => {
    if (!viewableItems[0]) {
      return;
    }
    setActiveIndex(viewableItems[0].index);
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 60
  });
  const onScroll = Animated.event([{
    nativeEvent: {
      contentOffset: {
        x: scrollX
      }
    }
  }], {
    useNativeDriver: false
  });
  const next = () => {
    if (activeIndex + 1 < pages.length) {
      var _flatList$current;
      flatList === null || flatList === void 0 || (_flatList$current = flatList.current) === null || _flatList$current === void 0 || _flatList$current.scrollToIndex({
        index: activeIndex + 1,
        animated: true
      });
    }
  };
  const previous = () => {
    if (activeIndex !== 0) {
      var _flatList$current2;
      flatList === null || flatList === void 0 || (_flatList$current2 = flatList.current) === null || _flatList$current2 === void 0 || _flatList$current2.scrollToIndex({
        index: activeIndex - 1,
        animated: true
      });
    }
  };
  const renderItem = useCallback(({
    item,
    index
  }) => /*#__PURE__*/React.createElement(View, {
    key: index,
    style: [{
      width
    }, style.carouselContainer]
  }, item), []);
  const onSkipTouched = () => {
    dispatch({
      type: DispatchAction.DID_COMPLETE_TUTORIAL
    });
    navigation.navigate(Screens.Terms);
  };
  useEffect(() => {
    !disableSkip && navigation.setOptions({
      headerRight: () => /*#__PURE__*/React.createElement(HeaderButton, {
        buttonLocation: ButtonLocation.Right,
        accessibilityLabel: t('Onboarding.SkipA11y'),
        testID: testIdWithKey('Skip'),
        onPress: onSkipTouched,
        icon: "chevron-right",
        text: t('Global.Skip')
      })
    });
    if (!disableSkip && activeIndex + 1 === pages.length) {
      navigation.setOptions({
        headerRight: () => false
      });
    }
  }, [activeIndex]);
  useFocusEffect(useCallback(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []));
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.container,
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: flatList,
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    style: {
      width
    },
    data: pages,
    renderItem: renderItem,
    viewabilityConfig: viewabilityConfigRef.current,
    onViewableItemsChanged: onViewableItemsChangedRef.current,
    onScroll: onScroll,
    scrollEventThrottle: 16
  }), /*#__PURE__*/React.createElement(Pagination, {
    pages: pages,
    activeIndex: activeIndex,
    nextButtonText: nextButtonText,
    previousButtonText: previousButtonText,
    scrollX: scrollX,
    style: style,
    next: next,
    previous: previous
  }));
};
export default Onboarding;
//# sourceMappingURL=Onboarding.js.map