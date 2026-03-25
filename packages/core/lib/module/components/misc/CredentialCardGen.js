// packages/core/src/components/misc/CredentialCard.tsx
import React, { useEffect, useState } from 'react';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
// unified wallet-model imports
import WalletCredentialCard from '../../wallet/CardPresenter';
import { brandingOverlayTypeString, mapCredentialTypeToCard } from '../../wallet/map-to-card';
import { useTranslation } from 'react-i18next';
import { useCredentialConnectionLabel } from '../../utils/helpers';
const CredentialCardGen = ({
  credential,
  proof,
  credName,
  hasAltCredentials,
  handleAltCredChange,
  onPress = undefined,
  credentialErrors,
  brandingOverlay,
  displayItems
}) => {
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const {
    ColorPalette
  } = useTheme();
  const {
    t
  } = useTranslation();
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);

  // unified card data
  const [cardData, setCardData] = useState(undefined);

  //Generic Mapping
  useEffect(() => {
    const resolveOverlay = async cred => {
      const cardData = await mapCredentialTypeToCard({
        credential: cred,
        bundleResolver,
        colorPalette: ColorPalette,
        unknownIssuerName: t('Contacts.UnknownContact'),
        brandingOverlay,
        proof,
        credentialErrors,
        credName,
        credentialConnectionLabel,
        displayItems
      });
      setCardData(cardData);
    };
    if (credential) {
      resolveOverlay(credential);
    }
  }, [credential, bundleResolver, ColorPalette, brandingOverlay, proof, credentialErrors, t, credName, credentialConnectionLabel, displayItems]);

  // ---- Fallback while mapping is in-flight ----
  if (!cardData) {
    const isBranding10 = bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding10;
    return /*#__PURE__*/React.createElement(WalletCredentialCard, {
      data: {
        id: 'loading',
        issuerName: '',
        credentialName: credName ?? 'Credential',
        branding: {
          primaryBg: isBranding10 ? ColorPalette.brand.secondaryBackground : undefined,
          secondaryBg: undefined
        },
        items: [],
        brandingType: brandingOverlayTypeString(bundleResolver.getBrandingOverlayType())
      },
      onPress: onPress,
      hasAltCredentials: hasAltCredentials,
      onChangeAlt: handleAltCredChange,
      elevated: !!proof
    });
  }
  return /*#__PURE__*/React.createElement(WalletCredentialCard, {
    data: cardData,
    onPress: onPress,
    hasAltCredentials: hasAltCredentials,
    onChangeAlt: handleAltCredChange,
    elevated: cardData.brandingType === 'Branding10' || !!proof
  });
};
export default CredentialCardGen;
//# sourceMappingURL=CredentialCardGen.js.map