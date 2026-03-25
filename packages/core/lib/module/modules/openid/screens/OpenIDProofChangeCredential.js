import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RecordLoading from '../../../components/animated/RecordLoading';
import { ThemedText } from '../../../components/texts/ThemedText';
import { TOKENS, useServices } from '../../../container-api';
import { useTheme } from '../../../contexts/theme';
import ScreenLayout from '../../../layout/ScreenLayout';
import { Screens } from '../../../types/navigators';
import { testIdWithKey } from '../../../utils/testable';
import { useOpenIDCredentials } from '../context/OpenIDCredentialRecordProvider';
import { isSdJwtProofRequest, isW3CProofRequest } from '../utils/utils';
const OpenIDProofCredentialSelect = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Change credential route params were not set properly');
  }
  const selectedCredentialID = route.params.selectedCredID;
  const altCredentials = route.params.altCredIDs;
  const onCredChange = route.params.onCredChange;
  const {
    ColorPalette,
    SelectedCredTheme
  } = useTheme();
  const {
    getW3CCredentialById,
    getSdJwtCredentialById
  } = useOpenIDCredentials();
  const [CredentialCard] = useServices([TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const {
    t
  } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [credentialsRequested, setCredentialsRequested] = useState([]);
  useEffect(() => {
    async function fetchCreds() {
      if (!altCredentials) return;
      setLoading(true);
      const creds = [];
      for (const {
        id,
        claimFormat
      } of Object.values(altCredentials)) {
        let credential;
        if (isW3CProofRequest(claimFormat)) {
          credential = await getW3CCredentialById(id);
        } else if (isSdJwtProofRequest(claimFormat)) {
          credential = await getSdJwtCredentialById(id);
        }
        if (credential) {
          creds.push({
            credential,
            claimFormat
          });
        }
      }
      setCredentialsRequested(creds);
      setLoading(false);
    }
    fetchCreds();
  }, [altCredentials, getW3CCredentialById, getSdJwtCredentialById]);
  const styles = StyleSheet.create({
    pageContainer: {
      flex: 1
    },
    pageMargin: {
      marginHorizontal: 20
    },
    cardLoading: {
      backgroundColor: ColorPalette.brand.secondaryBackground,
      flex: 1,
      flexGrow: 1,
      marginVertical: 35,
      borderRadius: 15,
      paddingHorizontal: 10
    }
  });
  const changeCred = selection => {
    onCredChange({
      inputDescriptorID: route.params.inputDescriptorID,
      id: selection.credential.id,
      claimFormat: selection.claimFormat
    });
    navigation.goBack();
  };
  const listHeader = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        ...styles.pageMargin,
        marginTop: 40,
        marginBottom: 20
      }
    }, loading ? /*#__PURE__*/React.createElement(View, {
      style: styles.cardLoading
    }, /*#__PURE__*/React.createElement(RecordLoading, null)) : /*#__PURE__*/React.createElement(ThemedText, {
      variant: 'bold'
    }, t('ProofRequest.AvailableCards')));
  };
  return /*#__PURE__*/React.createElement(ScreenLayout, {
    screen: Screens.OpenIDProofCredentialSelect
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: credentialsRequested,
    ListHeaderComponent: listHeader,
    renderItem: ({
      item
    }) => {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.pageMargin
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        accessibilityRole: "button",
        testID: testIdWithKey(`select:${item.credential.id}`),
        onPress: () => changeCred(item),
        style: [item.credential.id === selectedCredentialID ? SelectedCredTheme : undefined, {
          marginBottom: 10
        }]
      }, /*#__PURE__*/React.createElement(CredentialCard, {
        credential: item.credential
      })));
    }
  }));
};
export default OpenIDProofCredentialSelect;
//# sourceMappingURL=OpenIDProofChangeCredential.js.map