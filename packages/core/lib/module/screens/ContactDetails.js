import { useAgent, useConnectionById, useCredentialByState } from '@bifold/react-hooks';
import { DidCommCredentialState } from '@credo-ts/didcomm';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import { ToastType } from '../components/toast/BaseToast';
import { EventTypes } from '../constants';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens, TabStacks } from '../types/navigators';
import { ModalUsage } from '../types/remove';
import { formatTime, getConnectionName, useConnectionImageUrl } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
import { toImageSource } from '../utils/credential';
import { HistoryCardType } from '../modules/history/types';
import { ThemedText } from '../components/texts/ThemedText';
const CONTACT_IMG_PERCENTAGE = 0.12;
const ContactDetails = ({
  route
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ContactDetails route params were not set properly');
  }
  const {
    connectionId
  } = route.params;
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
  const contactImageUrl = useConnectionImageUrl(connectionId);
  // FIXME: This should be exposed via a react hook that allows to filter credentials by connection id
  const connectionCredentials = [...useCredentialByState(DidCommCredentialState.CredentialReceived), ...useCredentialByState(DidCommCredentialState.Done)].filter(credential => credential.connectionId === (connection === null || connection === void 0 ? void 0 : connection.id));
  const {
    ColorPalette,
    Assets
  } = useTheme();
  const [store] = useStore();
  const {
    width
  } = useWindowDimensions();
  const contactImageHeight = width * CONTACT_IMG_PERCENTAGE;
  const [{
    contactDetailsOptions
  }, ContactCredentialListItem, logger, historyManagerCurried, historyEnabled, historyEventsLogger] = useServices([TOKENS.CONFIG, TOKENS.COMPONENT_CONTACT_DETAILS_CRED_LIST_ITEM, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY, TOKENS.HISTORY_ENABLED, TOKENS.HISTORY_EVENTS_LOGGER]);
  const styles = StyleSheet.create({
    contentContainer: {
      padding: 20,
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    contactContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      gap: 8
    },
    contactImgContainer: {
      top: contactImageHeight * CONTACT_IMG_PERCENTAGE,
      alignSelf: 'flex-start',
      width: contactImageHeight,
      height: contactImageHeight,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    contactImg: {
      borderRadius: 8,
      width: contactImageHeight,
      height: contactImageHeight
    },
    contactFirstLetterContainer: {
      flex: 1,
      maxWidth: contactImageHeight
    },
    contactLabel: {
      flex: 2,
      flexShrink: 1,
      alignSelf: 'flex-start'
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    }
  });
  const callOnRemove = useCallback(() => {
    if (connectionCredentials !== null && connectionCredentials !== void 0 && connectionCredentials.length) {
      setIsCredentialsRemoveModalDisplayed(true);
    } else {
      setIsRemoveModalDisplayed(true);
    }
  }, [connectionCredentials]);
  const logHistoryRecord = useCallback(() => {
    try {
      if (!(agent && historyEnabled)) {
        logger.trace(`[${ContactDetails.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      if (!connection) {
        logger.error(`[${ContactDetails.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const type = HistoryCardType.ConnectionRemoved;
      /** Save history record for contact removed */
      const recordData = {
        type: type,
        message: type,
        createdAt: new Date(),
        correspondenceId: connection.id,
        correspondenceName: connection.theirLabel
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${ContactDetails.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, connection]);
  const callSubmitRemove = useCallback(async () => {
    try {
      if (!(agent && connection)) {
        return;
      }
      if (historyEventsLogger.logConnectionRemoved) {
        logHistoryRecord();
      }
      const basicMessages = await agent.modules.didcomm.basicMessages.findAllByQuery({
        connectionId: connection.id
      });
      const proofs = await agent.modules.didcomm.proofs.findAllByQuery({
        connectionId: connection.id
      });
      const offers = await agent.modules.didcomm.credentials.findAllByQuery({
        connectionId: connection.id,
        state: DidCommCredentialState.OfferReceived
      });
      logger.info(`Removing connection ${connection.id}, ${basicMessages.length} messages, ${proofs.length} proofs, and ${offers.length} offers`);
      const results = await Promise.allSettled([...proofs.map(proof => agent.modules.didcomm.proofs.deleteById(proof.id)), ...offers.map(offer => agent.modules.didcomm.credentials.deleteById(offer.id)), ...basicMessages.map(msg => agent.modules.didcomm.basicMessages.deleteById(msg.id)), agent.modules.didcomm.connections.deleteById(connection.id)]);
      const failed = results.filter(result => result.status === 'rejected');
      if (failed.length) {
        logger.error(`Cleanup failed: ${failed.length} operation(s) were rejected.`);
      }
      navigation.popToTop();

      // FIXME: This delay is a hack so that the toast doesn't
      // appear until the modal is dismissed
      await new Promise(resolve => setTimeout(resolve, 1000));
      Toast.show({
        type: ToastType.Success,
        text1: t('ContactDetails.ContactRemoved')
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1037'), t('Error.Message1037'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1037);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [agent, connection, navigation, t, historyEventsLogger.logConnectionRemoved, logHistoryRecord, logger]);
  const callCancelRemove = useCallback(() => {
    setIsRemoveModalDisplayed(false);
  }, []);
  const callGoToCredentials = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.CredentialStack, {
      screen: Screens.Credentials
    });
  }, [navigation]);
  const callCancelUnableToRemove = useCallback(() => {
    setIsCredentialsRemoveModalDisplayed(false);
  }, []);
  const callGoToRename = useCallback(() => {
    navigation.navigate(Screens.RenameContact, {
      connectionId
    });
  }, [navigation, connectionId]);
  const callViewJSONDetails = useCallback(() => {
    navigation.navigate(Screens.JSONDetails, {
      jsonBlob: connection
    });
  }, [navigation, connection]);
  const contactLabel = useMemo(() => getConnectionName(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const contactImage = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, contactImageUrl ? /*#__PURE__*/React.createElement(View, {
      style: styles.contactImgContainer
    }, /*#__PURE__*/React.createElement(Image, {
      style: styles.contactImg,
      source: toImageSource(contactImageUrl)
    })) : /*#__PURE__*/React.createElement(View, {
      style: styles.contactFirstLetterContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      allowFontScaling: false,
      variant: "bold",
      accessible: false,
      style: {
        fontSize: contactImageHeight,
        lineHeight: contactImageHeight,
        alignSelf: 'center',
        color: ColorPalette.brand.primary
      }
    }, contactLabel.charAt(0).toUpperCase())));
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.contentContainer, (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableCredentialList) && {
      flex: 2
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contactContainer
  }, contactImage(), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    style: styles.contactLabel
  }, contactLabel)), (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.showConnectedTime) && /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      marginTop: 20
    }
  }, t('ContactDetails.DateOfConnection', {
    date: connection !== null && connection !== void 0 && connection.createdAt ? formatTime(connection.createdAt, {
      includeHour: true
    }) : ''
  })), (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableCredentialList) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: {
      borderTopColor: ColorPalette.grayscale.lightGrey,
      borderWidth: 1,
      marginTop: 20
    }
  }), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingFour",
    style: {
      marginVertical: 16
    }
  }, t('ContactDetails.Credentials')), /*#__PURE__*/React.createElement(FlatList, {
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: {
        height: 20
      }
    }),
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: ColorPalette.grayscale.lightGrey
      }
    }, t('ContactDetails.NoCredentials')),
    data: connectionCredentials,
    renderItem: ({
      item
    }) => /*#__PURE__*/React.createElement(ContactCredentialListItem, {
      credential: item,
      onPress: () => navigation.navigate(Screens.CredentialDetails, {
        credentialId: item.id
      })
    }),
    keyExtractor: item => item.id
  }))), /*#__PURE__*/React.createElement(View, null, (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableEditContactName) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: callGoToRename,
    accessibilityLabel: t('Screens.RenameContact'),
    accessibilityRole: 'button',
    testID: testIdWithKey('RenameContact'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Assets.svg.iconEdit, {
    width: 20,
    height: 20,
    color: ColorPalette.brand.text
  }), /*#__PURE__*/React.createElement(ThemedText, null, t('Screens.RenameContact'))), (store === null || store === void 0 ? void 0 : store.preferences.developerModeEnabled) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: callViewJSONDetails,
    accessibilityLabel: t('Global.ViewJSON'),
    accessibilityRole: 'button',
    testID: testIdWithKey('JSONDetails'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Assets.svg.iconCode, {
    width: 20,
    height: 20,
    color: ColorPalette.brand.text
  }), /*#__PURE__*/React.createElement(ThemedText, null, t('Global.ViewJSON'))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: callOnRemove,
    accessibilityLabel: t('ContactDetails.RemoveContact'),
    accessibilityRole: 'button',
    testID: testIdWithKey('RemoveFromWallet'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Assets.svg.iconDelete, {
    width: 20,
    height: 20,
    color: ColorPalette.semantic.error
  }), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      color: ColorPalette.semantic.error
    }
  }, t('ContactDetails.RemoveContact')))), /*#__PURE__*/React.createElement(CommonRemoveModal, {
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