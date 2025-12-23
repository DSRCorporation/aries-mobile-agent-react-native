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
var _constants = require("../constants");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AttemptLockout = () => {
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [state, dispatch] = (0, _store2.useStore)();
  const [time, setTime] = (0, _react.useState)();
  const [timeoutDone, setTimeoutDone] = (0, _react.useState)(false);
  const navigation = (0, _native.useNavigation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    title: {
      ...TextTheme.headingThree,
      marginHorizontal: 50,
      textAlign: 'center',
      marginBottom: 50
    },
    description: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginHorizontal: 50,
      marginBottom: 50
    },
    tryAgain: {
      ...TextTheme.normal,
      textAlign: 'center'
    },
    countDown: {
      ...TextTheme.bold,
      textAlign: 'center'
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
      marginTop: 25
    }
  });

  // update the countdown timer. Return true if the lockout penalty time is over
  const updateTimeRemaining = () => {
    let penaltyServed = true;
    const penalty = state.loginAttempt.lockoutDate;
    const currDate = Date.now();
    if (penalty) {
      let diff = penalty - currDate;
      if (diff > 0) {
        penaltyServed = false;
        const hoursLeft = Math.floor(diff / _constants.hour);
        diff = diff - hoursLeft * _constants.hour;
        const minutesLeft = Math.floor(diff / _constants.minute);
        diff = diff - minutesLeft * _constants.minute;
        const secondsLeft = Math.floor(diff / _constants.second);
        const timer = {
          hours: hoursLeft,
          minutes: minutesLeft,
          seconds: secondsLeft
        };
        setTime(timer);
      }
    }
    return penaltyServed;
  };

  // run once immediately at screen initialization
  (0, _react.useEffect)(() => {
    setTimeoutDone(updateTimeRemaining());
  }, []);

  // make sure set timeout only runs once
  (0, _react.useEffect)(() => {
    const updateTimer = setTimeout(() => {
      // calculate time remaining
      const timerDone = updateTimeRemaining();
      setTimeoutDone(timerDone);
      if (timerDone) {
        clearInterval(updateTimer);
      }
    }, 1000);
  });
  const unlock = async () => {
    dispatch({
      type: _store.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: state.loginAttempt.loginAttempts,
        lockoutDate: undefined,
        servedPenalty: true
      }]
    });
    navigation.dispatch(_native.CommonActions.reset({
      index: 0,
      routes: [{
        name: _navigators.Screens.EnterPIN
      }]
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.appLockout, {
    style: styles.image
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, t('AttemptLockout.Title')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, t('AttemptLockout.Description')), timeoutDone ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.TryAgain'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Enter'),
    accessibilityLabel: t('Global.TryAgain'),
    onPress: unlock
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.tryAgain
  }, t('AttemptLockout.TryAgain')), time && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.countDown
  }, time === null || time === void 0 ? void 0 : time.hours, " ", t('AttemptLockout.Hours'), " ", time === null || time === void 0 ? void 0 : time.minutes, " ", t('AttemptLockout.Minutes'), " ", time === null || time === void 0 ? void 0 : time.seconds, ' ', t('AttemptLockout.Seconds')))));
};
var _default = exports.default = AttemptLockout;
//# sourceMappingURL=AttemptLockout.js.map