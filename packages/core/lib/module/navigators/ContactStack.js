import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderRightHome from '../components/buttons/HeaderHome';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import RenameContact from '../screens/RenameContact';
import JSONDetails from '../screens/JSONDetails';
import { Screens } from '../types/navigators';
import { useDefaultStackOptions } from './defaultStackOptions';
const ContactStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ScreenOptionsDictionary] = useServices([TOKENS.OBJECT_SCREEN_CONFIG]);
  const [ContactDetails, ContactList, CredentialDetails, CredentialOffer, ProofRequest, ProofDetails, WhatAreContacts, Chat] = useServices([TOKENS.SCREEN_CONNECTION_DETAILS, TOKENS.SCREEN_CONNECTION_LIST, TOKENS.SCREEN_CREDENTIAL_DETAILS, TOKENS.SCREEN_CREDENTIAL_OFFER, TOKENS.SCREEN_PROOF_REQUEST, TOKENS.SCREEN_PROOF_DETAILS, TOKENS.SCREEN_WHAT_ARE_CONTACTS, TOKENS.SCREEN_CHAT]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Contacts,
    component: ContactList,
    options: {
      title: t('Screens.Contacts'),
      ...ScreenOptionsDictionary[Screens.Contacts]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ContactDetails,
    component: ContactDetails,
    options: {
      title: t('Screens.ContactDetails'),
      ...ScreenOptionsDictionary[Screens.ContactDetails]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.RenameContact,
    component: RenameContact,
    options: {
      title: t('Screens.RenameContact'),
      ...ScreenOptionsDictionary[Screens.RenameContact]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.JSONDetails,
    component: JSONDetails,
    options: {
      title: t('Screens.JSONDetails'),
      ...ScreenOptionsDictionary[Screens.JSONDetails]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Chat,
    component: Chat,
    options: {
      ...ScreenOptionsDictionary[Screens.Chat]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.WhatAreContacts,
    component: WhatAreContacts,
    options: {
      title: '',
      ...ScreenOptionsDictionary[Screens.WhatAreContacts]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails'),
      ...ScreenOptionsDictionary[Screens.CredentialDetails]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofDetails,
    component: ProofDetails,
    options: () => ({
      title: t('Screens.ProofDetails'),
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null),
      ...ScreenOptionsDictionary[Screens.ProofDetails]
    })
  }));
};
export default ContactStack;
//# sourceMappingURL=ContactStack.js.map