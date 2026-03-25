import React from 'react';
import { Modal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const SafeAreaModal = ({
  children,
  ...modalProps
}) => {
  return /*#__PURE__*/React.createElement(Modal, modalProps, /*#__PURE__*/React.createElement(SafeAreaProvider, null, children));
};
export default SafeAreaModal;
//# sourceMappingURL=SafeAreaModal.js.map