"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _navigators = require("../../../types/navigators");
var _containerApi = require("../../../container-api");
var _agent = require("../../../utils/agent");
var _LoadingSpinner = _interopRequireDefault(require("../../../components/animated/LoadingSpinner"));
var _constants = require("../../../constants");
var _FullScreenErrorModal = _interopRequireDefault(require("../../../components/modals/FullScreenErrorModal"));
var _theme = require("../../../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const OpenIDConnection = ({
  navigation,
  route
}) => {
  const {
    openIDUri,
    openIDPresentationUri
  } = route.params;
  const [logger, {
    useNotifications
  }, historyEnabled] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.HISTORY_ENABLED]);
  const notifications = useNotifications({
    openIDUri: openIDUri,
    openIDPresentationUri: openIDPresentationUri
  });
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [notificationRecord, setNotificationRecord] = (0, _react.useState)(undefined);
  const [showErrorModal, setShowErrorModal] = (0, _react.useState)(false);
  const [errorDetails, setErrorDetails] = (0, _react.useState)({});
  const styles = _reactNative.StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  (0, _react.useEffect)(() => {
    try {
      if (!(agent && historyEnabled)) {
        logger.trace(`[${_navigators.Screens.OpenIDConnection}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
    } catch (err) {
      logger.error(`[${_navigators.Screens.OpenIDConnection}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger]);
  (0, _react.useEffect)(() => {
    const backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  (0, _react.useEffect)(() => {
    for (const notification of notifications) {
      if (notification.type === 'W3cCredentialRecord' || notification.type === 'SdJwtVcRecord' || notification.type === 'MdocRecord' || notification.type === 'OpenId4VPRequestRecord') {
        setNotificationRecord(notification);
      }
    }
  }, [notificationRecord, notifications, logger]);
  (0, _react.useEffect)(() => {
    if (!notificationRecord) {
      return;
    }
    if (notificationRecord.type === 'W3cCredentialRecord' || notificationRecord.type === 'SdJwtVcRecord' || notificationRecord.type === 'MdocRecord') {
      logger === null || logger === void 0 || logger.info(`Connection: Handling OpenID4VCi Credential, navigate to CredentialOffer`);
      navigation.replace(_navigators.Screens.OpenIDCredentialOffer, {
        credential: notificationRecord
      });
      return;
    }
    if (notificationRecord.type === 'OpenId4VPRequestRecord') {
      navigation.replace(_navigators.Screens.OpenIDProofPresentation, {
        credential: notificationRecord
      });
    }
  }, [logger, navigation, notificationRecord]);
  (0, _react.useEffect)(() => {
    const handler = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.OPENID_CONNECTION_ERROR, err => {
      setShowErrorModal(true);
      setErrorDetails({
        ...err
      });
    });
    return () => {
      handler.remove();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pageContainer
  }, /*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
    size: 50,
    color: ColorPalette.brand.primary
  })), /*#__PURE__*/_react.default.createElement(_FullScreenErrorModal.default, {
    errorTitle: (errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.title) ?? '',
    errorDescription: (errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.description) ?? '',
    visible: showErrorModal,
    onPressCTA: () => {
      var _navigation$getParent;
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
        screen: _navigators.Screens.Home
      });
    }
  }));
};
var _default = exports.default = OpenIDConnection;
//# sourceMappingURL=OpenIDConnection.js.map