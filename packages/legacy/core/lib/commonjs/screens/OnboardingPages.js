"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createStyles = exports.createPageWith = exports.createCarouselStyle = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _credentialList = _interopRequireDefault(require("../assets/img/credential-list.svg"));
var _scanShare = _interopRequireDefault(require("../assets/img/scan-share.svg"));
var _secureImage = _interopRequireDefault(require("../assets/img/secure-image.svg"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createCarouselStyle = OnboardingTheme => {
  return _reactNative.StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center'
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column'
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive
    },
    pagerPosition: {
      position: 'relative',
      top: 0
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton
    }
  });
};
exports.createCarouselStyle = createCarouselStyle;
const createStyles = OnboardingTheme => {
  return _reactNative.StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10
    },
    icon: {
      marginRight: 10
    }
  });
};
exports.createStyles = createStyles;
const createImageDisplayOptions = OnboardingTheme => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180
  };
};
const CustomPages = (onTutorialCompleted, OnboardingTheme) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = createStyles(OnboardingTheme);
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_secureImage.default, imageDisplayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, "Ornare suspendisse sed nisi lacus"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.bodyText, {
      marginTop: 25
    }],
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, "Enim facilisis gravida neque convallis a cras semper. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed."))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 'auto',
      margin: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.GetStarted'),
    accessibilityLabel: t('Global.GetStarted'),
    testID: (0, _testable.testIdWithKey)('GetStarted'),
    onPress: onTutorialCompleted,
    buttonType: _Button.ButtonType.Primary
  })));
};
const guides = [{
  image: _credentialList.default,
  title: 'Lorem ipsum dolor sit amet',
  body: 'Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.',
  devModeListener: true
}, {
  image: _scanShare.default,
  title: 'Excepteur sint occaecat ',
  body: 'Mollis aliquam ut porttitor leo a diam sollicitudin tempor.'
}];
const createPageWith = (PageImage, title, body, OnboardingTheme, devModeListener, onDevModeTouched) => {
  const styles = createStyles(OnboardingTheme);
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme);
  const titleElement = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title);
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(PageImage, {
    style: imageDisplayOptions
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 20
    }
  }, devModeListener ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    testID: (0, _testable.testIdWithKey)('DeveloperModeTouch'),
    onPress: onDevModeTouched
  }, titleElement) : titleElement, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.bodyText, {
      marginTop: 25
    }],
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, body)));
};
exports.createPageWith = createPageWith;
const OnboardingPages = (onTutorialCompleted, OnboardingTheme) => {
  const navigation = (0, _native.useNavigation)();
  const [, dispatch] = (0, _store2.useStore)();
  const onDevModeEnabled = () => {
    var _navigation$getParent;
    dispatch({
      type: _store.DispatchAction.ENABLE_DEVELOPER_MODE,
      payload: [true]
    });
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Screens.Developer);
  };
  const developerOptionCount = (0, _react.useRef)(0);
  const touchCountToEnableBiometrics = 9;
  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0;
      if (onDevModeEnabled) {
        onDevModeEnabled();
      }
      return;
    }
    developerOptionCount.current = developerOptionCount.current + 1;
  };
  return [...guides.map(g => createPageWith(g.image, g.title, g.body, OnboardingTheme, g.devModeListener, g.devModeListener ? incrementDeveloperMenuCounter : undefined)), CustomPages(onTutorialCompleted, OnboardingTheme)];
};
var _default = exports.default = OnboardingPages;
//# sourceMappingURL=OnboardingPages.js.map