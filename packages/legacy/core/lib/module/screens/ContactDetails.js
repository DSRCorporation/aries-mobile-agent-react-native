import { CredentialState } from '@credo-ts/core';
import { useAgent, useConnectionById, useCredentialByState } from '@credo-ts/react-hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import { ToastType } from '../components/toast/BaseToast';
import { EventTypes } from '../constants';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { ModalUsage } from '../types/remove';
import { formatTime, getConnectionName } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
const ContactDetails = ({
  route
}) => {
  const {
    connectionId
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = useAgent();
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState(false);
  const [isCredentialsRemoveModalDisplayed, setIsCredentialsRemoveModalDisplayed] = useState(false);
  const connection = useConnectionById(connectionId);
  // FIXME: This should be exposed via a react hook that allows to filter credentials by connection id
  const connectionCredentials = [...useCredentialByState(CredentialState.CredentialReceived), ...useCredentialByState(CredentialState.Done)].filter(credential => credential.connectionId === (connection === null || connection === void 0 ? void 0 : connection.id));
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [store] = useStore();
  const styles = StyleSheet.create({
    contentContainer: {
      padding: 20,
      backgroundColor: ColorPallet.brand.secondaryBackground
    }
  });
  const handleOnRemove = () => {
    if (connectionCredentials !== null && connectionCredentials !== void 0 && connectionCredentials.length) {
      setIsCredentialsRemoveModalDisplayed(true);
    } else {
      setIsRemoveModalDisplayed(true);
    }
  };
  const handleSubmitRemove = async () => {
    try {
      if (!(agent && connection)) {
        return;
      }
      await agent.connections.deleteById(connection.id);
      navigation.navigate(Stacks.TabStack, {
        screen: TabStacks.HomeStack,
        params: {
          screen: Screens.Home
        }
      });

      // FIXME: This delay is a hack so that the toast doesn't appear until the modal is dismissed
      await new Promise(resolve => setTimeout(resolve, 1000));
      Toast.show({
        type: ToastType.Success,
        text1: t('ContactDetails.ContactRemoved')
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1037'), t('Error.Message1037'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1037);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const handleCancelRemove = () => {
    setIsRemoveModalDisplayed(false);
  };
  const handleGoToCredentials = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.CredentialStack, {
      screen: Screens.Credentials
    });
  };
  const handleCancelUnableRemove = () => {
    setIsCredentialsRemoveModalDisplayed(false);
  };
  const handleGoToRename = () => {
    navigation.navigate(Screens.RenameContact, {
      connectionId
    });
  };
  const callGoToRename = useCallback(() => handleGoToRename(), []);
  const callOnRemove = useCallback(() => handleOnRemove(), []);
  const callSubmitRemove = useCallback(() => handleSubmitRemove(), []);
  const callCancelRemove = useCallback(() => handleCancelRemove(), []);
  const callGoToCredentials = useCallback(() => handleGoToCredentials(), []);
  const callCancelUnableToRemove = useCallback(() => handleCancelUnableRemove(), []);
  const contactLabel = useMemo(() => getConnectionName(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      ...TextTheme.headingThree
    }
  }, contactLabel), /*#__PURE__*/React.createElement(Text, {
    style: {
      ...TextTheme.normal,
      marginTop: 20
    }
  }, t('ContactDetails.DateOfConnection', {
    date: connection !== null && connection !== void 0 && connection.createdAt ? formatTime(connection.createdAt, {
      includeHour: true
    }) : ''
  }))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: callGoToRename,
    accessibilityLabel: t('Screens.RenameContact'),
    accessibilityRole: 'button',
    testID: testIdWithKey('RenameContact'),
    style: [styles.contentContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      ...TextTheme.normal
    }
  }, t('Screens.RenameContact'))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: callOnRemove,
    accessibilityLabel: t('ContactDetails.RemoveContact'),
    accessibilityRole: 'button',
    testID: testIdWithKey('RemoveFromWallet'),
    style: [styles.contentContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      ...TextTheme.normal,
      color: ColorPallet.semantic.error
    }
  }, t('ContactDetails.RemoveContact'))), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.ContactRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: callSubmitRemove,
    onCancel: callCancelRemove
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.ContactRemoveWithCredentials,
    visible: isCredentialsRemoveModalDisplayed,
    onSubmit: callGoToCredentials,
    onCancel: callCancelUnableToRemove
  }));
};
export default ContactDetails;
//# sourceMappingURL=ContactDetails.js.map