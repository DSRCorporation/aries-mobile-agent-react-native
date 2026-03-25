import React from 'react';
import { View, ImageBackground } from 'react-native';
import { testIdWithKey } from '../../utils/testable';
const CredentialCardSecondaryBody = ({
  hideSlice,
  secondaryBg,
  backgroundSliceUri,
  borderRadius,
  containerStyle
}) => {
  if (hideSlice) {
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardSecondaryBody'),
      style: [containerStyle, {
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }]
    });
  }
  const bg = secondaryBg ?? (containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.backgroundColor) ?? 'transparent';
  return /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCardSecondaryBody'),
    style: [containerStyle, {
      backgroundColor: bg,
      overflow: 'hidden'
    }]
  }, backgroundSliceUri ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: {
      uri: backgroundSliceUri
    },
    style: {
      flexGrow: 1
    },
    imageStyle: {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    }
  }) : null);
};
export default CredentialCardSecondaryBody;
//# sourceMappingURL=CredentialCardSecondaryBody.js.map