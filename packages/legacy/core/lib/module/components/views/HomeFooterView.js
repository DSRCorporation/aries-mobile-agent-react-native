import { CredentialState } from '@credo-ts/core';
import { useCredentialByState } from '@credo-ts/react-hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
const offset = 25;
const HomeFooterView = ({
  children
}) => {
  const credentials = [...useCredentialByState(CredentialState.CredentialReceived), ...useCredentialByState(CredentialState.Done)];
  const [{
    useNotifications
  }] = useServices([TOKENS.NOTIFICATIONS]);
  const notifications = useNotifications();
  const {
    HomeTheme,
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: offset,
      paddingBottom: offset * 3
    },
    messageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 35,
      marginHorizontal: offset
    }
  });
  const displayMessage = credentialCount => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined');
    }
    let credentialMsg;
    if (credentialCount === 1) {
      credentialMsg = /*#__PURE__*/React.createElement(Text, null, t('Home.YouHave'), " ", /*#__PURE__*/React.createElement(Text, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credential'), " ", t('Home.InYourWallet'));
    } else if (credentialCount > 1) {
      credentialMsg = /*#__PURE__*/React.createElement(Text, null, t('Home.YouHave'), " ", /*#__PURE__*/React.createElement(Text, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credentials'), " ", t('Home.InYourWallet'));
    } else {
      credentialMsg = t('Home.NoCredentials');
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, notifications.length === 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.messageContainer
    }, /*#__PURE__*/React.createElement(Text, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.welcomeHeader, {
        marginTop: offset,
        marginBottom: 20
      }]
    }, t('Home.Welcome'))), /*#__PURE__*/React.createElement(View, {
      style: styles.messageContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, credentialMsg)));
  };
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, displayMessage(credentials.length)), children);
};
export default HomeFooterView;
//# sourceMappingURL=HomeFooterView.js.map