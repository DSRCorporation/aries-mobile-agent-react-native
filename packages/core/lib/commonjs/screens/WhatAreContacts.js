"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Link = _interopRequireDefault(require("../components/texts/Link"));
var _ThemedText = require("../components/texts/ThemedText");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WhatAreContacts = ({
  navigation
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    pageContent: {
      marginTop: 30,
      paddingLeft: 25,
      paddingRight: 25
    }
  });
  const goToContactList = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.Contacts
    });
  };
  const bulletPoints = [t('WhatAreContacts.ListItemDirectMessage'), t('WhatAreContacts.ListItemNewCredentials'), t('WhatAreContacts.ListItemNotifiedOfUpdates'), t('WhatAreContacts.ListItemRequest')].map((text, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: index,
      style: {
        marginBottom: 10,
        flexDirection: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        paddingRight: 5
      }
    }, '\u2022'), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        flexShrink: 1
      }
    }, text));
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: styles.pageContent,
    directionalLockEnabled: true,
    automaticallyAdjustContentInsets: false,
    showsHorizontalScrollIndicator: false
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingTwo",
    style: {
      marginBottom: 15
    },
    accessibilityRole: "header"
  }, t('WhatAreContacts.Title')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('WhatAreContacts.Preamble')), bulletPoints, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, `${t('WhatAreContacts.RemoveContacts')} `, /*#__PURE__*/_react.default.createElement(_Link.default, {
    linkText: t('WhatAreContacts.ContactsLink'),
    onPress: goToContactList
  }))));
};
var _default = exports.default = WhatAreContacts;
//# sourceMappingURL=WhatAreContacts.js.map