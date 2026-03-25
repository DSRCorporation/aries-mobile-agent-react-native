import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import Button, { ButtonType } from '../components/buttons/Button';
import InfoTextBox from '../components/texts/InfoTextBox';
import { ThemedText } from '../components/texts/ThemedText';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { testIdWithKey } from '../utils/testable';
const AttemptLockout = () => {
  const {
    ColorPalette,
    Assets,
    Spacing
  } = useTheme();
  const {
    t
  } = useTranslation();
  const [state, dispatch] = useStore();
  const [time, setTime] = useState();
  const [timeoutDone, setTimeoutDone] = useState(false);
  const lockoutDate = useRef(state.loginAttempt.lockoutDate);
  const styles = StyleSheet.create({
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
    const timeDifference = moment(lockoutDate.current).diff(moment());
    const duration = moment.duration(timeDifference);
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
  useEffect(() => {
    getTimeRemaining();
  }, []);

  // make sure set timeout only runs once
  useEffect(() => {
    const updateTimer = setTimeout(() => {
      // calculate time remaining
      getTimeRemaining();
      if (timeoutDone) {
        clearInterval(updateTimer);
      }
    }, 1000);
    return () => clearInterval(updateTimer);
  }, [timeoutDone, time]);
  const unlock = useCallback(async () => {
    dispatch({
      type: DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: state.loginAttempt.loginAttempts,
        lockoutDate: undefined,
        servedPenalty: true
      }]
    });
  }, [dispatch, state.loginAttempt.loginAttempts]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.appLockout, {
    style: styles.image
  }), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    style: styles.title
  }, t('AttemptLockout.Title')), /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.description
  }, t('AttemptLockout.Description')), /*#__PURE__*/React.createElement(View, {
    style: styles.actionContainer
  }, timeoutDone ? /*#__PURE__*/React.createElement(Button, {
    title: t('Global.TryAgain'),
    buttonType: ButtonType.Primary,
    testID: testIdWithKey('Enter'),
    accessibilityLabel: t('Global.TryAgain'),
    onPress: unlock
  }) : /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.tryAgain
  }, t('AttemptLockout.TryAgain')), time && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.countDown
  }, time === null || time === void 0 ? void 0 : time.hours, " ", t('AttemptLockout.Hours'), " ", time === null || time === void 0 ? void 0 : time.minutes, " ", t('AttemptLockout.Minutes'), ' ', time === null || time === void 0 ? void 0 : time.seconds, " ", t('AttemptLockout.Seconds')))), /*#__PURE__*/React.createElement(InfoTextBox, {
    style: {
      flexShrink: 1,
      padding: Spacing.md
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: {
      marginBottom: Spacing.md
    }
  }, t('AttemptLockout.ForgotPIN')), /*#__PURE__*/React.createElement(ThemedText, null, t('AttemptLockout.ForgotPINDescription'))))));
};
export default AttemptLockout;
//# sourceMappingURL=AttemptLockout.js.map