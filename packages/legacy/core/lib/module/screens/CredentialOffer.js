import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds';
import { CredentialPreviewAttribute } from '@credo-ts/core';
import { useCredentialById } from '@credo-ts/react-hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import ConnectionAlert from '../components/misc/ConnectionAlert';
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
import { TourID } from '../types/tour';
import { useAppAgent } from '../utils/agent';
import { parseCredDefFromId } from '../utils/cred-def';
import { getCredentialIdentifiers, isValidAnonCredsCredential } from '../utils/credential';
import { useCredentialConnectionLabel } from '../utils/helpers';
import { buildFieldsFromAnonCredsCredential } from '../utils/oca';
import { testIdWithKey } from '../utils/testable';
import CredentialOfferAccept from './CredentialOfferAccept';
const CredentialOffer = ({
  navigation,
  route
}) => {
  var _useOutOfBandByConnec;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialOffer route prams were not set properly');
  }
  const {
    credentialId
  } = route.params;
  const {
    agent
  } = useAppAgent();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  const {
    RecordLoading
  } = useAnimatedComponents();
  const {
    assertConnectedNetwork
  } = useNetwork();
  const [CredentialCard, bundleResolver, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried] = useServices([TOKENS.COMP_CREDENTIAL_CARD, TOKENS.UTIL_OCA_RESOLVER, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY]);
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
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId((credential === null || credential === void 0 ? void 0 : credential.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const styles = StyleSheet.create({
    headerTextContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    headerText: {
      ...TextTheme.normal,
      flexShrink: 1
    },
    footerButton: {
      paddingTop: 10
    }
  });
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialOfferTour;
    if (shouldShowTour && screenIsFocused) {
      start(TourID.CredentialOfferTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR,
        payload: [true]
      });
    }
  }, [screenIsFocused]);
  useEffect(() => {
    if (!agent) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, []);
  useEffect(() => {
    if (!credential) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, []);
  useEffect(() => {
    if (!(credential && isValidAnonCredsCredential(credential))) {
      return;
    }
    const updateCredentialPreview = async () => {
      const {
        ...formatData
      } = await (agent === null || agent === void 0 ? void 0 : agent.credentials.getFormatData(credential.id));
      const {
        offer,
        offerAttributes
      } = formatData;
      const offerData = (offer === null || offer === void 0 ? void 0 : offer.anoncreds) ?? (offer === null || offer === void 0 ? void 0 : offer.indy);
      if (offerData) {
        credential.metadata.add(AnonCredsCredentialMetadataKey, {
          schemaId: offerData.schema_id,
          credentialDefinitionId: offerData.cred_def_id
        });
      }
      if (offerAttributes) {
        credential.credentialAttributes = [...offerAttributes.map(item => new CredentialPreviewAttribute(item))];
      }
    };
    const resolvePresentationFields = async () => {
      const identifiers = getCredentialIdentifiers(credential);
      const attributes = buildFieldsFromAnonCredsCredential(credential);
      const fields = await bundleResolver.presentationFields({
        identifiers,
        attributes,
        language: i18n.language
      });
      return {
        fields
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
      fields
    }) => {
      setOverlay({
        ...overlay,
        presentationFields: fields.filter(field => field.value)
      });
      setLoading(false);
    });
  }, [credential]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const logHistoryRecord = async () => {
    try {
      if (!(agent && store.preferences.useHistoryCapability)) {
        logger.trace(`[${CredentialOffer.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      const type = HistoryCardType.CardAccepted;
      if (!credential) {
        logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const ids = getCredentialIdentifiers(credential);
      const name = parseCredDefFromId(ids.credentialDefinitionId, ids.schemaId);

      /** Save history record for card accepted */
      const recordData = {
        type: type,
        message: type,
        createdAt: credential === null || credential === void 0 ? void 0 : credential.createdAt,
        correspondenceId: credentialId,
        correspondenceName: name
      };
      await historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  };
  const handleAcceptTouched = async () => {
    try {
      if (!(agent && credential && assertConnectedNetwork())) {
        return;
      }
      setAcceptModalVisible(true);
      await agent.credentials.acceptOffer({
        credentialRecordId: credential.id
      });
      await logHistoryRecord();
    } catch (err) {
      setButtonsVisible(true);
      const error = new BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    try {
      var _navigation$getParent;
      if (agent && credential) {
        await agent.credentials.declineOffer(credential.id);
        await agent.credentials.sendProblemReport({
          credentialRecordId: credential.id,
          description: t('CredentialOffer.Declined')
        });
      }
      toggleDeclineModalVisible();
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
        screen: Screens.Home
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const header = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConnectionImage, {
      connectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(Text, null, credentialConnectionLabel || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), !loading && credential && /*#__PURE__*/React.createElement(View, {
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
        backgroundColor: ColorPallet.brand.secondaryBackground
      }
    }, loading ? /*#__PURE__*/React.createElement(RecordLoading, null) : null, credentialConnectionLabel && goalCode === 'aries.vc.issue' ? /*#__PURE__*/React.createElement(ConnectionAlert, {
      connectionID: credentialConnectionLabel
    }) : null, /*#__PURE__*/React.createElement(View, {
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