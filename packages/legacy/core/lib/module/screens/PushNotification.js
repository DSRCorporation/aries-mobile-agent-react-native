import { useAgent } from '@credo-ts/react-hooks';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, Linking, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PushNotificationImg from '../assets/img/push-notifications.svg';
// import { setup } from '../utils/PushNotificationsHelper'
import Button, { ButtonType } from '../components/buttons/Button';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
const PushNotification = ({
  route
}) => {
  var _route$params;
  const {
    t
  } = useTranslation();
  const [store, dispatch] = useStore();
  const {
    agent
  } = useAgent();
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  const [{
    enablePushNotifications
  }] = useServices([TOKENS.CONFIG]);
  const [notificationState, setNotificationState] = useState(store.preferences.usePushNotifications);
  const [notificationStatus, setNotificationStatus] = useState('unknown');
  const navigation = useNavigation();
  if (!enablePushNotifications) {
    throw new Error('Push notification configuration not found');
  }
  const isMenu = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.isMenu;
  const updateNotificationState = async () => {
    const status = await enablePushNotifications.status();
    setNotificationStatus(status);
  };
  useMemo(() => {
    updateNotificationState();
    AppState.addEventListener('change', updateNotificationState);
  }, []);
  const style = StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: 30
    },
    image: {
      height: 200,
      marginBottom: 20
    },
    heading: {
      marginBottom: 20
    },
    listItem: {
      ...TextTheme.normal,
      flex: 1,
      paddingLeft: 5
    }
  });
  const list = [t('PushNotifications.BulletOne'), t('PushNotifications.BulletTwo'), t('PushNotifications.BulletThree'), t('PushNotifications.BulletFour')];
  const settingsInstructions = [t('PushNotifications.InstructionsOne'), t('PushNotifications.InstructionsTwo'), t('PushNotifications.InstructionsThree')];
  const hasNotificationsDisabled = notificationStatus === 'denied' && store.onboarding.didConsiderPushNotifications;
  const activatePushNotifications = async () => {
    const state = await enablePushNotifications.setup();
    dispatch({
      type: DispatchAction.USE_PUSH_NOTIFICATIONS,
      payload: [state === 'granted']
    });
    if (store.onboarding.postAuthScreens.length) {
      const screens = store.onboarding.postAuthScreens;
      screens.shift();
      dispatch({
        type: DispatchAction.SET_POST_AUTH_SCREENS,
        payload: [screens]
      });
      if (screens.length) {
        navigation.navigate(screens[0]);
      } else {
        navigation.navigate(Screens.Splash);
      }
    } else if (store.preferences.enableWalletNaming) {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: Screens.NameWallet
        }]
      }));
    } else {
      dispatch({
        type: DispatchAction.DID_COMPLETE_ONBOARDING,
        payload: [true]
      });
    }
  };
  const toggleSwitch = async () => {
    if (agent) {
      if (!notificationState) {
        const res = await enablePushNotifications.setup();
        if (res === 'denied') {
          return;
        }
      }
      dispatch({
        type: DispatchAction.USE_PUSH_NOTIFICATIONS,
        payload: [!notificationState]
      });
      enablePushNotifications.toggle(!notificationState, agent);
      setNotificationState(!notificationState);
    }
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, !hasNotificationsDisabled && /*#__PURE__*/React.createElement(View, {
    style: style.image
  }, /*#__PURE__*/React.createElement(PushNotificationImg, null)), /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.headingThree, style.heading]
  }, t('PushNotifications.EnableNotifiactions')), hasNotificationsDisabled ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('PushNotifications.NotificationsOffMessage'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('PushNotifications.BeNotified')), list.map((item, index) => /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, '\u2022'), /*#__PURE__*/React.createElement(Text, {
    style: style.listItem
  }, item)))), isMenu ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 25
    }
  }, hasNotificationsDisabled ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.bold
  }, t('PushNotifications.NotificationsOffTitle')), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('PushNotifications.NotificationsInstructionTitle')), settingsInstructions.map((item, index) => /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, `${index + 1}. `), /*#__PURE__*/React.createElement(Text, {
    style: style.listItem
  }, item)))) : /*#__PURE__*/React.createElement(View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('PushNotifications.ReceiveNotifications')), /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: notificationState ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleSwitch,
    accessibilityLabel: t('PushNotifications.ReceiveNotifications'),
    accessibilityRole: "switch",
    testID: testIdWithKey('PushNotificationSwitch'),
    value: notificationState
  }))), hasNotificationsDisabled && /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    buttonType: ButtonType.Primary,
    title: t('PushNotifications.OpenSettings'),
    accessibilityLabel: t('PushNotifications.OpenSettings'),
    testID: testIdWithKey('PushNotificationSettings'),
    onPress: () => Linking.openSettings()
  }))) : /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    buttonType: ButtonType.Primary,
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: testIdWithKey('PushNotificationContinue'),
    onPress: activatePushNotifications
  })))));
};
export default PushNotification;
//# sourceMappingURL=PushNotification.js.map