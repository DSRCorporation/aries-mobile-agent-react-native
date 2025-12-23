"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Link = _interopRequireDefault(require("../components/texts/Link"));
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const WhatAreContacts = ({
  navigation
}) => {
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    title: {
      ...TextTheme.headingTwo,
      marginBottom: 15
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
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: {
        ...TextTheme.normal,
        paddingRight: 5
      }
    }, '\u2022'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        flexShrink: 1
      }]
    }, text));
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: styles.pageContent,
    directionalLockEnabled: true,
    automaticallyAdjustContentInsets: false,
    showsHorizontalScrollIndicator: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, t('WhatAreContacts.Title')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('WhatAreContacts.Preamble')), bulletPoints, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, `${t('WhatAreContacts.RemoveContacts')} `, /*#__PURE__*/_react.default.createElement(_Link.default, {
    linkText: t('WhatAreContacts.ContactsLink'),
    onPress: goToContactList
  }))));
};
var _default = exports.default = WhatAreContacts;
//# sourceMappingURL=WhatAreContacts.js.map