"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _native = require("@react-navigation/native");
var _constants = require("../../constants");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _InfoBox = _interopRequireWildcard(require("../misc/InfoBox"));
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
var _FullScreenErrorModal = _interopRequireDefault(require("./FullScreenErrorModal"));
var _navigators = require("../../types/navigators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ErrorModal = ({
  enableReport
}) => {
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [modalVisible, setModalVisible] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)();
  const [reported, setReported] = (0, _react.useState)(false);
  const [logger, {
    enableFullScreenErrorModal
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.CONFIG]);
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const navigation = (0, _native.useNavigation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  const onDismissModalTouched = (0, _react.useCallback)(() => {
    setModalVisible(false);
  }, []);
  const onPressSimplifiedErrorModalCTA = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
    setModalVisible(false);
  }, [navigation]);
  const report = (0, _react.useCallback)(() => {
    if (error) {
      logger.report(error);
    }
    setReported(true);
  }, [logger, error]);
  (0, _react.useEffect)(() => {
    const errorAddedHandle = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.ERROR_ADDED, err => {
      if (err.title && err.message) {
        setError(err);
        setReported(false);
        setModalVisible(true);
      }
    });
    const errorRemovedHandle = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.ERROR_REMOVED, () => {
      setError(undefined);
      setModalVisible(false);
    });
    return () => {
      errorAddedHandle.remove();
      errorRemovedHandle.remove();
    };
  }, []);
  const formattedMessageForError = (0, _react.useCallback)(err => {
    if (!err) {
      return undefined;
    }
    return `${t('Error.ErrorCode')} ${err.code} - ${err.message}`;
  }, [t]);
  const secondaryCallToActionIcon = (0, _react.useMemo)(() => reported ? /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    style: {
      marginRight: 8
    },
    name: 'check-circle',
    size: 18,
    color: ColorPalette.semantic.success
  }) : undefined, [reported, ColorPalette.semantic.success]);
  return enableFullScreenErrorModal ? /*#__PURE__*/_react.default.createElement(_FullScreenErrorModal.default, {
    errorTitle: error ? error.title : t('Error.Unknown'),
    errorDescription: error ? error.description : t('Error.Problem'),
    onPressCTA: onPressSimplifiedErrorModalCTA,
    visible: modalVisible
  }) : /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    visible: modalVisible,
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    hidden: true
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    notificationType: _InfoBox.InfoBoxType.Error,
    title: error ? error.title : t('Error.Unknown'),
    description: error ? error.description : t('Error.Problem'),
    message: formattedMessageForError(error ?? null),
    onCallToActionPressed: onDismissModalTouched,
    secondaryCallToActionTitle: reported ? t('Error.Reported') : t('Error.ReportThisProblem'),
    secondaryCallToActionDisabled: reported,
    secondaryCallToActionIcon: secondaryCallToActionIcon,
    secondaryCallToActionPressed: enableReport && error ? report : undefined,
    showVersionFooter: true
  })));
};
var _default = exports.default = ErrorModal;
//# sourceMappingURL=ErrorModal.js.map