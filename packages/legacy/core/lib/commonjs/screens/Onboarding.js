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
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
var _Pagination = require("../components/misc/Pagination");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const renderItem = (0, _react.useCallback)(({
    item,
    index
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: [{
      width
    }, style.carouselContainer]
  }, item), []);
  const onSkipTouched = () => {
    dispatch({
      type: _store.DispatchAction.DID_COMPLETE_TUTORIAL
    });
    navigation.navigate(_navigators.Screens.Terms);
  };
  (0, _react.useEffect)(() => {
    !disableSkip && navigation.setOptions({
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
        buttonLocation: _HeaderButton.ButtonLocation.Right,
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
  }, [activeIndex]);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const onBackPress = () => {
      _reactNative.BackHandler.exitApp();
      return true;
    };
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBackPress);
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