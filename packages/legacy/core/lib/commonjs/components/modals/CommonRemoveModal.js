"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeCollapsible = _interopRequireDefault(require("react-native-collapsible"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _remove = require("../../types/remove");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _BulletPoint = _interopRequireDefault(require("../inputs/BulletPoint"));
var _ContentGradient = _interopRequireDefault(require("../misc/ContentGradient"));
var _UnorderedList = _interopRequireDefault(require("../misc/UnorderedList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Dropdown = ({
  title,
  content
}) => {
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const [isCollapsed, setIsCollapsed] = (0, _react.useState)(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    onPress: () => setIsCollapsed(!isCollapsed),
    accessibilityLabel: title,
    testID: (0, _testable.testIdWithKey)((0, _testable.testIdForAccessabilityLabel)(title)),
    style: [{
      padding: 15,
      backgroundColor: ColorPallet.brand.modalSecondaryBackground,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [TextTheme.modalNormal, {
      fontWeight: TextTheme.bold.fontWeight
    }]
  }, title), /*#__PURE__*/React.createElement(_MaterialIcons.default, {
    name: isCollapsed ? 'expand-more' : 'expand-less',
    size: 24,
    color: TextTheme.modalNormal.color
  })), /*#__PURE__*/React.createElement(_reactNativeCollapsible.default, {
    collapsed: isCollapsed,
    enablePointerEvents: true
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      marginTop: 10,
      borderLeftWidth: 2,
      borderLeftColor: ColorPallet.brand.modalSecondaryBackground
    }
  }, /*#__PURE__*/React.createElement(_UnorderedList.default, {
    unorderedListItems: content
  }))));
};
const CommonRemoveModal = ({
  usage,
  visible,
  onSubmit,
  onCancel
}) => {
  if (!usage) {
    throw new Error('usage cannot be undefined');
  }
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const imageDisplayOptions = {
    height: 115,
    width: 115
  };
  const styles = _reactNative.StyleSheet.create({
    safeAreaView: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },
    container: {
      height: '100%',
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
      ...TextTheme.modalNormal,
      marginTop: 25
    }
  });
  const titleForConfirmButton = () => {
    switch (usage) {
      case _remove.ModalUsage.ContactRemove:
        return t('ContactDetails.RemoveContact');
      case _remove.ModalUsage.ContactRemoveWithCredentials:
        return t('ContactDetails.GoToCredentials');
      case _remove.ModalUsage.CredentialRemove:
        return t('CredentialDetails.RemoveFromWallet');
      default:
        return t('Global.Decline');
    }
  };
  const labelForConfirmButton = () => {
    switch (usage) {
      case _remove.ModalUsage.ContactRemove:
        return t('ContactDetails.RemoveContact');
      case _remove.ModalUsage.ContactRemoveWithCredentials:
        return t('ContactDetails.GoToCredentials');
      case _remove.ModalUsage.CredentialRemove:
        return t('CredentialDetails.RemoveCredential');
      default:
        return t('Global.Decline');
    }
  };
  const testIdForConfirmButton = () => {
    switch (usage) {
      case _remove.ModalUsage.ContactRemove:
      case _remove.ModalUsage.CredentialRemove:
        return (0, _testable.testIdWithKey)('ConfirmRemoveButton');
      case _remove.ModalUsage.ContactRemoveWithCredentials:
        return (0, _testable.testIdWithKey)('GoToCredentialsButton');
      case _remove.ModalUsage.CredentialOfferDecline:
      case _remove.ModalUsage.ProofRequestDecline:
        return (0, _testable.testIdWithKey)('ConfirmDeclineButton');
      default:
        return (0, _testable.testIdWithKey)('ConfirmButton');
    }
  };
  const testIdForCancelButton = () => {
    switch (usage) {
      case _remove.ModalUsage.ContactRemove:
      case _remove.ModalUsage.CredentialRemove:
        return (0, _testable.testIdWithKey)('CancelRemoveButton');
      case _remove.ModalUsage.ContactRemoveWithCredentials:
        return (0, _testable.testIdWithKey)('AbortGoToCredentialsButton');
      case _remove.ModalUsage.CredentialOfferDecline:
      case _remove.ModalUsage.ProofRequestDecline:
        return (0, _testable.testIdWithKey)('CancelDeclineButton');
      default:
        return (0, _testable.testIdWithKey)('CancelButton');
    }
  };
  const headerImageForType = () => {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        justifyContent: 'center'
      }
    }, usage === _remove.ModalUsage.CredentialOfferDecline && /*#__PURE__*/React.createElement(Assets.svg.proofRequestDeclined, imageDisplayOptions), usage === _remove.ModalUsage.ProofRequestDecline && /*#__PURE__*/React.createElement(Assets.svg.credentialDeclined, imageDisplayOptions), usage === _remove.ModalUsage.CustomNotificationDecline && /*#__PURE__*/React.createElement(Assets.svg.deleteNotification, _extends({
      style: {
        marginBottom: 15
      }
    }, imageDisplayOptions)));
  };
  const contentForType = () => {
    switch (usage) {
      case _remove.ModalUsage.ContactRemove:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('ContactDetails.RemoveTitle'))), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.bodyText
        }, t('ContactDetails.RemoveContactMessageTop')), /*#__PURE__*/React.createElement(_BulletPoint.default, {
          text: t('ContactDetails.RemoveContactsBulletPoint1'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(_BulletPoint.default, {
          text: t('ContactDetails.RemoveContactsBulletPoint2'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(_BulletPoint.default, {
          text: t('ContactDetails.RemoveContactsBulletPoint3'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(_BulletPoint.default, {
          text: t('ContactDetails.RemoveContactsBulletPoint4'),
          textStyle: styles.bodyText
        }), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.bodyText, {
            marginTop: 10
          }]
        }, t('ContactDetails.RemoveContactMessageBottom'))));
      case _remove.ModalUsage.CredentialRemove:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('CredentialDetails.RemoveTitle'))), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalNormal
        }, t('CredentialDetails.RemoveCaption'))), /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginTop: 25
          }
        }, /*#__PURE__*/React.createElement(Dropdown, {
          title: t('CredentialDetails.YouWillNotLose'),
          content: [t('CredentialDetails.YouWillNotLoseListItem1'), t('CredentialDetails.YouWillNotLoseListItem2')]
        })), /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginTop: 25
          }
        }, /*#__PURE__*/React.createElement(Dropdown, {
          title: t('CredentialDetails.HowToGetThisCredentialBack'),
          content: [t('CredentialDetails.HowToGetThisCredentialBackListItem1')]
        })));
      case _remove.ModalUsage.ContactRemoveWithCredentials:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('ContactDetails.UnableToRemoveTitle'))), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.bodyText
        }, t('ContactDetails.UnableToRemoveCaption'))));
      case _remove.ModalUsage.CredentialOfferDecline:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('CredentialOffer.DeclineTitle')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.declineBodyText, {
            marginTop: 30
          }]
        }, t('CredentialOffer.DeclineParagraph1')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.declineBodyText
        }, t('CredentialOffer.DeclineParagraph2')));
      case _remove.ModalUsage.ProofRequestDecline:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('ProofRequest.DeclineTitle')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.declineBodyText, {
            marginTop: 30
          }]
        }, t('ProofRequest.DeclineBulletPoint1')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.declineBodyText
        }, t('ProofRequest.DeclineBulletPoint2')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.declineBodyText
        }, t('ProofRequest.DeclineBulletPoint3')));
      case _remove.ModalUsage.CustomNotificationDecline:
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            marginBottom: 25
          }
        }, /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: TextTheme.modalTitle
        }, t('CredentialOffer.CustomOfferTitle')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.declineBodyText, {
            marginTop: 30
          }]
        }, t('CredentialOffer.CustomOfferParagraph1')), /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: styles.declineBodyText
        }, t('CredentialOffer.CustomOfferParagraph2')));
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.Modal, {
    transparent: true,
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.overlay
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right', 'bottom'],
    style: styles.safeAreaView
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.headerView
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Global.Close'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Close'),
    onPress: () => onCancel && onCancel(),
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/React.createElement(_MaterialIcons.default, {
    name: 'close',
    size: 42,
    color: ColorPallet.brand.modalIcon
  }))), /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(React.Fragment, null, headerImageForType(), contentForType())), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(_ContentGradient.default, {
    backgroundColor: ColorPallet.brand.modalPrimaryBackground,
    height: 30
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(_Button.default, {
    title: titleForConfirmButton(),
    accessibilityLabel: labelForConfirmButton(),
    testID: testIdForConfirmButton(),
    onPress: onSubmit,
    buttonType: usage === _remove.ModalUsage.ContactRemoveWithCredentials ? _Button.ButtonType.ModalPrimary : _Button.ButtonType.ModalCritical
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(_Button.default, {
    title: t('Global.Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    testID: testIdForCancelButton(),
    onPress: onCancel,
    buttonType: _Button.ButtonType.ModalSecondary
  }))))));
};
var _default = exports.default = CommonRemoveModal;
//# sourceMappingURL=CommonRemoveModal.js.map