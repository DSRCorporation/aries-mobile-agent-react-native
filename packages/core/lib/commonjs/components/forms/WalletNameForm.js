"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _store = require("../../contexts/reducers/store");
var _store2 = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _ButtonLoading = _interopRequireDefault(require("../animated/ButtonLoading"));
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _LimitedTextInput = _interopRequireDefault(require("../inputs/LimitedTextInput"));
var _InfoBox = require("../misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("../modals/PopupModal"));
var _ThemedText = require("../texts/ThemedText");
var _ScreenWrapper = _interopRequireDefault(require("../views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const NameWalletForm = ({
  isRenaming,
  onSubmitSuccess,
  onCancel
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    Assets,
    Spacing
  } = (0, _theme.useTheme)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [walletName, setWalletName] = (0, _react.useState)(store.preferences.walletName ?? (0, _helpers.generateRandomWalletName)());
  const [errorState, setErrorState] = (0, _react.useState)({
    visible: false,
    title: '',
    description: ''
  });
  const styles = _reactNative.StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: Spacing.md,
      justifyContent: 'space-between'
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    controlsContainer: {},
    buttonContainer: {
      width: '100%'
    }
  });
  const handleChangeText = text => {
    setWalletName(text);
  };
  const handleContinuePressed = () => {
    if (walletName.length < 1) {
      setErrorState({
        title: t('NameWallet.EmptyNameTitle'),
        description: t('NameWallet.EmptyNameDescription'),
        visible: true
      });
    } else if (walletName.length > 50) {
      setErrorState({
        title: t('NameWallet.CharCountTitle'),
        description: t('NameWallet.CharCountDescription'),
        visible: true
      });
    } else {
      setLoading(true);
      dispatch({
        type: _store.DispatchAction.UPDATE_WALLET_NAME,
        payload: [walletName]
      });
      dispatch({
        type: _store.DispatchAction.DID_NAME_WALLET
      });
      onSubmitSuccess === null || onSubmitSuccess === void 0 || onSubmitSuccess(walletName);
    }
  };
  const handleDismissError = () => {
    setErrorState(prev => ({
      ...prev,
      visible: false
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.contactBook, {
    height: 100,
    style: {
      marginVertical: Spacing.md
    }
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      width: '100%',
      marginBottom: Spacing.md
    }
  }, t('NameWallet.ThisIsTheName')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_LimitedTextInput.default, {
    defaultValue: walletName,
    label: t('NameWallet.NameYourWallet'),
    limit: 50,
    handleChangeText: handleChangeText,
    accessibilityLabel: t('NameWallet.NameYourWallet'),
    testID: (0, _testable.testIdWithKey)('NameInput')
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: isRenaming ? t('Global.Save') : t('Global.Continue'),
    buttonType: _Button.ButtonType.Primary,
    testID: isRenaming ? (0, _testable.testIdWithKey)('Save') : (0, _testable.testIdWithKey)('Continue'),
    accessibilityLabel: isRenaming ? t('Global.Save') : t('Global.Continue'),
    onPress: handleContinuePressed,
    disabled: loading
  }, loading && /*#__PURE__*/_react.default.createElement(_ButtonLoading.default, null)), isRenaming && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: Spacing.sm
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Cancel'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    onPress: onCancel
  }))))), errorState.visible && /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: handleDismissError,
    title: errorState.title,
    description: errorState.description
  }));
};
var _default = exports.default = NameWalletForm;
//# sourceMappingURL=WalletNameForm.js.map