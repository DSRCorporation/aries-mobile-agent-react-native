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
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var DeliveryStatus = /*#__PURE__*/function (DeliveryStatus) {
  DeliveryStatus[DeliveryStatus["Pending"] = 0] = "Pending";
  DeliveryStatus[DeliveryStatus["Completed"] = 1] = "Completed";
  DeliveryStatus[DeliveryStatus["Declined"] = 2] = "Declined";
  return DeliveryStatus;
}(DeliveryStatus || {});
const CredentialOfferAccept = ({
  visible,
  credentialId
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [shouldShowDelayMessage, setShouldShowDelayMessage] = (0, _react.useState)(false);
  const [credentialDeliveryStatus, setCredentialDeliveryStatus] = (0, _react.useState)(DeliveryStatus.Pending);
  const [timerDidFire, setTimerDidFire] = (0, _react.useState)(false);
  const [timer, setTimer] = (0, _react.useState)();
  const credential = (0, _reactHooks.useCredentialById)(credentialId);
  const navigation = (0, _native.useNavigation)();
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const {
    CredentialAdded,
    CredentialPending
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [{
    connectionTimerDelay
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const styles = _reactNative.StyleSheet.create({
    container: {
      ...ListItems.credentialOfferBackground,
      height: '100%',
      padding: 20
    },
    image: {
      marginTop: 20
    },
    messageContainer: {
      alignItems: 'center'
    },
    messageText: {
      textAlign: 'center',
      marginTop: 30
    },
    controlsContainer: {
      marginTop: 'auto',
      margin: 20
    },
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!credential) {
    throw new Error('Unable to fetch credential from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const onDoneTouched = () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  (0, _react.useEffect)(() => {
    if (credential.state === _core.CredentialState.CredentialReceived || credential.state === _core.CredentialState.Done) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
    }
  }, [credential]);
  (0, _react.useEffect)(() => {
    if (timerDidFire || credentialDeliveryStatus !== DeliveryStatus.Pending || !visible) {
      return;
    }
    const timer = setTimeout(() => {
      setShouldShowDelayMessage(true);
      setTimerDidFire(true);
    }, connTimerDelay);
    setTimer(timer);
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible]);
  (0, _react.useEffect)(() => {
    if (shouldShowDelayMessage && credentialDeliveryStatus !== DeliveryStatus.Completed) {
      _reactNative.AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
    }
  }, [shouldShowDelayMessage]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      ...ListItems.credentialOfferBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: (0, _testable.testIdWithKey)('CredentialOnTheWay')
  }, t('CredentialOffer.CredentialOnTheWay')), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: (0, _testable.testIdWithKey)('CredentialAddedToYourWallet')
  }, t('CredentialOffer.CredentialAddedToYourWallet'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(CredentialAdded, null), credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(CredentialPending, null)), shouldShowDelayMessage && credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [ListItems.credentialOfferDetails, styles.delayMessageText],
    testID: (0, _testable.testIdWithKey)('TakingTooLong')
  }, t('Connection.TakingTooLong'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: (0, _testable.testIdWithKey)('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  })), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: (0, _testable.testIdWithKey)('Done'),
    onPress: onDoneTouched,
    buttonType: _Button.ButtonType.ModalPrimary
  })))));
};
var _default = exports.default = CredentialOfferAccept;
//# sourceMappingURL=CredentialOfferAccept.js.map