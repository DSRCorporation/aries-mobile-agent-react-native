"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _Pagination = require("../components/misc/Pagination");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _testable = require("../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Onboarding = ({
  pages,
  nextButtonText,
  previousButtonText,
  style,
  disableSkip = false
}) => {
  const [activeIndex, setActiveIndex] = (0, _react.useState)(0);
  const flatList = (0, _react.useRef)(null);
  const scrollX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const [, dispatch] = (0, _store2.useStore)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const onViewableItemsChangedRef = (0, _react.useRef)(({
    viewableItems
  }) => {
    if (!viewableItems[0]) {
      return;
    }
    setActiveIndex(viewableItems[0].index);
  });
  const viewabilityConfigRef = (0, _react.useRef)({
    viewAreaCoveragePercentThreshold: 60
  });
  const onScroll = _reactNative.Animated.event([{
    nativeEvent: {
      contentOffset: {
        x: scrollX
      }
    }
  }], {
    useNativeDriver: false
  });
  const next = (0, _react.useCallback)(() => {
    if (activeIndex + 1 < pages.length) {
      var _flatList$current;
      flatList === null || flatList === void 0 || (_flatList$current = flatList.current) === null || _flatList$current === void 0 || _flatList$current.scrollToIndex({
        index: activeIndex + 1,
        animated: true
      });
    }
  }, [activeIndex, pages, flatList]);
  const previous = (0, _react.useCallback)(() => {
    if (activeIndex !== 0) {
      var _flatList$current2;
      flatList === null || flatList === void 0 || (_flatList$current2 = flatList.current) === null || _flatList$current2 === void 0 || _flatList$current2.scrollToIndex({
        index: activeIndex - 1,
        animated: true
      });
    }
  }, [activeIndex, flatList]);
  const renderItem = (0, _react.useCallback)(({
    item,
    index
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: [{
      width
    }, style.carouselContainer]
  }, item), [width, style.carouselContainer]);
  const onSkipTouched = (0, _react.useCallback)(() => {
    dispatch({
      type: _store.DispatchAction.DID_COMPLETE_TUTORIAL
    });
  }, [dispatch]);
  (0, _react.useEffect)(() => {
    !disableSkip && navigation.setOptions({
      headerRight: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Right,
        accessibilityLabel: t('Onboarding.SkipA11y'),
        testID: (0, _testable.testIdWithKey)('Skip'),
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
  }, [disableSkip, navigation, t, onSkipTouched, activeIndex, pages]);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const onBackPress = () => {
      _reactNative.BackHandler.exitApp();
      return true;
    };
    const subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []));
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.container,
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
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
  }), /*#__PURE__*/_react.default.createElement(_Pagination.Pagination, {
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
var _default = exports.default = Onboarding;
//# sourceMappingURL=Onboarding.js.map