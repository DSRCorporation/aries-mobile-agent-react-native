import React, { useEffect, useState } from 'react';
import { Screens } from '../../../types/navigators';
import { getCredentialForDisplay } from '../display';
import CommonRemoveModal from '../../../components/modals/CommonRemoveModal';
import { ModalUsage } from '../../../types/remove';
import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { testIdWithKey } from '../../../utils/testable';
import { useTheme } from '../../../contexts/theme';
import { BifoldError } from '../../../types/error';
import { EventTypes } from '../../../constants';
import { useAgent } from '@bifold/react-hooks';
import RecordRemove from '../../../components/record/RecordRemove';
import { useOpenIDCredentials } from '../context/OpenIDCredentialRecordProvider';
import { OpenIDCredentialType } from '../types';
import { TOKENS, useServices } from '../../../container-api';
import Record from '../../../components/record/Record';
import { buildOverlayFromW3cCredential } from '../../../utils/oca';
import CredentialDetailSecondaryHeader from '../../../components/views/CredentialDetailSecondaryHeader';
import CredentialCardLogo from '../../../components/views/CredentialCardLogo';
import CredentialDetailPrimaryHeader from '../../../components/views/CredentialDetailPrimaryHeader';
import ScreenLayout from '../../../layout/ScreenLayout';
import OpenIDCredentialCard from '../components/OpenIDCredentialCard';
export let OpenIDCredScreenMode = /*#__PURE__*/function (OpenIDCredScreenMode) {
  OpenIDCredScreenMode[OpenIDCredScreenMode["offer"] = 0] = "offer";
  OpenIDCredScreenMode[OpenIDCredScreenMode["details"] = 1] = "details";
  return OpenIDCredScreenMode;
}({});
const paddingHorizontal = 24;
const paddingVertical = 16;
const OpenIDCredentialDetails = ({
  navigation,
  route
}) => {
  var _overlay$brandingOver;
  const {
    credentialId,
    type
  } = route.params;
  const [credential, setCredential] = useState(undefined);
  const [credentialDisplay, setCredentialDisplay] = useState();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const {
    agent
  } = useAgent();
  const {
    removeCredential,
    getW3CCredentialById,
    getSdJwtCredentialById
  } = useOpenIDCredentials();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState(false);
  const [credentialRemoved, setCredentialRemoved] = useState(false);
  const [overlay, setOverlay] = useState({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const styles = StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor,
      display: 'flex'
    },
    cardContainer: {
      paddingHorizontal: 10,
      paddingVertical: 30
    }
  });
  useEffect(() => {
    if (!agent) return;
    const fetchCredential = async () => {
      if (credentialRemoved) return;
      try {
        let record;
        if (type === OpenIDCredentialType.SdJwtVc) {
          record = await getSdJwtCredentialById(credentialId);
        } else {
          record = await getW3CCredentialById(credentialId);
        }
        setCredential(record);
      } catch {
        // credential not found for id, display an error
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1035));
      }
    };
    fetchCredential();
  }, [credentialId, type, getSdJwtCredentialById, getW3CCredentialById, agent, t, credentialRemoved]);
  useEffect(() => {
    if (!credential) return;
    try {
      const credDisplay = getCredentialForDisplay(credential);
      setCredentialDisplay(credDisplay);
    } catch {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1034));
    }
  }, [credential, t]);
  useEffect(() => {
    if (!credentialDisplay || !bundleResolver || !i18n || !credentialDisplay.display) {
      return;
    }
    const resolveOverlay = async () => {
      const resolvedOverlay = await buildOverlayFromW3cCredential({
        credentialDisplay,
        language: i18n.language,
        resolver: bundleResolver
      });
      setOverlay(resolvedOverlay);
    };
    resolveOverlay();
  }, [credentialDisplay, bundleResolver, i18n]);
  const toggleDeclineModalVisible = () => {
    if (credentialRemoved) {
      return;
    }
    setIsRemoveModalDisplayed(!isRemoveModalDisplayed);
  };
  const handleDeclineTouched = async () => {
    setCredentialRemoved(true);
    setIsRemoveModalDisplayed(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    handleRemove();
  };
  const handleRemove = async () => {
    if (!credential) return;
    try {
      await removeCredential(credential, type);
      navigation.pop();
    } catch (err) {
      const error = new BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };

  //To be used only in specific cases where consistency with anoncreds needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const legacyHeader = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(CredentialDetailSecondaryHeader, {
      overlay: overlay
    }), /*#__PURE__*/React.createElement(CredentialCardLogo, {
      overlay: overlay
    }), /*#__PURE__*/React.createElement(CredentialDetailPrimaryHeader, {
      overlay: overlay
    }));
  };
  const renderOpenIdCard = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/React.createElement(OpenIDCredentialCard, {
      credentialDisplay: credentialDisplay,
      credentialRecord: credential
    });
  };
  const header = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.cardContainer
    }, renderOpenIdCard());
  };
  const footer = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        marginBottom: 50
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('IssuerName')
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.title]
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal]
    }, credentialDisplay.display.issuer.name || t('ContactDetails.AContact')))), /*#__PURE__*/React.createElement(RecordRemove, {
      onRemove: toggleDeclineModalVisible
    }));
  };
  return /*#__PURE__*/React.createElement(ScreenLayout, {
    screen: Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/React.createElement(Record, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.CredentialRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
export default OpenIDCredentialDetails;
//# sourceMappingURL=OpenIDCredentialDetails.js.map