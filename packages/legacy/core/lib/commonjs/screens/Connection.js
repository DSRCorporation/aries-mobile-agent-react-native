"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _connections = require("../hooks/connections");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("./../container-api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GoalCodes = {
  proofRequestVerify: 'aries.vc.verify',
  proofRequestVerifyOnce: 'aries.vc.verify.once',
  credentialOffer: 'aries.vc.issue'
};
const Connection = ({
  navigation,
  route
}) => {
  const {
    oobRecordId
  } = route.params;
  const timerRef = (0, _react.useRef)(null);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    ConnectionLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [logger, {
    useNotifications
  }, {
    connectionTimerDelay,
    autoRedirectConnectionToHome
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.CONFIG]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const notifications = useNotifications();
  const oobRecord = (0, _connections.useOutOfBandById)(oobRecordId);
  const connection = (0, _connections.useConnectionByOutOfBandId)(oobRecordId);
  const merge = (current, next) => ({
    ...current,
    ...next
  });
  const [state, dispatch] = (0, _react.useReducer)(merge, {
    inProgress: true,
    isInitialized: false,
    shouldShowDelayMessage: false,
    notificationRecord: undefined
  });
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      padding: 20
    },
    image: {
      marginTop: 20
    },
    messageContainer: {
      alignItems: 'center'
    },
    messageText: {
      fontWeight: TextTheme.normal.fontWeight,
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
  const startTimer = () => {
    if (!state.isInitialized) {
      timerRef.current = setTimeout(() => {
        dispatch({
          shouldShowDelayMessage: true
        });
        timerRef.current = null;
      }, connTimerDelay);
      dispatch({
        isInitialized: true
      });
    }
  };
  const abortTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const onDismissModalTouched = () => {
    var _navigation$getParent;
    dispatch({
      shouldShowDelayMessage: false,
      inProgress: false
    });
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  (0, _react.useEffect)(() => {
    const backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  (0, _react.useEffect)(() => {
    if (state.shouldShowDelayMessage && !state.notificationRecord) {
      if (autoRedirectConnectionToHome) {
        var _navigation$getParent2;
        dispatch({
          shouldShowDelayMessage: false,
          inProgress: false
        });
        (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
          screen: _navigators.Screens.Home
        });
      } else {
        _reactNative.AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
      }
    }
  }, [state.shouldShowDelayMessage]);
  (0, _react.useEffect)(() => {
    var _navigation$getParent4;
    if (!oobRecord || !state.inProgress) {
      return;
    }

    // If we have a connection, but no goal code, we should navigate
    // to Chat
    if (connection && !Object.values(GoalCodes).includes((oobRecord === null || oobRecord === void 0 ? void 0 : oobRecord.outOfBandInvitation.goalCode) ?? '')) {
      var _navigation$getParent3;
      logger === null || logger === void 0 || logger.info('Connection: Handling connection without goal code, navigate to Chat');
      dispatch({
        inProgress: false
      });
      (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.dispatch(_native.CommonActions.reset({
        index: 1,
        routes: [{
          name: _navigators.Stacks.TabStack
        }, {
          name: _navigators.Screens.Chat,
          params: {
            connectionId: connection.id
          }
        }]
      }));
      return;
    }

    // At this point we should be waiting for a notification
    // to be processed
    if (!state.notificationRecord) {
      return;
    }

    // Connectionless proof request, we don't have connectionless offers.
    if (!connection) {
      dispatch({
        inProgress: false
      });
      navigation.replace(_navigators.Screens.ProofRequest, {
        proofId: state.notificationRecord.id
      });
      return;
    }

    // At this point, we have connection based proof or offer with
    // a goal code.

    if (!oobRecord) {
      logger === null || logger === void 0 || logger.error(`Connection: No OOB record where one is expected`);
      return;
    }
    const {
      goalCode
    } = oobRecord.outOfBandInvitation;
    if (goalCode === GoalCodes.proofRequestVerify || goalCode === GoalCodes.proofRequestVerifyOnce) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling ${goalCode} goal code, navigate to ProofRequest`);
      dispatch({
        inProgress: false
      });
      navigation.replace(_navigators.Screens.ProofRequest, {
        proofId: state.notificationRecord.id
      });
      return;
    }
    if (goalCode === GoalCodes.credentialOffer) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling ${goalCode} goal code, navigate to CredentialOffer`);
      dispatch({
        inProgress: false
      });
      navigation.replace(_navigators.Screens.CredentialOffer, {
        credentialId: state.notificationRecord.id
      });
      return;
    }
    logger === null || logger === void 0 || logger.info(`Connection: Unable to handle ${goalCode} goal code`);
    dispatch({
      inProgress: false
    });
    (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.dispatch(_native.CommonActions.reset({
      index: 1,
      routes: [{
        name: _navigators.Stacks.TabStack
      }, {
        name: _navigators.Screens.Chat,
        params: {
          connectionId: connection.id
        }
      }]
    }));
  }, [connection, oobRecord, state]);
  (0, _react.useMemo)(() => {
    startTimer();
    return () => abortTimer;
  }, []);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    startTimer();
    return () => abortTimer;
  }, []));
  (0, _react.useEffect)(() => {
    if (!state.inProgress || state.notificationRecord) {
      return;
    }
    for (const notification of notifications) {
      var _oobRecord$getTags;
      // no action taken for BasicMessageRecords
      if (notification.type === 'BasicMessageRecord') {
        logger === null || logger === void 0 || logger.info('Connection: BasicMessageRecord, skipping');
        continue;
      }
      if (connection && notification.connectionId === connection.id || oobRecord !== null && oobRecord !== void 0 && (_oobRecord$getTags = oobRecord.getTags()) !== null && _oobRecord$getTags !== void 0 && (_oobRecord$getTags = _oobRecord$getTags.invitationRequestsThreadIds) !== null && _oobRecord$getTags !== void 0 && _oobRecord$getTags.includes((notification === null || notification === void 0 ? void 0 : notification.threadId) ?? "")) {
        logger === null || logger === void 0 || logger.info(`Connection: Handling notification ${notification.id}`);
        dispatch({
          notificationRecord: notification
        });
        break;
      }
    }
  }, [notifications, state]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: (0, _testable.testIdWithKey)('CredentialOnTheWay')
  }, t('Connection.JustAMoment'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.image
  }, /*#__PURE__*/_react.default.createElement(ConnectionLoading, null)), state.shouldShowDelayMessage && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalNormal, styles.delayMessageText],
    testID: (0, _testable.testIdWithKey)('TakingTooLong')
  }, t('Connection.TakingTooLong'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: (0, _testable.testIdWithKey)('BackToHome'),
    onPress: onDismissModalTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  })));
};
var _default = exports.default = Connection;
//# sourceMappingURL=Connection.js.map