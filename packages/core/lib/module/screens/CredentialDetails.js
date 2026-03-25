import { useAgent } from '@bifold/react-hooks';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useStore } from '../contexts/store';
import InfoBox, { InfoBoxType } from '../components/misc/InfoBox';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import Record from '../components/record/Record';
import RecordRemove from '../components/record/RecordRemove';
import { ToastType } from '../components/toast/BaseToast';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { CredentialMetadata } from '../types/metadata';
import { Screens, Stacks } from '../types/navigators';
import { ModalUsage } from '../types/remove';
import { credentialTextColor, getCredentialIdentifiers, isValidAnonCredsCredential, getEffectiveCredentialName, ensureCredentialMetadata } from '../utils/credential';
import { formatTime, useCredentialConnectionLabel } from '../utils/helpers';
import { buildFieldsFromAnonCredsCredential } from '../utils/oca';
import { testIdWithKey } from '../utils/testable';
import { HistoryCardType } from '../modules/history/types';
import CredentialCardLogo from '../components/views/CredentialCardLogo';
import CredentialDetailPrimaryHeader from '../components/views/CredentialDetailPrimaryHeader';
import CredentialDetailSecondaryHeader from '../components/views/CredentialDetailSecondaryHeader';
import { ThemedText } from '../components/texts/ThemedText';
import CardWatermark from '../components/misc/CardWatermark';
const paddingHorizontal = 24;
const paddingVertical = 16;
const CredentialDetails = ({
  navigation,
  route
}) => {
  var _modules, _credential$metadata$, _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialDetails route params were not set properly');
  }
  const {
    credentialId
  } = route.params;
  const {
    width,
    height
  } = useWindowDimensions();
  const [credential, setCredential] = useState(undefined);
  const {
    agent
  } = useAgent();
  const didcommCredentials = (agent === null || agent === void 0 || (_modules = agent.modules) === null || _modules === void 0 || (_modules = _modules.didcomm) === null || _modules === void 0 ? void 0 : _modules.credentials) ?? (agent === null || agent === void 0 ? void 0 : agent.credentials);
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ColorPalette,
    Assets
  } = useTheme();
  const [bundleResolver, logger, historyManagerCurried, historyEnabled, historyEventsLogger, CredentialCard] = useServices([TOKENS.UTIL_OCA_RESOLVER, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY, TOKENS.HISTORY_ENABLED, TOKENS.HISTORY_EVENTS_LOGGER, TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const [isRevoked, setIsRevoked] = useState(false);
  const [revocationDate, setRevocationDate] = useState('');
  const [preciseRevocationDate, setPreciseRevocationDate] = useState('');
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState(false);
  const [isRevokedMessageHidden, setIsRevokedMessageHidden] = useState((credential === null || credential === void 0 || (_credential$metadata$ = credential.metadata.get(CredentialMetadata.customMetadata)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.revoked_detail_dismissed) ?? false);
  const [store] = useStore();
  useEffect(() => {
    var _credential$metadata$2;
    setIsRevokedMessageHidden((credential === null || credential === void 0 || (_credential$metadata$2 = credential.metadata.get(CredentialMetadata.customMetadata)) === null || _credential$metadata$2 === void 0 ? void 0 : _credential$metadata$2.revoked_detail_dismissed) ?? false);
  }, [credential === null || credential === void 0 ? void 0 : credential.metadata]);
  useEffect(() => {
    // fetch credential for ID
    const fetchCredential = async () => {
      try {
        var _didcommCredentials$g;
        const credentialExchangeRecord = await (didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$g = didcommCredentials.getById) === null || _didcommCredentials$g === void 0 ? void 0 : _didcommCredentials$g.call(didcommCredentials, credentialId));
        if (!credentialExchangeRecord) {
          throw new Error('Credential record not found');
        }
        setCredential(credentialExchangeRecord);
      } catch {
        // credential not found for id, display an error
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
      }
    };
    fetchCredential();
  }, [credentialId, didcommCredentials, t]);
  const [overlay, setOverlay] = useState({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);
  const isBranding10 = bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding10;
  const isBranding11 = bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding11;
  const containerBackgroundColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isBranding10 ? (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.primaryBackgroundColor : containerBackgroundColor,
      display: 'flex'
    }
  });
  const icon = {
    color: credentialTextColor(ColorPalette, containerBackgroundColor),
    width: 48,
    height: 48
  };
  const navigateToContactDetails = () => {
    if (credential !== null && credential !== void 0 && credential.connectionId) {
      navigation.navigate(Stacks.ContactStack, {
        screen: Screens.ContactDetails,
        params: {
          connectionId: credential.connectionId
        }
      });
    }
  };
  const callViewJSONDetails = useCallback(() => {
    navigation.navigate(Stacks.ContactStack, {
      screen: Screens.JSONDetails,
      params: {
        jsonBlob: credential
      }
    });
  }, [navigation, credential]);
  useEffect(() => {
    if (!agent) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
    }
  }, [agent, t]);
  useEffect(() => {
    var _credential$revocatio;
    if (!(credential && isValidAnonCredsCredential(credential))) {
      return;
    }
    credential.revocationNotification == undefined ? setIsRevoked(false) : setIsRevoked(true);
    if (credential !== null && credential !== void 0 && (_credential$revocatio = credential.revocationNotification) !== null && _credential$revocatio !== void 0 && _credential$revocatio.revocationDate) {
      const date = new Date(credential.revocationNotification.revocationDate);
      setRevocationDate(formatTime(date, {
        shortMonth: true
      }));
      setPreciseRevocationDate(formatTime(date, {
        includeHour: true
      }));
    }
    const params = {
      identifiers: getCredentialIdentifiers(credential),
      meta: {
        alias: credentialConnectionLabel,
        credConnectionId: credential.connectionId
      },
      attributes: buildFieldsFromAnonCredsCredential(credential),
      language: i18n.language
    };
    bundleResolver.resolveAllBundles(params).then(bundle => {
      setOverlay(o => {
        var _bundle$presentationF, _bundle$metaOverlay;
        return {
          ...o,
          ...bundle,
          presentationFields: (_bundle$presentationF = bundle.presentationFields) === null || _bundle$presentationF === void 0 ? void 0 : _bundle$presentationF.filter(field => field.value),
          // Apply effective name
          metaOverlay: {
            ...bundle.metaOverlay,
            name: getEffectiveCredentialName(credential, (_bundle$metaOverlay = bundle.metaOverlay) === null || _bundle$metaOverlay === void 0 ? void 0 : _bundle$metaOverlay.name)
          }
        };
      });
    });
  }, [credential, credentialConnectionLabel, bundleResolver, i18n.language]);

  // Ensure credential has all required metadata
  useEffect(() => {
    if (!credential || !isValidAnonCredsCredential(credential) || !agent) {
      return;
    }
    const restoreMetadata = async () => {
      try {
        await ensureCredentialMetadata(credential, agent, undefined, logger);
      } catch (error) {
        // If metadata restoration fails, we'll fall back to default credential name
        logger === null || logger === void 0 || logger.warn('Failed to restore credential metadata', {
          error: error
        });
      }
    };
    restoreMetadata();
  }, [credential, agent, logger]);
  useEffect(() => {
    if (credential !== null && credential !== void 0 && credential.revocationNotification) {
      var _didcommCredentials$u;
      const meta = credential.metadata.get(CredentialMetadata.customMetadata);
      credential.metadata.set(CredentialMetadata.customMetadata, {
        ...meta,
        revoked_seen: true
      });
      didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$u = didcommCredentials.update) === null || _didcommCredentials$u === void 0 || _didcommCredentials$u.call(didcommCredentials, credential);
    }
  }, [credential, didcommCredentials]);
  const callOnRemove = useCallback(() => {
    setIsRemoveModalDisplayed(true);
  }, []);
  const logHistoryRecord = useCallback(async () => {
    try {
      var _overlay$metaOverlay;
      if (!(agent && historyEnabled)) {
        logger.trace(`[${CredentialDetails.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      if (!credential) {
        logger.error(`[${CredentialDetails.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      const name = getEffectiveCredentialName(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name);

      /** Save history record for credential removed */
      const recordData = {
        type: HistoryCardType.CardRemoved,
        message: name,
        createdAt: new Date(),
        correspondenceId: credentialId,
        correspondenceName: credentialConnectionLabel
      };
      await historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialDetails.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, credential, credentialConnectionLabel, credentialId, overlay]);
  const callSubmitRemove = useCallback(async () => {
    try {
      if (!(agent && credential)) {
        return;
      }
      if (historyEventsLogger.logAttestationRemoved) {
        await logHistoryRecord();
      }
      await agent.modules.credentials.deleteById(credential.id);
      navigation.pop();

      // FIXME: This delay is a hack so that the toast doesn't appear until the modal is dismissed
      await new Promise(resolve => setTimeout(resolve, 1000));
      Toast.show({
        type: ToastType.Success,
        text1: t('CredentialDetails.CredentialRemoved')
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1032'), t('Error.Message1032'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1032);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, navigation, t, historyEventsLogger.logAttestationRemoved, logHistoryRecord]);
  const callCancelRemove = useCallback(() => {
    setIsRemoveModalDisplayed(false);
  }, []);
  const callDismissRevokedMessage = useCallback(() => {
    setIsRevokedMessageHidden(true);
    if (credential) {
      var _didcommCredentials$u2;
      const meta = credential.metadata.get(CredentialMetadata.customMetadata);
      credential.metadata.set(CredentialMetadata.customMetadata, {
        ...meta,
        revoked_detail_dismissed: true
      });
      didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$u2 = didcommCredentials.update) === null || _didcommCredentials$u2 === void 0 || _didcommCredentials$u2.call(didcommCredentials, credential);
    }
  }, [credential, didcommCredentials]);
  const CredentialRevocationMessage = ({
    credential
  }) => {
    var _credential$revocatio2;
    return /*#__PURE__*/React.createElement(InfoBox, {
      notificationType: InfoBoxType.Error,
      title: t('CredentialDetails.CredentialRevokedMessageTitle') + ' ' + revocationDate,
      description: credential !== null && credential !== void 0 && (_credential$revocatio2 = credential.revocationNotification) !== null && _credential$revocatio2 !== void 0 && _credential$revocatio2.comment ? credential.revocationNotification.comment : t('CredentialDetails.CredentialRevokedMessageBody'),
      onCallToActionLabel: t('Global.Dismiss'),
      onCallToActionPressed: callDismissRevokedMessage
    });
  };
  const getCredentialTop = () => {
    var _overlay$metaOverlay2, _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
    if (isBranding10) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CredentialDetailSecondaryHeader, {
        overlay: overlay
      }), /*#__PURE__*/React.createElement(CredentialCardLogo, {
        overlay: overlay
      }), /*#__PURE__*/React.createElement(CredentialDetailPrimaryHeader, {
        overlay: overlay,
        credential: credential
      }));
    }
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(CredentialDetailSecondaryHeader, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType()
    }), /*#__PURE__*/React.createElement(TouchableOpacity, {
      accessibilityLabel: `${(_overlay$metaOverlay2 = overlay.metaOverlay) !== null && _overlay$metaOverlay2 !== void 0 && _overlay$metaOverlay2.watermark ? overlay.metaOverlay.watermark + '. ' : ''}${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer}`,
      accessibilityRole: "button",
      accessibilityHint: t('CredentialDetails.NavigateToIssuerDetailsHint'),
      onPress: navigateToContactDetails,
      style: {
        padding: 16,
        overflow: 'hidden'
      }
    }, ((_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
      width: width,
      height: height,
      watermark: (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.watermark
    }), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 2
      }
    }, /*#__PURE__*/React.createElement(CredentialCardLogo, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType()
    }), /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: credentialTextColor(ColorPalette, containerBackgroundColor),
        flexWrap: 'wrap',
        maxWidth: '90%'
      }
    }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.issuer)), /*#__PURE__*/React.createElement(Assets.svg.iconChevronRight, icon))), /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, /*#__PURE__*/React.createElement(CredentialDetailPrimaryHeader, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType(),
      credential: credential
    })));
  };
  const header = () => {
    return bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding01 ? /*#__PURE__*/React.createElement(View, null, isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/React.createElement(View, {
      style: {
        padding: paddingVertical,
        paddingBottom: 0
      }
    }, credential && /*#__PURE__*/React.createElement(CredentialRevocationMessage, {
      credential: credential
    })) : null, credential && /*#__PURE__*/React.createElement(CredentialCard, {
      credential: credential,
      style: {
        margin: 16
      }
    })) : /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, getCredentialTop(), isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/React.createElement(View, {
      style: {
        padding: paddingVertical,
        backgroundColor: ColorPalette.brand.secondaryBackground,
        ...(isBranding11 && {
          paddingTop: 0
        })
      }
    }, credential && /*#__PURE__*/React.createElement(CredentialRevocationMessage, {
      credential: credential
    })) : null);
  };
  const footer = () => {
    var _credential$revocatio3;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        marginBottom: 50
      }
    }, credentialConnectionLabel && isBranding10 ? /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      testID: testIdWithKey('IssuerName')
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title",
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/React.createElement(ThemedText, {
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, credentialConnectionLabel)), store !== null && store !== void 0 && store.preferences.developerModeEnabled && credential !== null && credential !== void 0 && credential.createdAt ? /*#__PURE__*/React.createElement(ThemedText, {
      testID: testIdWithKey('IssuedDate')
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title",
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, t('CredentialDetails.Issued') + ': '), /*#__PURE__*/React.createElement(ThemedText, {
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, formatTime(credential.createdAt, {
      format: 'YYYY-MM-DD HH:mm:ss [UTC]'
    }))) : null) : null, (store === null || store === void 0 ? void 0 : store.preferences.developerModeEnabled) && /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: callViewJSONDetails,
      accessibilityLabel: t('Global.ViewJSON'),
      accessibilityRole: 'button',
      testID: testIdWithKey('JSONDetails'),
      style: {
        flexDirection: 'row',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Assets.svg.iconCode, {
      width: 20,
      height: 20,
      color: ColorPalette.brand.secondary
    }), /*#__PURE__*/React.createElement(ThemedText, null, t('Global.ViewJSON')))), isRevoked ? /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPalette.notification.error,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      testID: testIdWithKey('RevokedDate')
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title",
      style: {
        color: ColorPalette.notification.errorText
      }
    }, t('CredentialDetails.Revoked') + ': '), /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: ColorPalette.notification.errorText
      }
    }, preciseRevocationDate)), /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: ColorPalette.notification.errorText,
        marginTop: paddingVertical
      },
      testID: testIdWithKey('RevocationMessage')
    }, credential !== null && credential !== void 0 && (_credential$revocatio3 = credential.revocationNotification) !== null && _credential$revocatio3 !== void 0 && _credential$revocatio3.comment ? credential.revocationNotification.comment : t('CredentialDetails.CredentialRevokedMessageBody'))) : null, /*#__PURE__*/React.createElement(RecordRemove, {
      onRemove: callOnRemove
    }));
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, /*#__PURE__*/React.createElement(Record, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.CredentialRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: callSubmitRemove,
    onCancel: callCancelRemove
  }));
};
export default CredentialDetails;
//# sourceMappingURL=CredentialDetails.js.map