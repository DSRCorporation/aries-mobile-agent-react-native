import { useCredentialByState } from '@bifold/react-hooks';
import { DidCommCredentialState } from '@credo-ts/didcomm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { useOpenIDCredentials } from '../../modules/openid/context/OpenIDCredentialRecordProvider';
import { ThemedText } from '../texts/ThemedText';
const offset = 25;
const HomeFooterView = ({
  children
}) => {
  const {
    openIdState
  } = useOpenIDCredentials();
  const {
    w3cCredentialRecords,
    sdJwtVcRecords
  } = openIdState;
  const credentials = [...useCredentialByState(DidCommCredentialState.CredentialReceived), ...useCredentialByState(DidCommCredentialState.Done), ...w3cCredentialRecords, ...sdJwtVcRecords];
  const {
    HomeTheme,
    TextTheme,
    Assets
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
      marginHorizontal: offset
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: 100
    }
  });
  const displayMessage = credentialCount => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined');
    }
    let credentialMsg;
    let scanReminder;
    if (credentialCount === 1) {
      credentialMsg = /*#__PURE__*/React.createElement(ThemedText, null, t('Home.YouHave'), ' ', /*#__PURE__*/React.createElement(ThemedText, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credential'), " ", t('Home.InYourWallet'));
    } else if (credentialCount > 1) {
      credentialMsg = /*#__PURE__*/React.createElement(ThemedText, null, t('Home.YouHave'), ' ', /*#__PURE__*/React.createElement(ThemedText, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credentials'), " ", t('Home.InYourWallet'));
    } else {
      credentialMsg = /*#__PURE__*/React.createElement(ThemedText, {
        variant: "bold"
      }, t('Home.NoCredentials'));
      scanReminder = /*#__PURE__*/React.createElement(ThemedText, null, t('Home.ScanOfferAddCard'));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.imageContainer
    }, /*#__PURE__*/React.createElement(Assets.svg.homeCenterImg, {
      width: '30%'
    })), /*#__PURE__*/React.createElement(View, {
      style: styles.messageContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, credentialMsg)), /*#__PURE__*/React.createElement(View, {
      style: styles.messageContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, scanReminder)));
  };
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, displayMessage(credentials.length)), children);
};
export default HomeFooterView;
//# sourceMappingURL=HomeFooterView.js.map