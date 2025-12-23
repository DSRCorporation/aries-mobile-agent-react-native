import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecordLoading from '../components/animated/RecordLoading';
import { EventTypes } from '../constants';
import { useTheme } from '../contexts/theme';
import { useAllCredentialsForProof } from '../hooks/proofs';
import { BifoldError } from '../types/error';
import { evaluatePredicates } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
const ProofChangeCredential = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Change credential route params were not set properly');
  }
  const proofId = route.params.proofId;
  const selectedCred = route.params.selectedCred;
  const altCredentials = route.params.altCredentials;
  const onCredChange = route.params.onCredChange;
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [proofItems, setProofItems] = useState([]);
  const [retrievedCredentials, setRetrievedCredentials] = useState();
  const credProofPromise = useAllCredentialsForProof(proofId);
  const [CredentialCard] = useServices([TOKENS.COMP_CREDENTIAL_CARD]);
  const styles = StyleSheet.create({
    pageContainer: {
      flex: 1
    },
    pageMargin: {
      marginHorizontal: 20
    },
    cardLoading: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      flex: 1,
      flexGrow: 1,
      marginVertical: 35,
      borderRadius: 15,
      paddingHorizontal: 10
    },
    selectedCred: {
      borderWidth: 5,
      borderRadius: 15,
      borderColor: ColorPallet.semantic.focus
    }
  });
  const getCredentialsFields = () => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  });
  useEffect(() => {
    setLoading(true);
    credProofPromise === null || credProofPromise === void 0 || credProofPromise.then(value => {
      if (value) {
        const {
          groupedProof,
          retrievedCredentials
        } = value;
        setLoading(false);
        const activeCreds = groupedProof.filter(proof => altCredentials.includes(proof.credId));
        const credList = activeCreds.map(cred => cred.credId);
        const formatCredentials = retrievedItems => {
          return Object.keys(retrievedItems).map(key => {
            return {
              [key]: retrievedItems[key].filter(attr => credList.includes(attr.credentialId))
            };
          }).reduce((prev, curr) => {
            return {
              ...prev,
              ...curr
            };
          }, {});
        };
        const selectRetrievedCredentials = retrievedCredentials ? {
          ...retrievedCredentials,
          attributes: formatCredentials(retrievedCredentials.attributes),
          predicates: formatCredentials(retrievedCredentials.predicates)
        } : undefined;
        setRetrievedCredentials(selectRetrievedCredentials);
        setProofItems(activeCreds);
      }
    }).catch(err => {
      const error = new BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, []);
  const listHeader = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        ...styles.pageMargin,
        marginVertical: 20
      }
    }, loading ? /*#__PURE__*/React.createElement(View, {
      style: styles.cardLoading
    }, /*#__PURE__*/React.createElement(RecordLoading, null)) : /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.normal
    }, t('ProofRequest.MultipleCredentials')));
  };
  const changeCred = credId => {
    onCredChange(credId);
    navigation.goBack();
  };
  const hasSatisfiedPredicates = (fields, credId) => proofItems.flatMap(item => evaluatePredicates(fields, credId)(item)).every(p => p.satisfied);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: proofItems,
    ListHeaderComponent: listHeader,
    renderItem: ({
      item
    }) => {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.pageMargin
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        testID: testIdWithKey(`select:${item.credId}`),
        onPress: () => changeCred(item.credId ?? ''),
        style: [item.credId === selectedCred ? styles.selectedCred : undefined, {
          marginBottom: 10
        }],
        activeOpacity: 1
      }, /*#__PURE__*/React.createElement(CredentialCard, {
        credential: item.credExchangeRecord,
        credDefId: item.credDefId,
        schemaId: item.schemaId,
        displayItems: [...(item.attributes ?? []), ...evaluatePredicates(getCredentialsFields(), item.credId)(item)],
        credName: item.credName,
        existsInWallet: true,
        satisfiedPredicates: hasSatisfiedPredicates(getCredentialsFields(), item.credId),
        proof: true
      })));
    }
  }));
};
export default ProofChangeCredential;
//# sourceMappingURL=ProofChangeCredential.js.map