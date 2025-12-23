import { BrandingOverlayType } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import CredentialCard10 from './CredentialCard10';
import CredentialCard11 from './CredentialCard11';
const CredentialCard = ({
  credential,
  credDefId,
  schemaId,
  proof,
  displayItems,
  credName,
  existsInWallet,
  satisfiedPredicates,
  hasAltCredentials,
  handleAltCredChange,
  style = {},
  onPress = undefined
}) => {
  // add ability to reference credential by ID, allows us to get past react hook restrictions
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const {
    ColorPallet
  } = useTheme();
  const getCredOverlayType = type => {
    if (proof) {
      return /*#__PURE__*/React.createElement(CredentialCard11, {
        displayItems: displayItems,
        style: {
          backgroundColor: ColorPallet.brand.secondaryBackground
        },
        error: !existsInWallet,
        predicateError: !satisfiedPredicates,
        credName: credName,
        credDefId: credDefId,
        schemaId: schemaId,
        credential: credential,
        handleAltCredChange: handleAltCredChange,
        hasAltCredentials: hasAltCredentials,
        proof: true,
        elevated: true
      });
    }
    if (credential) {
      if (type === BrandingOverlayType.Branding01) {
        return /*#__PURE__*/React.createElement(CredentialCard10, {
          credential: credential,
          style: style,
          onPress: onPress
        });
      } else {
        return /*#__PURE__*/React.createElement(CredentialCard11, {
          credential: credential,
          style: style,
          onPress: onPress
        });
      }
    } else {
      return /*#__PURE__*/React.createElement(CredentialCard11, {
        credDefId: credDefId,
        schemaId: schemaId,
        credName: credName,
        displayItems: displayItems,
        style: style,
        onPress: onPress
      });
    }
  };
  return getCredOverlayType(bundleResolver.getBrandingOverlayType());
};
export default CredentialCard;
//# sourceMappingURL=CredentialCard.js.map