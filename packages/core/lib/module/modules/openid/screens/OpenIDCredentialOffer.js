import { useAgent } from '@bifold/react-hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import Button, { ButtonType } from '../../../components/buttons/Button';
import CommonRemoveModal from '../../../components/modals/CommonRemoveModal';
import Record from '../../../components/record/Record';
import { EventTypes } from '../../../constants';
import { useTheme } from '../../../contexts/theme';
import { TOKENS, useServices } from '../../../container-api';
import ScreenLayout from '../../../layout/ScreenLayout';
import CredentialOfferAccept from '../../../screens/CredentialOfferAccept';
import { BifoldError } from '../../../types/error';
import { Screens, TabStacks } from '../../../types/navigators';
import { ModalUsage } from '../../../types/remove';
import { testIdWithKey } from '../../../utils/testable';
import OpenIDCredentialCard from '../components/OpenIDCredentialCard';
import { useOpenIDCredentials } from '../context/OpenIDCredentialRecordProvider';
import { getCredentialForDisplay } from '../display';
import { NotificationEventType, useOpenId4VciNotifications } from '../notification';
import { temporaryMetaVanillaObject } from '../metadata';
import { useAcceptReplacement } from '../hooks/useAcceptReplacement';
import { useDeclineReplacement } from '../hooks/useDeclineReplacement';
import uuid from 'react-native-uuid';
const OpenIDCredentialOffer = ({
  navigation,
  route
}) => {
  // FIXME: change params to accept credential id to avoid 'non-serializable' warnings
  const {
    credential
  } = route.params;
  const [logger] = useServices([TOKENS.UTIL_LOGGER]);
  const credentialDisplay = getCredentialForDisplay(credential);
  const {
    display
  } = credentialDisplay;

  // console.log('$$ ====> Credential Display', JSON.stringify(credentialDisplay))
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const {
    agent
  } = useAgent();
  const {
    resolveBundleForCredential
  } = useOpenIDCredentials();
  const {
    sendOpenId4VciNotification
  } = useOpenId4VciNotifications();
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const {
    acceptNewCredential
  } = useAcceptReplacement();
  const {
    declineByNewId
  } = useDeclineReplacement({
    logger: logger
  });
  const [overlay, setOverlay] = useState({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  useEffect(() => {
    if (!credential) {
      return;
    }
    const resolveOverlay = async () => {
      const brandingOverlay = await resolveBundleForCredential(credential);
      setOverlay(brandingOverlay);
    };
    resolveOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credential]);
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
  const toggleDeclineModalVisible = () => setIsRemoveModalDisplayed(!isRemoveModalDisplayed);
  const handleDeclineTouched = async () => {
    var _navigation$getParent;
    await handleSendNotification(NotificationEventType.CREDENTIAL_DELETED);
    await declineByNewId(credential.id);
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const handleSendNotification = async notificationEventType => {
    try {
      var _temporaryMetaVanilla, _temporaryMetaVanilla2;
      if ((_temporaryMetaVanilla = temporaryMetaVanillaObject.notificationMetadata) !== null && _temporaryMetaVanilla !== void 0 && _temporaryMetaVanilla.credentialIssuer.notification_endpoint && (_temporaryMetaVanilla2 = temporaryMetaVanillaObject.tokenResponse) !== null && _temporaryMetaVanilla2 !== void 0 && _temporaryMetaVanilla2.accessToken) {
        var _temporaryMetaVanilla3, _temporaryMetaVanilla4, _temporaryMetaVanilla5, _temporaryMetaVanilla6;
        await sendOpenId4VciNotification({
          accessToken: (_temporaryMetaVanilla3 = temporaryMetaVanillaObject.tokenResponse) === null || _temporaryMetaVanilla3 === void 0 ? void 0 : _temporaryMetaVanilla3.accessToken,
          notificationEvent: notificationEventType,
          notificationId: uuid.v4().toString(),
          notificationMetadata: {
            originalDraftVersion: 'V1',
            credentialIssuer: (_temporaryMetaVanilla4 = temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla4 === void 0 ? void 0 : _temporaryMetaVanilla4.credentialIssuer,
            authorizationServers: (_temporaryMetaVanilla5 = temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla5 === void 0 ? void 0 : _temporaryMetaVanilla5.authorizationServers,
            knownCredentialConfigurations: (_temporaryMetaVanilla6 = temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla6 === void 0 ? void 0 : _temporaryMetaVanilla6.knownCredentialConfigurations
          }
        });
      }
    } catch {
      logger.error('[Credential Offer] error sending notification');
    }
  };
  const handleAcceptTouched = async () => {
    if (!agent) {
      return;
    }
    try {
      await acceptNewCredential(credential);
      await handleSendNotification(NotificationEventType.CREDENTIAL_ACCEPTED);
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const footerButton = (title, buttonPress, buttonType, testID, accessibilityLabel) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: title,
      accessibilityLabel: accessibilityLabel,
      testID: testID,
      buttonType: buttonType,
      onPress: buttonPress,
      disabled: !buttonsVisible
    }));
  };
  const renderOpenIdCard = () => {
    if (!credentialDisplay || !credential) return null;
    return /*#__PURE__*/React.createElement(OpenIDCredentialCard, {
      credentialDisplay: credentialDisplay,
      credentialRecord: credential
    });
  };
  const header = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(Text, null, display.issuer.name || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), credential && /*#__PURE__*/React.createElement(View, {
      style: {
        marginHorizontal: 15,
        marginBottom: 16
      }
    }, renderOpenIdCard()));
  };
  const footer = () => {
    const paddingHorizontal = 24;
    const paddingVertical = 16;
    const paddingBottom = 26;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        marginBottom: 50
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        paddingBottom: paddingBottom,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, footerButton(t('Global.Accept'), handleAcceptTouched, ButtonType.Primary, testIdWithKey('AcceptCredentialOffer'), t('Global.Accept')), footerButton(t('Global.Decline'), toggleDeclineModalVisible, ButtonType.Secondary, testIdWithKey('DeclineCredentialOffer'), t('Global.Decline'))));
  };
  return /*#__PURE__*/React.createElement(ScreenLayout, {
    screen: Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/React.createElement(Record, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/React.createElement(CredentialOfferAccept, {
    visible: acceptModalVisible,
    credentialId: '',
    confirmationOnly: true
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.CredentialOfferDecline,
    visible: isRemoveModalDisplayed,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible,
    extraDetails: display.issuer.name
  }));
};
export default OpenIDCredentialOffer;
//# sourceMappingURL=OpenIDCredentialOffer.js.map