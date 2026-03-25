function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { ModalUsage } from '../../types/remove';
import { testIdForAccessabilityLabel, testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
import BulletPoint from '../inputs/BulletPoint';
import ContentGradient from '../misc/ContentGradient';
import UnorderedList from '../misc/UnorderedList';
import { ThemedText } from '../texts/ThemedText';
import SafeAreaModal from './SafeAreaModal';
const Dropdown = ({
  title,
  content
}) => {
  const {
    TextTheme,
    ColorPalette
  } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setIsCollapsed(!isCollapsed),
    accessibilityLabel: title,
    testID: testIdWithKey(testIdForAccessabilityLabel(title)),
    style: [{
      padding: 15,
      backgroundColor: ColorPalette.brand.modalSecondaryBackground,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }]
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalNormal",
    style: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }, title), /*#__PURE__*/React.createElement(Icon, {
    name: isCollapsed ? 'expand-more' : 'expand-less',
    size: 24,
    color: TextTheme.modalNormal.color
  })), /*#__PURE__*/React.createElement(Collapsible, {
    collapsed: isCollapsed,
    enablePointerEvents: true
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 10,
      borderLeftWidth: 2,
      borderLeftColor: ColorPalette.brand.modalSecondaryBackground
    }
  }, /*#__PURE__*/React.createElement(UnorderedList, {
    unorderedListItems: content
  }))));
};
const CommonRemoveModal = ({
  usage,
  visible,
  onSubmit,
  onCancel,
  extraDetails
}) => {
  if (!usage) {
    throw new Error('usage cannot be undefined');
  }
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme,
    Assets
  } = useTheme();
  const imageDisplayOptions = {
    height: 115,
    width: 115
  };
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      flex: 1
    },
    container: {
      paddingTop: 10,
      paddingHorizontal: 20
    },
    controlsContainer: {
      marginTop: 'auto',
      marginHorizontal: 20,
      marginBottom: 10,
      position: 'relative'
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingTop: 65
    },
    headerView: {
      alignItems: 'flex-end',
      height: 55,
      paddingTop: 10,
      paddingRight: 20
    },
    bodyText: {
      ...TextTheme.modalNormal
    },
    declineBodyText: {
      marginTop: 25
    }
  });
  const titleForConfirmButton = () => {
    switch (usage) {
      case ModalUsage.ContactRemove:
        return t('ContactDetails.RemoveContact');
      case ModalUsage.ContactRemoveWithCredentials:
        return t('ContactDetails.GoToCredentials');
      case ModalUsage.CredentialRemove:
        return t('CredentialDetails.RemoveFromWallet');
      default:
        return t('Global.Decline');
    }
  };
  const labelForConfirmButton = () => {
    switch (usage) {
      case ModalUsage.ContactRemove:
        return t('ContactDetails.RemoveContact');
      case ModalUsage.ContactRemoveWithCredentials:
        return t('ContactDetails.GoToCredentials');
      case ModalUsage.CredentialRemove:
        return t('CredentialDetails.RemoveCredential');
      default:
        return t('Global.Decline');
    }
  };
  const testIdForConfirmButton = () => {
    switch (usage) {
      case ModalUsage.ContactRemove:
      case ModalUsage.CredentialRemove:
        return testIdWithKey('ConfirmRemoveButton');
      case ModalUsage.ContactRemoveWithCredentials:
        return testIdWithKey('GoToCredentialsButton');
      case ModalUsage.CredentialOfferDecline:
      case ModalUsage.ProofRequestDecline:
        return testIdWithKey('ConfirmDeclineButton');
      default:
        return testIdWithKey('ConfirmButton');
    }
  };
  const testIdForCancelButton = () => {
    switch (usage) {
      case ModalUsage.ContactRemove:
      case ModalUsage.CredentialRemove:
        return testIdWithKey('CancelRemoveButton');
      case ModalUsage.ContactRemoveWithCredentials:
        return testIdWithKey('AbortGoToCredentialsButton');
      case ModalUsage.CredentialOfferDecline:
      case ModalUsage.ProofRequestDecline:
        return testIdWithKey('CancelDeclineButton');
      default:
        return testIdWithKey('CancelButton');
    }
  };
  const headerImageForType = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        justifyContent: 'center'
      }
    }, usage === ModalUsage.CredentialOfferDecline && /*#__PURE__*/React.createElement(Assets.svg.proofRequestDeclined, imageDisplayOptions), usage === ModalUsage.ProofRequestDecline && /*#__PURE__*/React.createElement(Assets.svg.credentialDeclined, imageDisplayOptions), usage === ModalUsage.CustomNotificationDecline && /*#__PURE__*/React.createElement(Assets.svg.deleteNotification, _extends({
      style: {
        marginBottom: 15
      }
    }, imageDisplayOptions)));
  };
  const contentForType = () => {
    switch (usage) {
      case ModalUsage.ContactRemove:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle"
        }, t('ContactDetails.RemoveTitle'))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal",
          style: {
            marginBottom: 24
          }
        }, t('ContactDetails.RemoveContactMessageWarning')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('ContactDetails.RemoveContactMessageTop')), /*#__PURE__*/React.createElement(BulletPoint, {
          text: t('ContactDetails.RemoveContactsBulletPoint1'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(BulletPoint, {
          text: t('ContactDetails.RemoveContactsBulletPoint2'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(BulletPoint, {
          text: t('ContactDetails.RemoveContactsBulletPoint3'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(BulletPoint, {
          text: t('ContactDetails.RemoveContactsBulletPoint4'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal",
          style: {
            marginTop: 24
          }
        }, t('ContactDetails.RemoveContactMessageBottom'))));
      case ModalUsage.CredentialRemove:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle"
        }, t('CredentialDetails.RemoveTitle'))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('CredentialDetails.RemoveCaption'))), /*#__PURE__*/React.createElement(View, {
          style: {
            marginTop: 25
          }
        }, /*#__PURE__*/React.createElement(Dropdown, {
          title: t('CredentialDetails.YouWillNotLose'),
          content: [t('CredentialDetails.YouWillNotLoseListItem1'), t('CredentialDetails.YouWillNotLoseListItem2')]
        })), /*#__PURE__*/React.createElement(View, {
          style: {
            marginTop: 25
          }
        }, /*#__PURE__*/React.createElement(Dropdown, {
          title: t('CredentialDetails.HowToGetThisCredentialBack'),
          content: [t('CredentialDetails.HowToGetThisCredentialBackListItem1')]
        })));
      case ModalUsage.ContactRemoveWithCredentials:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle"
        }, t('ContactDetails.UnableToRemoveTitle'))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('ContactDetails.UnableToRemoveCaption'))));
      case ModalUsage.CredentialOfferDecline:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle",
          style: {
            marginTop: 15
          }
        }, t('CredentialOffer.DeclineTitle')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal",
          style: {
            marginVertical: 30
          }
        }, extraDetails ? t('CredentialOffer.DeclineParagraph1WithIssuerName', {
          issuer: extraDetails
        }) : t('CredentialOffer.DeclineParagraph1')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('CredentialOffer.DeclineParagraph2')));
      case ModalUsage.ProofRequestDecline:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle"
        }, t('ProofRequest.DeclineTitle')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal",
          style: {
            marginTop: 30
          }
        }, t('ProofRequest.DeclineBulletPoint1')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('ProofRequest.DeclineBulletPoint2')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('ProofRequest.DeclineBulletPoint3')));
      case ModalUsage.CustomNotificationDecline:
        return /*#__PURE__*/React.createElement(View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalTitle"
        }, t('CredentialOffer.CustomOfferTitle')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal",
          style: {
            marginTop: 30
          }
        }, t('CredentialOffer.CustomOfferParagraph1')), /*#__PURE__*/React.createElement(ThemedText, {
          variant: "modalNormal"
        }, t('CredentialOffer.CustomOfferParagraph2')));
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement(SafeAreaModal, {
    transparent: true,
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.overlay
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    edges: ['left', 'right', 'bottom'],
    style: styles.safeAreaView
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerView
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: t('Global.Close'),
    accessibilityRole: 'button',
    testID: testIdWithKey('Close'),
    onPress: () => onCancel && onCancel(),
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'close',
    size: 42,
    color: ColorPalette.brand.modalIcon
  }))), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(React.Fragment, null, headerImageForType(), contentForType())), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(ContentGradient, {
    backgroundColor: ColorPalette.brand.modalPrimaryBackground,
    height: 30
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: titleForConfirmButton(),
    accessibilityLabel: labelForConfirmButton(),
    testID: testIdForConfirmButton(),
    onPress: onSubmit,
    buttonType: usage === ModalUsage.ContactRemoveWithCredentials ? ButtonType.ModalPrimary : ButtonType.ModalCritical
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    testID: testIdForCancelButton(),
    onPress: onCancel,
    buttonType: ButtonType.ModalSecondary
  }))))));
};
export default CommonRemoveModal;
//# sourceMappingURL=CommonRemoveModal.js.map