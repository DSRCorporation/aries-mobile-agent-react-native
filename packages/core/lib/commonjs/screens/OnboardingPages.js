"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createStyles = exports.createPageWith = exports.createCarouselStyle = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _credentialList = _interopRequireDefault(require("../assets/img/credential-list.svg"));
var _scanShare = _interopRequireDefault(require("../assets/img/scan-share.svg"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _testable = require("../utils/testable");
var _theme = require("../contexts/theme");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    Assets
  } = (0, _theme.useTheme)();
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
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.secureImage, imageDisplayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, "Ornare suspendisse sed nisi lacus"), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
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
const createPageWith = (PageImage, title, body, OnboardingTheme) => {
  const styles = createStyles(OnboardingTheme);
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme);
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [styles.bodyText, {
      marginTop: 25
    }],
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, body)));
};
exports.createPageWith = createPageWith;
const OnboardingPages = (onTutorialCompleted, OnboardingTheme) => {
  return [...guides.map(g => createPageWith(g.image, g.title, g.body, OnboardingTheme)), CustomPages(onTutorialCompleted, OnboardingTheme)];
};
var _default = exports.default = OnboardingPages;
//# sourceMappingURL=OnboardingPages.js.map