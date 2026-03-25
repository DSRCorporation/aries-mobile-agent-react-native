"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderHome = _interopRequireDefault(require("../components/buttons/HeaderHome"));
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _RenameContact = _interopRequireDefault(require("../screens/RenameContact"));
var _JSONDetails = _interopRequireDefault(require("../screens/JSONDetails"));
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ContactStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ScreenOptionsDictionary] = (0, _containerApi.useServices)([_containerApi.TOKENS.OBJECT_SCREEN_CONFIG]);
  const [ContactDetails, ContactList, CredentialDetails, CredentialOffer, ProofRequest, ProofDetails, WhatAreContacts, Chat] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_CONNECTION_DETAILS, _containerApi.TOKENS.SCREEN_CONNECTION_LIST, _containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _containerApi.TOKENS.SCREEN_CREDENTIAL_OFFER, _containerApi.TOKENS.SCREEN_PROOF_REQUEST, _containerApi.TOKENS.SCREEN_PROOF_DETAILS, _containerApi.TOKENS.SCREEN_WHAT_ARE_CONTACTS, _containerApi.TOKENS.SCREEN_CHAT]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Contacts,
    component: ContactList,
    options: {
      title: t('Screens.Contacts'),
      ...ScreenOptionsDictionary[_navigators.Screens.Contacts]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ContactDetails,
    component: ContactDetails,
    options: {
      title: t('Screens.ContactDetails'),
      ...ScreenOptionsDictionary[_navigators.Screens.ContactDetails]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.RenameContact,
    component: _RenameContact.default,
    options: {
      title: t('Screens.RenameContact'),
      ...ScreenOptionsDictionary[_navigators.Screens.RenameContact]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.JSONDetails,
    component: _JSONDetails.default,
    options: {
      title: t('Screens.JSONDetails'),
      ...ScreenOptionsDictionary[_navigators.Screens.JSONDetails]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Chat,
    component: Chat,
    options: {
      ...ScreenOptionsDictionary[_navigators.Screens.Chat]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.WhatAreContacts,
    component: WhatAreContacts,
    options: {
      title: '',
      ...ScreenOptionsDictionary[_navigators.Screens.WhatAreContacts]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails'),
      ...ScreenOptionsDictionary[_navigators.Screens.CredentialDetails]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofDetails,
    component: ProofDetails,
    options: () => ({
      title: t('Screens.ProofDetails'),
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofDetails]
    })
  }));
};
var _default = exports.default = ContactStack;
//# sourceMappingURL=ContactStack.js.map