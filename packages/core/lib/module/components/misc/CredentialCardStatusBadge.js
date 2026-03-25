import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { testIdWithKey } from '../../utils/testable';
const CredentialCardStatusBadge = ({
  status,
  logoHeight,
  containerStyle,
  errorBg = '#FDECEA',
  warnBg = '#FFF8E1'
}) => {
  return /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCardStatus'),
    style: [containerStyle, {
      position: 'absolute',
      right: 0,
      top: 0
    }]
  }, status ? /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, {
      backgroundColor: status === 'error' ? errorBg : warnBg
    }]
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 0.7 * logoHeight,
    name: status
  })) : /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }));
};
export default CredentialCardStatusBadge;
//# sourceMappingURL=CredentialCardStatusBadge.js.map