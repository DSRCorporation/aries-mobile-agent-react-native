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
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _SafeAreaModal = _interopRequireDefault(require("../components/modals/SafeAreaModal"));
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _ThemedText = require("../components/texts/ThemedText");
var _credential = require("../utils/credential");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
var DeliveryStatus = /*#__PURE__*/function (DeliveryStatus) {
  DeliveryStatus[DeliveryStatus["Pending"] = 0] = "Pending";
  DeliveryStatus[DeliveryStatus["Completed"] = 1] = "Completed";
  DeliveryStatus[DeliveryStatus["Declined"] = 2] = "Declined";
  return DeliveryStatus;
}(DeliveryStatus || {});
const CredentialOfferAccept = ({
  visible,
  credentialId,
  confirmationOnly
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
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
  }, logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const styles = _reactNative.StyleSheet.create({
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
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!credential && !confirmationOnly) {
    throw new Error('Unable to fetch credential from Credo');
  }
  const onBackToHomeTouched = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  }, [navigation]);
  const onDoneTouched = (0, _react.useCallback)(() => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  }, [navigation]);
  (0, _react.useEffect)(() => {
    if (!credential) {
      return;
    }
    if (credential.state === _didcomm.DidCommCredentialState.CredentialReceived || credential.state === _didcomm.DidCommCredentialState.Done) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
      const restoreMetadata = async () => {
        if (agent) {
          try {
            await (0, _credential.ensureCredentialMetadata)(credential, agent, undefined, logger);
          } catch (error) {
            logger === null || logger === void 0 || logger.warn('Failed to restore credential metadata', {
              error: error
            });
          }
        }
      };
      restoreMetadata();
    }
  }, [credential, timer, agent, logger]);
  (0, _react.useEffect)(() => {
    if (confirmationOnly) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
    }
  }, [confirmationOnly, timer]);
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
  }, [timerDidFire, credentialDeliveryStatus, visible, connTimerDelay]);
  (0, _react.useEffect)(() => {
    if (shouldShowDelayMessage && credentialDeliveryStatus !== DeliveryStatus.Completed) {
      _reactNative.AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
    }
  }, [shouldShowDelayMessage, credentialDeliveryStatus, t]);
  const controls = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: (0, _testable.testIdWithKey)('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  }), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: (0, _testable.testIdWithKey)('Done'),
    onPress: onDoneTouched,
    buttonType: _Button.ButtonType.ModalPrimary
  }));
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    visible: visible,
    transparent: true,
    animationType: "none"
  }, /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    edges: ['bottom', 'top', 'left', 'right'],
    controls: controls
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: (0, _testable.testIdWithKey)('CredentialOnTheWay')
  }, t('CredentialOffer.CredentialOnTheWay')), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: (0, _testable.testIdWithKey)('CredentialAddedToYourWallet')
  }, t('CredentialOffer.CredentialAddedToYourWallet'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/_react.default.createElement(CredentialAdded, null), credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(CredentialPending, null)), shouldShowDelayMessage && credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [ListItems.credentialOfferDetails, styles.delayMessageText],
    testID: (0, _testable.testIdWithKey)('TakingTooLong')
  }, t('Connection.TakingTooLong'))));
};
var _default = exports.default = CredentialOfferAccept;
//# sourceMappingURL=CredentialOfferAccept.js.map