import React from 'react';
import { Image, View } from 'react-native';
import { ThemedText } from '../texts/ThemedText';
import { testIdWithKey } from '../../utils/testable';
import { toImageSource } from '../../utils/credential';
const LogoOrLetter = ({
  containerStyle,
  logo,
  logoHeight,
  elevated,
  letter,
  letterVariant,
  letterStyle,
  letterColor = '#000',
  imageBorderRadius = 8,
  imageStyle,
  showTestIds = true
}) => {
  const normalizedLetter = ((letter === null || letter === void 0 ? void 0 : letter.charAt(0)) ?? '').toUpperCase();
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, {
      elevation: elevated ? 5 : 0
    }]
  }, logo ? /*#__PURE__*/React.createElement(Image, {
    source: toImageSource(logo),
    style: [{
      resizeMode: 'cover',
      width: logoHeight,
      height: logoHeight,
      borderRadius: imageBorderRadius
    }, imageStyle],
    testID: showTestIds ? testIdWithKey('Logo') : undefined
  }) : /*#__PURE__*/React.createElement(ThemedText, {
    variant: letterVariant,
    style: [{
      fontSize: 0.5 * logoHeight,
      alignSelf: 'center',
      color: letterColor
    }, letterStyle],
    testID: showTestIds ? testIdWithKey('NoLogoText') : undefined,
    accessible: false
  }, normalizedLetter));
};
export default LogoOrLetter;
//# sourceMappingURL=LogoOrLetter.js.map