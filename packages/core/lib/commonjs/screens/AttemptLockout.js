"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _moment = _interopRequireDefault(require("moment"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _InfoTextBox = _interopRequireDefault(require("../components/texts/InfoTextBox"));
var _ThemedText = require("../components/texts/ThemedText");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AttemptLockout = () => {
  const {
    ColorPalette,
    Assets,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [state, dispatch] = (0, _store2.useStore)();
  const [time, setTime] = (0, _react.useState)();
  const [timeoutDone, setTimeoutDone] = (0, _react.useState)(false);
  const lockoutDate = (0, _react.useRef)(state.loginAttempt.lockoutDate);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      paddingHorizontal: Spacing.md
    },
    title: {
      textAlign: 'center',
      marginBottom: Spacing.lg
    },
    description: {
      textAlign: 'center',
      marginBottom: Spacing.lg
    },
    actionContainer: {
      marginBottom: Spacing.lg
    },
    tryAgain: {
      textAlign: 'center'
    },
    countDown: {
      textAlign: 'center'
    },
    image: {
      width: 150,
      height: 150,
      marginVertical: Spacing.lg,
      alignSelf: 'center'
    }
  });
  const getTimeRemaining = () => {
    const timeDifference = (0, _moment.default)(lockoutDate.current).diff((0, _moment.default)());
    const duration = _moment.default.duration(timeDifference);
    if (timeDifference > 0) {
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setTime({
        hours,
        minutes,
        seconds
      });
    } else {
      setTimeoutDone(true);
    }
  };

  // Initialize hours, minutes and seconds before time starts
  (0, _react.useEffect)(() => {
    getTimeRemaining();
  }, []);

  // make sure set timeout only runs once
  (0, _react.useEffect)(() => {
    const updateTimer = setTimeout(() => {
      // calculate time remaining
      getTimeRemaining();
      if (timeoutDone) {
        clearInterval(updateTimer);
      }
    }, 1000);
    return () => clearInterval(updateTimer);
  }, [timeoutDone, time]);
  const unlock = (0, _react.useCallback)(async () => {
    dispatch({
      type: _store.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: state.loginAttempt.loginAttempts,
        lockoutDate: undefined,
        servedPenalty: true
      }]
    });
  }, [dispatch, state.loginAttempt.loginAttempts]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.appLockout, {
    style: styles.image
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    style: styles.title
  }, t('AttemptLockout.Title')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.description
  }, t('AttemptLockout.Description')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionContainer
  }, timeoutDone ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.TryAgain'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Enter'),
    accessibilityLabel: t('Global.TryAgain'),
    onPress: unlock
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.tryAgain
  }, t('AttemptLockout.TryAgain')), time && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.countDown
  }, time === null || time === void 0 ? void 0 : time.hours, " ", t('AttemptLockout.Hours'), " ", time === null || time === void 0 ? void 0 : time.minutes, " ", t('AttemptLockout.Minutes'), ' ', time === null || time === void 0 ? void 0 : time.seconds, " ", t('AttemptLockout.Seconds')))), /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
    style: {
      flexShrink: 1,
      padding: Spacing.md
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: {
      marginBottom: Spacing.md
    }
  }, t('AttemptLockout.ForgotPIN')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('AttemptLockout.ForgotPINDescription'))))));
};
var _default = exports.default = AttemptLockout;
//# sourceMappingURL=AttemptLockout.js.map