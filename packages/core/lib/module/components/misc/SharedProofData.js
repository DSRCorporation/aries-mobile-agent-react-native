import { useAgent } from '@bifold/react-hooks';
import { getProofData, groupSharedProofDataByCredential } from '@bifold/verifier';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import VerifierCredentialCard from './VerifierCredentialCard';
import { useAnimatedComponents } from '../../contexts/animated-components';
import { useTheme } from '../../contexts/theme';
import { buildFieldsFromSharedAnonCredsProof } from '../../utils/oca';
import { TOKENS, useServices } from '../../container-api';
const SharedDataCard = ({
  sharedData
}) => {
  const {
    ColorPalette
  } = useTheme();
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    const attributes = buildFieldsFromSharedAnonCredsProof(sharedData.data);
    setAttributes(attributes);
  }, [sharedData]);
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement(VerifierCredentialCard, {
    displayItems: attributes,
    style: bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding10 ? {
      backgroundColor: ColorPalette.brand.secondaryBackground
    } : undefined,
    credDefId: sharedData.identifiers.cred_def_id,
    schemaId: sharedData.identifiers.schema_id,
    elevated: true,
    brandingOverlayType: bundleResolver.getBrandingOverlayType()
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
  }, [agent, recordId, onSharedProofDataLoad]);
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