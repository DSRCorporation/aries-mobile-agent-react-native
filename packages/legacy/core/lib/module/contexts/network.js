import { NetInfoStateType, useNetInfo } from '@react-native-community/netinfo';
import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import NetInfoModal from '../components/modals/NetInfoModal';
import { fetchLedgerNodes, canConnectToLedgerNode } from '../utils/ledger';
export const NetworkContext = /*#__PURE__*/createContext(null);
export const NetworkProvider = ({
  children
}) => {
  const netInfo = useNetInfo();
  const [isNetInfoModalDisplayed, setIsNetInfoModalDisplayed] = useState(false);
  const displayNetInfoModal = () => {
    setIsNetInfoModalDisplayed(true);
  };
  const hideNetInfoModal = () => {
    setIsNetInfoModalDisplayed(false);
  };
  const silentAssertConnectedNetwork = () => {
    return netInfo.isConnected || netInfo.type !== NetInfoStateType.none;
  };
  const assertConnectedNetwork = () => {
    const isConnected = silentAssertConnectedNetwork();
    if (!isConnected) {
      displayNetInfoModal();
    }
    return isConnected;
  };
  const assertLedgerConnectivity = async () => {
    const nodes = fetchLedgerNodes();
    if (typeof nodes === 'undefined' || nodes.length === 0) {
      return false;
    }
    const connections = await Promise.all(nodes.map(n => canConnectToLedgerNode(n)));
    return connections.includes(true);
  };
  return /*#__PURE__*/React.createElement(NetworkContext.Provider, {
    value: {
      silentAssertConnectedNetwork,
      assertConnectedNetwork,
      displayNetInfoModal,
      hideNetInfoModal,
      assertLedgerConnectivity
    }
  }, children, /*#__PURE__*/React.createElement(NetInfoModal, {
    visible: isNetInfoModalDisplayed,
    onSubmit: () => hideNetInfoModal()
  }));
};
export const useNetwork = () => useContext(NetworkContext);
//# sourceMappingURL=network.js.map