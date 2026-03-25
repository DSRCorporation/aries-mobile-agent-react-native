import React from 'react';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { toImageSource } from '../../utils/credential';
import { testIdWithKey } from '../../utils/testable';
const logoHeight = 80;
const CredentialDetailSecondaryHeader = ({
  overlay,
  brandingOverlayType = BrandingOverlayType.Branding10
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3, _overlay$brandingOver4;
  const styles = StyleSheet.create({
    secondaryHeaderContainer: {
      height: 1.5 * logoHeight,
      backgroundColor: ((_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.backgroundImage ? 'rgba(0, 0, 0, 0)' : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.secondaryBackgroundColor) ?? 'rgba(0, 0, 0, 0.24)'
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, (_overlay$brandingOver3 = overlay.brandingOverlay) !== null && _overlay$brandingOver3 !== void 0 && _overlay$brandingOver3.backgroundImage ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: toImageSource((_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.backgroundImage),
    imageStyle: {
      resizeMode: 'cover'
    }
  }, /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialDetailsSecondaryHeader'),
    style: styles.secondaryHeaderContainer
  })) : /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialDetailsSecondaryHeader'),
    style: styles.secondaryHeaderContainer
  }, brandingOverlayType === BrandingOverlayType.Branding11 && /*#__PURE__*/React.createElement(View, {
    style: [{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.24)'
    }]
  })));
};
export default CredentialDetailSecondaryHeader;
//# sourceMappingURL=CredentialDetailSecondaryHeader.js.map