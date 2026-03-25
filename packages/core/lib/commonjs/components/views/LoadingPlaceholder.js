"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LoadingPlaceholderWorkflowType = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _testable = require("../../utils/testable");
var _theme = require("../../contexts/theme");
var _reactI18next = require("react-i18next");
var _InfoTextBox = _interopRequireDefault(require("../texts/InfoTextBox"));
var _InfoBox = require("../misc/InfoBox");
var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));
var _RecordLoading = _interopRequireDefault(require("../animated/RecordLoading"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const LoadingPlaceholderWorkflowType = exports.LoadingPlaceholderWorkflowType = {
  Connection: 'Connection',
  ReceiveOffer: 'ReceiveOffer',
  ProofRequested: 'ProofRequested'
};
// TODO:(jl) Add `AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'))
// when the timeout is triggered.

const LoadingPlaceholder = ({
  workflowType,
  timeoutDurationInMs = 10000,
  loadingProgressPercent = 0,
  onCancelTouched,
  onTimeoutTriggered,
  testID
}) => {
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const timerRef = (0, _react.useRef)(null);
  const [overtime, setOvertime] = (0, _react.useState)(false);
  const styles = _reactNative.StyleSheet.create({
    safeAreaView: {
      flex: 1
    },
    container: {
      flex: 1,
      marginTop: 8,
      marginHorizontal: 20
    },
    buttonContainer: {
      marginVertical: 25
    },
    link: {
      ...ListItems.recordAttributeText,
      ...ListItems.recordLink
    },
    loadingAnimationContainer: {
      flex: 1,
      flexGrow: 1,
      borderRadius: 15
    },
    infoTextBoxContainer: {
      flexShrink: 1
    }
  });
  (0, _react.useEffect)(() => {
    if (timeoutDurationInMs === 0) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setOvertime(true);
      if (onTimeoutTriggered) {
        onTimeoutTriggered();
      }
    }, timeoutDurationInMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeoutDurationInMs, onTimeoutTriggered]);
  const textForProgressIndication = (0, _react.useCallback)(() => {
    switch (workflowType) {
      case LoadingPlaceholderWorkflowType.Connection:
        return t('LoadingPlaceholder.Connecting');
      case LoadingPlaceholderWorkflowType.ProofRequested:
        return t('LoadingPlaceholder.ProofRequest');
      case LoadingPlaceholderWorkflowType.ReceiveOffer:
        return t('LoadingPlaceholder.CredentialOffer');
    }
  }, [workflowType, t]);
  const textForWorkflowType = (0, _react.useCallback)(() => {
    switch (workflowType) {
      case LoadingPlaceholderWorkflowType.ProofRequested:
        return t('LoadingPlaceholder.YourRequest');
      case LoadingPlaceholderWorkflowType.ReceiveOffer:
        return t('LoadingPlaceholder.YourOffer');
      default:
        return t('LoadingPlaceholder.Connecting');
    }
  }, [workflowType, t]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.safeAreaView,
    testID: testID ?? (0, _testable.testIdWithKey)('LoadingPlaceholder'),
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, loadingProgressPercent > 0 && /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
    progressPercent: loadingProgressPercent
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "label",
    style: {
      textAlign: 'center',
      fontWeight: 'normal'
    }
  }, textForProgressIndication()), overtime && /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
    type: _InfoBox.InfoBoxType.Info,
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.infoTextBoxContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title",
    style: {
      fontWeight: 'bold',
      marginBottom: 10
    },
    testID: (0, _testable.testIdWithKey)('SlowLoadTitle')
  }, t('LoadingPlaceholder.SlowLoadingTitle')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    testID: (0, _testable.testIdWithKey)('SlowLoadBody')
  }, t('LoadingPlaceholder.SlowLoadingBody')))), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginTop: 25,
      marginBottom: 10
    }
  }, textForWorkflowType()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loadingAnimationContainer
  }, /*#__PURE__*/_react.default.createElement(_RecordLoading.default, null), /*#__PURE__*/_react.default.createElement(_RecordLoading.default, {
    style: {
      marginTop: 10
    }
  })), onCancelTouched && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    testID: (0, _testable.testIdWithKey)('Cancel'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onCancelTouched
  })))));
};
var _default = exports.default = LoadingPlaceholder;
//# sourceMappingURL=LoadingPlaceholder.js.map