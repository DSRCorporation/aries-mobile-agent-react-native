import { useAgent } from '@credo-ts/react-hooks';
import { getProofData, groupSharedProofDataByCredential } from '@hyperledger/aries-bifold-verifier';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VerifierCredentialCard from '../../components/misc/VerifierCredentialCard';
import { useAnimatedComponents } from '../../contexts/animated-components';
import { useTheme } from '../../contexts/theme';
import { buildFieldsFromSharedAnonCredsProof } from '../../utils/oca';
const SharedDataCard = ({
  sharedData
}) => {
  const {
    ColorPallet
  } = useTheme();
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    const attributes = buildFieldsFromSharedAnonCredsProof(sharedData.data);
    setAttributes(attributes);
  }, [sharedData]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement(VerifierCredentialCard, {
    displayItems: attributes,
    style: {
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    credDefId: sharedData.identifiers.cred_def_id,
    schemaId: sharedData.identifiers.schema_id,
    elevated: true
  }));
};
const SharedProofData = ({
  recordId,
  onSharedProofDataLoad
}) => {
  const {
    agent
  } = useAgent();
  const {
    LoadingIndicator
  } = useAnimatedComponents();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1
    },
    loaderContainer: {
      height: 200,
      marginTop: 80
    }
  });
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const [loading, setLoading] = useState(true);
  const [sharedData, setSharedData] = useState(undefined);
  useEffect(() => {
    getProofData(agent, recordId).then(data => {
      if (data) {
        const groupedSharedProofData = groupSharedProofDataByCredential(data);
        const sharedData = Array.from(groupedSharedProofData.values());
        setSharedData(sharedData);
        if (!onSharedProofDataLoad) return;
        onSharedProofDataLoad(sharedData);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [recordId]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, loading || !sharedData ? /*#__PURE__*/React.createElement(View, {
    style: styles.loaderContainer
  }, /*#__PURE__*/React.createElement(LoadingIndicator, null)) : /*#__PURE__*/React.createElement(View, null, sharedData.map(item => /*#__PURE__*/React.createElement(SharedDataCard, {
    key: item.identifiers.cred_def_id,
    sharedData: item
  }))));
};
export default SharedProofData;
//# sourceMappingURL=SharedProofData.js.map