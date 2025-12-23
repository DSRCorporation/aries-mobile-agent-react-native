import { useAgent } from '@credo-ts/react-hooks';
import { BrandingOverlayType } from '@hyperledger/aries-oca/build/legacy';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, Image, ImageBackground, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CardWatermark from '../components/misc/CardWatermark';
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
import { ModalUsage } from '../types/remove';
import { credentialTextColor, getCredentialIdentifiers, isValidAnonCredsCredential, toImageSource } from '../utils/credential';
import { formatTime, useCredentialConnectionLabel } from '../utils/helpers';
import { buildFieldsFromAnonCredsCredential } from '../utils/oca';
import { testIdWithKey } from '../utils/testable';
const paddingHorizontal = 24;
const paddingVertical = 16;
const logoHeight = 80;
const CredentialDetails = ({
  navigation,
  route
}) => {
  var _metadata$get, _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3, _overlay$brandingOver4;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialDetails route prams were not set properly');
  }
  const {
    credential
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = useAgent();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  const [CredentialCard, bundleResolver] = useServices([TOKENS.COMP_CREDENTIAL_CARD, TOKENS.UTIL_OCA_RESOLVER]);
  const [isRevoked, setIsRevoked] = useState(false);
  const [revocationDate, setRevocationDate] = useState('');
  const [preciseRevocationDate, setPreciseRevocationDate] = useState('');
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = useState(false);
  const [isRevokedMessageHidden, setIsRevokedMessageHidden] = useState(((_metadata$get = credential.metadata.get(CredentialMetadata.customMetadata)) === null || _metadata$get === void 0 ? void 0 : _metadata$get.revoked_detail_dismissed) ?? false);
  const [overlay, setOverlay] = useState({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);
  const {
    width,
    height
  } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor,
      display: 'flex'
    },
    secondaryHeaderContainer: {
      height: 1.5 * logoHeight,
      backgroundColor: ((_overlay$brandingOver2 = overlay.brandingOverlay) !== null && _overlay$brandingOver2 !== void 0 && _overlay$brandingOver2.backgroundImage ? 'rgba(0, 0, 0, 0)' : (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.secondaryBackgroundColor) ?? 'rgba(0, 0, 0, 0.24)'
    },
    primaryHeaderContainer: {
      paddingHorizontal,
      paddingVertical
    },
    statusContainer: {},
    logoContainer: {
      top: -0.5 * logoHeight,
      left: paddingHorizontal,
      marginBottom: -1 * logoHeight,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.3
    },
    textContainer: {
      color: credentialTextColor(ColorPallet, (_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.primaryBackgroundColor)
    }
  });
  useEffect(() => {
    if (!agent || !credential) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
    }
  }, []);
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
      var _bundle$presentationF;
      setOverlay({
        ...overlay,
        ...bundle,
        presentationFields: (_bundle$presentationF = bundle.presentationFields) === null || _bundle$presentationF === void 0 ? void 0 : _bundle$presentationF.filter(field => field.value)
      });
    });
  }, [credential]);
  useEffect(() => {
    if (credential !== null && credential !== void 0 && credential.revocationNotification) {
      const meta = credential.metadata.get(CredentialMetadata.customMetadata);
      credential.metadata.set(CredentialMetadata.customMetadata, {
        ...meta,
        revoked_seen: true
      });
      agent === null || agent === void 0 || agent.credentials.update(credential);
    }
  }, [isRevoked]);
  const handleOnRemove = () => {
    setIsRemoveModalDisplayed(true);
  };
  const handleSubmitRemove = async () => {
    try {
      if (!(agent && credential)) {
        return;
      }
      await agent.credentials.deleteById(credential.id);
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
  };
  const handleCancelRemove = () => {
    setIsRemoveModalDisplayed(false);
  };
  const handleDismissRevokedMessage = () => {
    setIsRevokedMessageHidden(true);
    const meta = credential.metadata.get(CredentialMetadata.customMetadata);
    credential.metadata.set(CredentialMetadata.customMetadata, {
      ...meta,
      revoked_detail_dismissed: true
    });
    agent === null || agent === void 0 || agent.credentials.update(credential);
  };
  const callOnRemove = useCallback(() => handleOnRemove(), []);
  const callSubmitRemove = useCallback(() => handleSubmitRemove(), []);
  const callCancelRemove = useCallback(() => handleCancelRemove(), []);
  const callDismissRevokedMessage = useCallback(() => handleDismissRevokedMessage(), []);
  const CredentialCardLogo = () => {
    var _overlay$brandingOver5, _overlay$brandingOver6, _ref, _overlay$metaOverlay, _overlay$metaOverlay2;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.logoContainer
    }, (_overlay$brandingOver5 = overlay.brandingOverlay) !== null && _overlay$brandingOver5 !== void 0 && _overlay$brandingOver5.logo ? /*#__PURE__*/React.createElement(Image, {
      source: toImageSource((_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.logo),
      style: {
        resizeMode: 'cover',
        width: logoHeight,
        height: logoHeight,
        borderRadius: 8
      }
    }) : /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.title, {
        fontSize: 0.5 * logoHeight,
        color: '#000'
      }]
    }, (_ref = ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) ?? ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) ?? 'C') === null || _ref === void 0 ? void 0 : _ref.charAt(0).toUpperCase()));
  };
  const CredentialDetailPrimaryHeader = () => {
    var _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialDetailsPrimaryHeader'),
      style: [styles.primaryHeaderContainer, {
        zIndex: -1
      }]
    }, /*#__PURE__*/React.createElement(View, null, ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
      width: width,
      height: height,
      watermark: (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark
    }), /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('CredentialIssuer'),
      style: [TextTheme.label, styles.textContainer, {
        paddingLeft: logoHeight + paddingVertical,
        paddingBottom: paddingVertical,
        lineHeight: 19,
        opacity: 0.8
      }],
      numberOfLines: 1
    }, (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.issuer), /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('CredentialName'),
      style: [TextTheme.normal, styles.textContainer, {
        lineHeight: 24
      }]
    }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.name)));
  };
  const CredentialDetailSecondaryHeader = () => {
    var _overlay$brandingOver7, _overlay$brandingOver8;
    return /*#__PURE__*/React.createElement(React.Fragment, null, (_overlay$brandingOver7 = overlay.brandingOverlay) !== null && _overlay$brandingOver7 !== void 0 && _overlay$brandingOver7.backgroundImage ? /*#__PURE__*/React.createElement(ImageBackground, {
      source: toImageSource((_overlay$brandingOver8 = overlay.brandingOverlay) === null || _overlay$brandingOver8 === void 0 ? void 0 : _overlay$brandingOver8.backgroundImage),
      imageStyle: {
        resizeMode: 'cover'
      }
    }, /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialDetailsSecondaryHeader'),
      style: styles.secondaryHeaderContainer
    })) : /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialDetailsSecondaryHeader'),
      style: styles.secondaryHeaderContainer
    }));
  };
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
    }, /*#__PURE__*/React.createElement(CredentialDetailSecondaryHeader, null), /*#__PURE__*/React.createElement(CredentialCardLogo, null), /*#__PURE__*/React.createElement(CredentialDetailPrimaryHeader, null), isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/React.createElement(View, {
      style: {
        padding: paddingVertical,
        paddingTop: 0
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
    }, credentialConnectionLabel ? /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPallet.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('IssuerName')
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.title, isRevoked && {
        color: ColorPallet.grayscale.mediumGrey
      }]
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, isRevoked && {
        color: ColorPallet.grayscale.mediumGrey
      }]
    }, credentialConnectionLabel))) : null, isRevoked ? /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: ColorPallet.notification.error,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('RevokedDate')
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.title, {
        color: ColorPallet.notification.errorText
      }]
    }, t('CredentialDetails.Revoked') + ': '), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.notification.errorText
      }]
    }, preciseRevocationDate)), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.notification.errorText,
        marginTop: paddingVertical
      }],
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