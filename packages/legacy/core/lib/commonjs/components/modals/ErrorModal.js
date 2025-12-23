"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _InfoBox = _interopRequireWildcard(require("../misc/InfoBox"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ErrorModal = ({
  reportProblemAction
}) => {
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [modalVisible, setModalVisible] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)();
  const onDismissModalTouched = () => {
    setModalVisible(false);
  };
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  });
  (0, _react.useEffect)(() => {
    const errorAddedHandle = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.ERROR_ADDED, err => {
      if (err.title && err.message) {
        setError(err);
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
  const formattedMessageForError = err => {
    if (!err) {
      return undefined;
    }
    return `${t('Error.ErrorCode')} ${err.code} - ${err.message}`;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
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
    secondaryCallToActionTitle: t('Error.ReportThisProblem'),
    secondaryCallToActionPressed: reportProblemAction && error ? () => reportProblemAction(error) : undefined
  })));
};
var _default = exports.default = ErrorModal;
//# sourceMappingURL=ErrorModal.js.map