import React from 'react';
import { View } from 'react-native';
import { Header } from '@react-navigation/stack';
import { useServices, TOKENS } from '../../container-api';
const HeaderWithBanner = props => {
  const [NotificationBanner] = useServices([TOKENS.COMPONENT_NOTIFICATION_BANNER]);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Header, props), /*#__PURE__*/React.createElement(NotificationBanner, null));
};
export default HeaderWithBanner;
//# sourceMappingURL=HeaderWithBanner.js.map