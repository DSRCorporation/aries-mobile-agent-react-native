"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactI18next = require("react-i18next");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _reactNativeDeviceInfo = require("react-native-device-info");
var _testable = require("../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const iconSize = 30;
class ErrorBoundary extends _react.default.Component {
  state = {
    hasError: false,
    error: null,
    reported: false
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      reported: false
    };
  }
  onDismissModalTouched = () => {
    this.setState({
      hasError: false,
      error: null,
      reported: false
    });
  };
  componentDidCatch(error) {
    const {
      logger
    } = this.props;
    logger.error('ErrorBoundary caught an error:', error);
  }
  reportError = (error, logger) => {
    if (error) {
      this.setState({
        reported: true
      });
      logger.report(error);
    }
  };
  render() {
    const {
      hasError,
      error,
      reported
    } = this.state;
    const {
      t,
      styles,
      logger
    } = this.props;
    if (hasError && error) {
      return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
        style: [styles.container, {
          justifyContent: 'center',
          alignItems: 'center'
        }]
      }, /*#__PURE__*/_react.default.createElement(ErrorBoundaryInfoBox, {
        title: error.name,
        description: error.message,
        secondaryCallToActionTitle: reported ? t('Error.Reported') : t('Error.ReportThisProblem'),
        secondaryCallToActionPressed: () => this.reportError(error, logger),
        secondaryCallToActionDisabled: reported,
        onCallToActionPressed: this.onDismissModalTouched,
        onCallToActionLabel: t('Global.Okay'),
        showVersionFooter: true
      }));
    }
    return this.props.children;
  }
}
const ErrorBoundaryInfoBox = ({
  title,
  description,
  secondaryCallToActionTitle,
  secondaryCallToActionPressed,
  secondaryCallToActionDisabled,
  onCallToActionPressed,
  onCallToActionLabel,
  showVersionFooter
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: 'lightgrey',
      borderColor: 'darkgrey',
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25,
      height: 400
    },
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      flexDirection: 'column',
      marginLeft: 10,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexGrow: 0
    },
    headerText: {
      marginLeft: 7,
      flexShrink: 1,
      alignSelf: 'center',
      color: 'darkred'
    },
    bodyText: {
      flexShrink: 1,
      marginVertical: 16,
      color: 'darkred'
    },
    showDetailsText: {
      fontWeight: 'normal',
      color: 'black'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'error',
    size: iconSize,
    color: 'darkred'
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: 'dismiss',
    accessibilityRole: 'button',
    onPress: onCallToActionPressed
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'close',
    size: iconSize,
    color: 'black'
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      maxHeight: 150,
      marginBottom: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.bodyText
  }, description))), onCallToActionLabel && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Critical,
    title: onCallToActionLabel,
    onPress: onCallToActionPressed
  })), secondaryCallToActionTitle && /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Critical,
    title: secondaryCallToActionTitle,
    onPress: secondaryCallToActionPressed,
    disabled: secondaryCallToActionDisabled
  }), showVersionFooter ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      flex: 1,
      marginTop: 8,
      textAlign: 'center',
      color: 'darkred'
    },
    testID: (0, _testable.testIdWithKey)('VersionNumber')
  }, `${t('Settings.Version')} ${(0, _reactNativeDeviceInfo.getVersion)()} (${(0, _reactNativeDeviceInfo.getBuildNumber)()})`) : null);
};
const ErrorBoundaryWrapper = ({
  children,
  logger
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    }
  });
  return /*#__PURE__*/_react.default.createElement(ErrorBoundary, {
    t: t,
    styles: styles,
    logger: logger
  }, children);
};
var _default = exports.default = ErrorBoundaryWrapper;
//# sourceMappingURL=ErrorBoundary.js.map