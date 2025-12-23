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
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ContactStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ContactDetails, ContactList, CredentialDetails, CredentialOffer, ProofRequest, ProofDetails, WhatAreContacts, Chat] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_CONNECTION_DETAILS, _containerApi.TOKENS.SCREEN_CONNECTION_LIST, _containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _containerApi.TOKENS.SCREEN_CREDENTIAL_OFFER, _containerApi.TOKENS.SCREEN_PROOF_REQUEST, _containerApi.TOKENS.SCREEN_PROOF_DETAILS, _containerApi.TOKENS.SCREEN_WHAT_ARE_CONTACTS, _containerApi.TOKENS.SCREEN_CHAT]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Contacts,
    component: ContactList,
    options: {
      title: t('Screens.Contacts')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ContactDetails,
    component: ContactDetails,
    options: {
      title: t('Screens.ContactDetails')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.RenameContact,
    component: _RenameContact.default,
    options: {
      title: t('Screens.RenameContact')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Chat,
    component: Chat
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.WhatAreContacts,
    component: WhatAreContacts,
    options: {
      title: ''
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofDetails,
    component: ProofDetails,
    options: () => ({
      title: t('Screens.ProofDetails'),
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null)
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest')
    }
  }));
};
var _default = exports.default = ContactStack;
//# sourceMappingURL=ContactStack.js.map