"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _CommonRemoveModal = _interopRequireDefault(require("../components/modals/CommonRemoveModal"));
var _BaseToast = require("../components/toast/BaseToast");
var _constants = require("../constants");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _remove = require("../types/remove");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _credential = require("../utils/credential");
var _types = require("../modules/history/types");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  } = (0, _reactHooks.useAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = (0, _react.useState)(false);
  const [isCredentialsRemoveModalDisplayed, setIsCredentialsRemoveModalDisplayed] = (0, _react.useState)(false);
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  const contactImageUrl = (0, _helpers.useConnectionImageUrl)(connectionId);
  // FIXME: This should be exposed via a react hook that allows to filter credentials by connection id
  const connectionCredentials = [...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.Done)].filter(credential => credential.connectionId === (connection === null || connection === void 0 ? void 0 : connection.id));
  const {
    ColorPalette,
    Assets
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const contactImageHeight = width * CONTACT_IMG_PERCENTAGE;
  const [{
    contactDetailsOptions
  }, ContactCredentialListItem, logger, historyManagerCurried, historyEnabled, historyEventsLogger] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_CONTACT_DETAILS_CRED_LIST_ITEM, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER]);
  const styles = _reactNative.StyleSheet.create({
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
  const callOnRemove = (0, _react.useCallback)(() => {
    if (connectionCredentials !== null && connectionCredentials !== void 0 && connectionCredentials.length) {
      setIsCredentialsRemoveModalDisplayed(true);
    } else {
      setIsRemoveModalDisplayed(true);
    }
  }, [connectionCredentials]);
  const logHistoryRecord = (0, _react.useCallback)(() => {
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
      const type = _types.HistoryCardType.ConnectionRemoved;
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
  const callSubmitRemove = (0, _react.useCallback)(async () => {
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
        state: _didcomm.DidCommCredentialState.OfferReceived
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
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Success,
        text1: t('ContactDetails.ContactRemoved')
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1037'), t('Error.Message1037'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1037);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [agent, connection, navigation, t, historyEventsLogger.logConnectionRemoved, logHistoryRecord, logger]);
  const callCancelRemove = (0, _react.useCallback)(() => {
    setIsRemoveModalDisplayed(false);
  }, []);
  const callGoToCredentials = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.CredentialStack, {
      screen: _navigators.Screens.Credentials
    });
  }, [navigation]);
  const callCancelUnableToRemove = (0, _react.useCallback)(() => {
    setIsCredentialsRemoveModalDisplayed(false);
  }, []);
  const callGoToRename = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.RenameContact, {
      connectionId
    });
  }, [navigation, connectionId]);
  const callViewJSONDetails = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.JSONDetails, {
      jsonBlob: connection
    });
  }, [navigation, connection]);
  const contactLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const contactImage = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, contactImageUrl ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.contactImgContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.contactImg,
      source: (0, _credential.toImageSource)(contactImageUrl)
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.contactFirstLetterContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
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
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.contentContainer, (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableCredentialList) && {
      flex: 2
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contactContainer
  }, contactImage(), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    style: styles.contactLabel
  }, contactLabel)), (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.showConnectedTime) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginTop: 20
    }
  }, t('ContactDetails.DateOfConnection', {
    date: connection !== null && connection !== void 0 && connection.createdAt ? (0, _helpers.formatTime)(connection.createdAt, {
      includeHour: true
    }) : ''
  })), (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableCredentialList) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      borderTopColor: ColorPalette.grayscale.lightGrey,
      borderWidth: 1,
      marginTop: 20
    }
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingFour",
    style: {
      marginVertical: 16
    }
  }, t('ContactDetails.Credentials')), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: 20
      }
    }),
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: ColorPalette.grayscale.lightGrey
      }
    }, t('ContactDetails.NoCredentials')),
    data: connectionCredentials,
    renderItem: ({
      item
    }) => /*#__PURE__*/_react.default.createElement(ContactCredentialListItem, {
      credential: item,
      onPress: () => navigation.navigate(_navigators.Screens.CredentialDetails, {
        credentialId: item.id
      })
    }),
    keyExtractor: item => item.id
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, (contactDetailsOptions === null || contactDetailsOptions === void 0 ? void 0 : contactDetailsOptions.enableEditContactName) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: callGoToRename,
    accessibilityLabel: t('Screens.RenameContact'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RenameContact'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconEdit, {
    width: 20,
    height: 20,
    color: ColorPalette.brand.text
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Screens.RenameContact'))), (store === null || store === void 0 ? void 0 : store.preferences.developerModeEnabled) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: callViewJSONDetails,
    accessibilityLabel: t('Global.ViewJSON'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('JSONDetails'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconCode, {
    width: 20,
    height: 20,
    color: ColorPalette.brand.text
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Global.ViewJSON'))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: callOnRemove,
    accessibilityLabel: t('ContactDetails.RemoveContact'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RemoveFromWallet'),
    style: [styles.contentContainer, styles.actionContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconDelete, {
    width: 20,
    height: 20,
    color: ColorPalette.semantic.error
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      color: ColorPalette.semantic.error
    }
  }, t('ContactDetails.RemoveContact')))), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.ContactRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: callSubmitRemove,
    onCancel: callCancelRemove
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.ContactRemoveWithCredentials,
    visible: isCredentialsRemoveModalDisplayed,
    onSubmit: callGoToCredentials,
    onCancel: callCancelUnableToRemove
  }));
};
var _default = exports.default = ContactDetails;
//# sourceMappingURL=ContactDetails.js.map