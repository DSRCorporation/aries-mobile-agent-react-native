"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _navigators = require("../../types/navigators");
var _Link = _interopRequireDefault(require("../texts/Link"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EmptyListContacts = ({
  navigation
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems,
    Assets,
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      paddingTop: 100,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    text: {
      textAlign: 'center',
      marginTop: 10
    },
    link: {
      textAlign: 'center',
      marginTop: 10,
      alignSelf: 'center'
    }
  });
  const navigateToWhatAreContacts = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.WhatAreContacts
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.contactBook, {
    fill: ListItems.emptyList.color,
    height: 120
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    style: [styles.text, {
      marginTop: 30
    }],
    accessibilityRole: "header"
  }, t('Contacts.EmptyList')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [ListItems.emptyList, styles.text]
  }, t('Contacts.PeopleAndOrganizations')), /*#__PURE__*/_react.default.createElement(_Link.default, {
    style: styles.link,
    linkText: t('Contacts.WhatAreContacts'),
    onPress: navigateToWhatAreContacts
  }));
};
var _default = exports.default = EmptyListContacts;
//# sourceMappingURL=EmptyListContacts.js.map