import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderRightHome from '../components/buttons/HeaderHome';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import RenameContact from '../screens/RenameContact';
import { Screens } from '../types/navigators';
import { useDefaultStackOptions } from './defaultStackOptions';
const ContactStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ContactDetails, ContactList, CredentialDetails, CredentialOffer, ProofRequest, ProofDetails, WhatAreContacts, Chat] = useServices([TOKENS.SCREEN_CONNECTION_DETAILS, TOKENS.SCREEN_CONNECTION_LIST, TOKENS.SCREEN_CREDENTIAL_DETAILS, TOKENS.SCREEN_CREDENTIAL_OFFER, TOKENS.SCREEN_PROOF_REQUEST, TOKENS.SCREEN_PROOF_DETAILS, TOKENS.SCREEN_WHAT_ARE_CONTACTS, TOKENS.SCREEN_CHAT]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Contacts,
    component: ContactList,
    options: {
      title: t('Screens.Contacts')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ContactDetails,
    component: ContactDetails,
    options: {
      title: t('Screens.ContactDetails')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.RenameContact,
    component: RenameContact,
    options: {
      title: t('Screens.RenameContact')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Chat,
    component: Chat
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.WhatAreContacts,
    component: WhatAreContacts,
    options: {
      title: ''
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofDetails,
    component: ProofDetails,
    options: () => ({
      title: t('Screens.ProofDetails'),
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null)
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest')
    }
  }));
};
export default ContactStack;
//# sourceMappingURL=ContactStack.js.map