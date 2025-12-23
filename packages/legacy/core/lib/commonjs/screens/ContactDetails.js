"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ContactDetails = ({
  route
}) => {
  const {
    connectionId
  } = route === null || route === void 0 ? void 0 : route.params;
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
  // FIXME: This should be exposed via a react hook that allows to filter credentials by connection id
  const connectionCredentials = [...(0, _reactHooks.useCredentialByState)(_core.CredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_core.CredentialState.Done)].filter(credential => credential.connectionId === (connection === null || connection === void 0 ? void 0 : connection.id));
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const styles = _reactNative.StyleSheet.create({
    contentContainer: {
      padding: 20,
      backgroundColor: ColorPallet.brand.secondaryBackground
    }
  });
  const handleOnRemove = () => {
    if (connectionCredentials !== null && connectionCredentials !== void 0 && connectionCredentials.length) {
      setIsCredentialsRemoveModalDisplayed(true);
    } else {
      setIsRemoveModalDisplayed(true);
    }
  };
  const handleSubmitRemove = async () => {
    try {
      if (!(agent && connection)) {
        return;
      }
      await agent.connections.deleteById(connection.id);
      navigation.navigate(_navigators.Stacks.TabStack, {
        screen: _navigators.TabStacks.HomeStack,
        params: {
          screen: _navigators.Screens.Home
        }
      });

      // FIXME: This delay is a hack so that the toast doesn't appear until the modal is dismissed
      await new Promise(resolve => setTimeout(resolve, 1000));
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Success,
        text1: t('ContactDetails.ContactRemoved')
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1037'), t('Error.Message1037'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1037);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const handleCancelRemove = () => {
    setIsRemoveModalDisplayed(false);
  };
  const handleGoToCredentials = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.CredentialStack, {
      screen: _navigators.Screens.Credentials
    });
  };
  const handleCancelUnableRemove = () => {
    setIsCredentialsRemoveModalDisplayed(false);
  };
  const handleGoToRename = () => {
    navigation.navigate(_navigators.Screens.RenameContact, {
      connectionId
    });
  };
  const callGoToRename = (0, _react.useCallback)(() => handleGoToRename(), []);
  const callOnRemove = (0, _react.useCallback)(() => handleOnRemove(), []);
  const callSubmitRemove = (0, _react.useCallback)(() => handleSubmitRemove(), []);
  const callCancelRemove = (0, _react.useCallback)(() => handleCancelRemove(), []);
  const callGoToCredentials = (0, _react.useCallback)(() => handleGoToCredentials(), []);
  const callCancelUnableToRemove = (0, _react.useCallback)(() => handleCancelUnableRemove(), []);
  const contactLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      ...TextTheme.headingThree
    }
  }, contactLabel), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      ...TextTheme.normal,
      marginTop: 20
    }
  }, t('ContactDetails.DateOfConnection', {
    date: connection !== null && connection !== void 0 && connection.createdAt ? (0, _helpers.formatTime)(connection.createdAt, {
      includeHour: true
    }) : ''
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: callGoToRename,
    accessibilityLabel: t('Screens.RenameContact'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RenameContact'),
    style: [styles.contentContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      ...TextTheme.normal
    }
  }, t('Screens.RenameContact'))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: callOnRemove,
    accessibilityLabel: t('ContactDetails.RemoveContact'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RemoveFromWallet'),
    style: [styles.contentContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      ...TextTheme.normal,
      color: ColorPallet.semantic.error
    }
  }, t('ContactDetails.RemoveContact'))), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
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