import { useCredentialById } from '@bifold/react-hooks';
import { DidCommCredentialPreviewAttribute } from '@credo-ts/didcomm';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import ConnectionImage from '../components/misc/ConnectionImage';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import Record from '../components/record/Record';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useNetwork } from '../contexts/network';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTour } from '../contexts/tour/tour-context';
import { useOutOfBandByConnectionId } from '../hooks/connections';
import { HistoryCardType } from '../modules/history/types';
import { BifoldError } from '../types/error';
import { Screens, TabStacks } from '../types/navigators';
import { ModalUsage } from '../types/remove';
import { useAppAgent } from '../utils/agent';
import { getCredentialIdentifiers, isValidAnonCredsCredential, ensureCredentialMetadata, getEffectiveCredentialName } from '../utils/credential';
import { useCredentialConnectionLabel } from '../utils/helpers';
import { buildFieldsFromAnonCredsCredential } from '../utils/oca';
import { testIdWithKey } from '../utils/testable';
import CredentialOfferAccept from './CredentialOfferAccept';
import { BaseTourID } from '../types/tour';
import { ThemedText } from '../components/texts/ThemedText';
const CredentialOffer = ({
  navigation,
  credentialId
}) => {
  var _useOutOfBandByConnec;
  const {
    agent
  } = useAppAgent();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const {
    RecordLoading
  } = useAnimatedComponents();
  const {
    assertNetworkConnected
  } = useNetwork();
  const [CredentialCard, bundleResolver, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried, historyEnabled, historyEventsLogger] = useServices([TOKENS.COMPONENT_CREDENTIAL_CARD, TOKENS.UTIL_OCA_RESOLVER, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY, TOKENS.HISTORY_ENABLED, TOKENS.HISTORY_EVENTS_LOGGER]);
  const [loading, setLoading] = useState(true);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [overlay, setOverlay] = useState({
    presentationFields: []
  });
  const credential = useCredentialById(credentialId);
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);
  const [store, dispatch] = useStore();
  const {
    start
  } = useTour();
  const screenIsFocused = useIsFocused();
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId((credential === null || credential === void 0 ? void 0 : credential.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 || (_useOutOfBandByConnec = _useOutOfBandByConnec.outOfBandInvitation) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.goalCode;
  const [ConnectionAlert] = useServices([TOKENS.COMPONENT_CONNECTION_ALERT]);
  const styles = StyleSheet.create({
    headerTextContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    headerText: {
      flexShrink: 1
    },
    footerButton: {
      paddingTop: 10
    }
  });
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialOfferTour;
    if (shouldShowTour && screenIsFocused) {
      start(BaseTourID.CredentialOfferTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenCredentialOfferTour, screenIsFocused, start, dispatch]);
  useEffect(() => {
    if (!agent || !credential) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, [agent, credential, t]);
  useEffect(() => {
    if (!(credential && isValidAnonCredsCredential(credential) && agent)) {
      return;
    }
    const updateCredentialPreview = async () => {
      const {
        ...formatData
      } = await agent.modules.didcomm.credentials.getFormatData(credential.id);
      const {
        offer,
        offerAttributes
      } = formatData;
      const offerData = (offer === null || offer === void 0 ? void 0 : offer.anoncreds) ?? (offer === null || offer === void 0 ? void 0 : offer.indy);
      if (offerData) {
        await ensureCredentialMetadata(credential, agent, {
          schema_id: offerData.schema_id,
          cred_def_id: offerData.cred_def_id
        }, logger);
      }
      if (offerAttributes) {
        credential.credentialAttributes = [...offerAttributes.map(item => new DidCommCredentialPreviewAttribute(item))];
      }
    };
    const resolvePresentationFields = async () => {
      const identifiers = getCredentialIdentifiers(credential);
      const attributes = buildFieldsFromAnonCredsCredential(credential);
      const bundle = await bundleResolver.resolveAllBundles({
        identifiers,
        attributes,
        language: i18n.language
      });
      const fields = (bundle === null || bundle === void 0 ? void 0 : bundle.presentationFields) ?? [];
      const metaOverlay = (bundle === null || bundle === void 0 ? void 0 : bundle.metaOverlay) ?? {};
      return {
        fields,
        metaOverlay
      };
    };

    /**
     * FIXME: Formatted data needs to be added to the record in Credo extensions
     * For now the order here matters. The credential preview must be updated to
     * add attributes (since these are not available in the offer).
     * Once the credential is updated the presentation fields can be correctly resolved
     */
    setLoading(true);
    updateCredentialPreview().then(() => resolvePresentationFields()).then(({
      fields,
      metaOverlay
    }) => {
      setOverlay({
        metaOverlay: metaOverlay,
        presentationFields: fields.filter(field => field.value)
      });
      setLoading(false);
    });
  }, [credential, agent, bundleResolver, i18n.language, logger]);
  const toggleDeclineModalVisible = useCallback(() => setDeclineModalVisible(prev => !prev), []);
  const logHistoryRecord = useCallback(async type => {
    try {
      var _overlay$metaOverlay;
      if (!(agent && historyEnabled)) {
        logger.trace(`[${CredentialOffer.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      if (!credential) {
        logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const name = getEffectiveCredentialName(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name);

      /** Save history record for card accepted */
      const recordData = {
        type: type,
        message: name,
        createdAt: credential === null || credential === void 0 ? void 0 : credential.createdAt,
        correspondenceId: credentialId,
        correspondenceName: credentialConnectionLabel
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, credential, credentialId, credentialConnectionLabel, overlay]);
  const handleAcceptTouched = useCallback(async () => {
    try {
      if (!(agent && credential && assertNetworkConnected())) {
        return;
      }
      setAcceptModalVisible(true);
      await agent.modules.didcomm.credentials.acceptOffer({
        credentialExchangeRecordId: credential.id
      });
      if (historyEventsLogger.logAttestationAccepted) {
        const type = HistoryCardType.CardAccepted;
        await logHistoryRecord(type);
      }
    } catch (err) {
      setButtonsVisible(true);
      const error = new BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, assertNetworkConnected, logHistoryRecord, t, historyEventsLogger.logAttestationAccepted]);
  const handleDeclineTouched = useCallback(async () => {
    try {
      var _navigation$getParent;
      if (agent && credential) {
        const connectionId = credential.connectionId ?? '';
        const connection = await agent.modules.didcomm.connections.findById(connectionId);
        await agent.modules.didcomm.credentials.declineOffer({
          credentialExchangeRecordId: credential.id
        });
        if (connection) {
          await agent.modules.didcomm.credentials.sendProblemReport({
            credentialExchangeRecordId: credential.id,
            description: t('CredentialOffer.Declined')
          });
        }
      }
      toggleDeclineModalVisible();
      if (historyEventsLogger.logAttestationRefused) {
        const type = HistoryCardType.CardDeclined;
        await logHistoryRecord(type);
      }
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
        screen: Screens.Home
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, t, toggleDeclineModalVisible, navigation, logHistoryRecord, historyEventsLogger.logAttestationRefused]);
  const header = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConnectionImage, {
      connectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(ThemedText, null, credentialConnectionLabel || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), !loading && credential && /*#__PURE__*/React.createElement(View, {
      style: {
        marginHorizontal: 15,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(CredentialCard, {
      credential: credential
    })));
  };
  const footer = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        paddingBottom: 26,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, loading ? /*#__PURE__*/React.createElement(RecordLoading, null) : null, Boolean(credentialConnectionLabel) && goalCode === 'aries.vc.issue' && /*#__PURE__*/React.createElement(ConnectionAlert, {
      connectionLabel: credentialConnectionLabel
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Accept'),
      accessibilityLabel: t('Global.Accept'),
      testID: testIdWithKey('AcceptCredentialOffer'),
      buttonType: ButtonType.Primary,
      onPress: handleAcceptTouched,
      disabled: !buttonsVisible
    })), /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Decline'),
      accessibilityLabel: t('Global.Decline'),
      testID: testIdWithKey('DeclineCredentialOffer'),
      buttonType: ButtonType.Secondary,
      onPress: toggleDeclineModalVisible,
      disabled: !buttonsVisible
    })));
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(Record, {
    fields: overlay.presentationFields || [],
    header: header,
    footer: footer
  }), /*#__PURE__*/React.createElement(CredentialOfferAccept, {
    visible: acceptModalVisible,
    credentialId: credentialId
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.CredentialOfferDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
export default CredentialOffer;
//# sourceMappingURL=CredentialOffer.js.map