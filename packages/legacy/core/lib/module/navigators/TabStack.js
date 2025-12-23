import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { OrientationType, useOrientationChange } from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AttachTourStep } from '../components/tour/AttachTourStep';
import { TOKENS, useServices } from '../container-api';
import { useNetwork } from '../contexts/network';
import { useTheme } from '../contexts/theme';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { TourID } from '../types/tour';
import { testIdWithKey } from '../utils/testable';
import CredentialStack from './CredentialStack';
const TabStack = () => {
  const {
    fontScale
  } = useWindowDimensions();
  const [HomeStack, {
    useNotifications
  }] = useServices([TOKENS.STACK_HOME, TOKENS.NOTIFICATIONS]);
  const notifications = useNotifications();
  const {
    t
  } = useTranslation();
  const Tab = createBottomTabNavigator();
  const {
    assertConnectedNetwork
  } = useNetwork();
  const {
    ColorPallet,
    TabTheme,
    TextTheme
  } = useTheme();
  const [orientation, setOrientation] = useState(OrientationType.PORTRAIT);
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18;
  const styles = StyleSheet.create({
    tabBarIcon: {
      flex: 1
    }
  });
  useOrientationChange(orientationType => {
    setOrientation(orientationType);
  });
  const leftMarginForDevice = () => {
    if (isTablet()) {
      return orientation in [OrientationType.PORTRAIT, OrientationType['PORTRAIT-UPSIDEDOWN']] ? 130 : 170;
    }
    return 0;
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  }, /*#__PURE__*/React.createElement(Tab.Navigator, {
    initialRouteName: TabStacks.HomeStack,
    screenOptions: {
      unmountOnBlur: true,
      tabBarStyle: {
        ...TabTheme.tabBarStyle
      },
      tabBarActiveTintColor: TabTheme.tabBarActiveTintColor,
      tabBarInactiveTintColor: TabTheme.tabBarInactiveTintColor,
      header: () => null
    }
  }, /*#__PURE__*/React.createElement(Tab.Screen, {
    name: TabStacks.HomeStack,
    component: HomeStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        color,
        focused
      }) => /*#__PURE__*/React.createElement(AttachTourStep, {
        tourID: TourID.HomeTour,
        index: 1
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: focused ? 'message-text' : 'message-text-outline',
        color: color,
        size: 30
      }), showLabels && /*#__PURE__*/React.createElement(Text, {
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
        }
      }, t('TabStack.Home')))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: `${t('TabStack.Home')} (${notifications.length ?? 0})`,
      tabBarTestID: testIdWithKey(t('TabStack.Home')),
      tabBarBadge: notifications.length || undefined,
      tabBarBadgeStyle: {
        marginLeft: leftMarginForDevice(),
        backgroundColor: ColorPallet.semantic.error
      }
    }
  }), /*#__PURE__*/React.createElement(Tab.Screen, {
    name: TabStacks.ConnectStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        focused
      }) => /*#__PURE__*/React.createElement(View, {
        style: {
          position: 'relative',
          flex: 1,
          width: 90
        }
      }, /*#__PURE__*/React.createElement(AttachTourStep, {
        tourID: TourID.HomeTour,
        index: 0,
        fill: true
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          position: 'absolute',
          flexGrow: 1,
          width: 90,
          bottom: 0,
          minHeight: 90,
          margin: 'auto'
        }
      }, /*#__PURE__*/React.createElement(AttachTourStep, {
        tourID: TourID.CredentialsTour,
        index: 0,
        fill: true
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          flexGrow: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement(View, {
        accessible: true,
        accessibilityRole: 'button',
        accessibilityLabel: t('TabStack.Scan'),
        style: {
          ...TabTheme.focusTabIconStyle
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        accessible: false,
        name: "qrcode-scan",
        color: TabTheme.tabBarButtonIconStyle.color,
        size: 32,
        style: {
          paddingLeft: 0.5,
          paddingTop: 0.5
        }
      })), /*#__PURE__*/React.createElement(Text, {
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          marginTop: 5
        }
      }, t('TabStack.Scan'))))))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: t('TabStack.Scan'),
      tabBarTestID: testIdWithKey(t('TabStack.Scan'))
    },
    listeners: ({
      navigation
    }) => ({
      tabPress: e => {
        e.preventDefault();
        if (!assertConnectedNetwork()) {
          return;
        }
        navigation.navigate(Stacks.ConnectStack, {
          screen: Screens.Scan
        });
      }
    })
  }, () => /*#__PURE__*/React.createElement(View, null)), /*#__PURE__*/React.createElement(Tab.Screen, {
    name: TabStacks.CredentialStack,
    component: CredentialStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        color,
        focused
      }) => /*#__PURE__*/React.createElement(AttachTourStep, {
        tourID: TourID.HomeTour,
        index: 2
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: focused ? 'wallet' : 'wallet-outline',
        color: color,
        size: 30
      }), showLabels && /*#__PURE__*/React.createElement(Text, {
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
        }
      }, t('TabStack.Credentials')))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: t('TabStack.Credentials'),
      tabBarTestID: testIdWithKey(t('TabStack.Credentials'))
    }
  })));
};
export default TabStack;
//# sourceMappingURL=TabStack.js.map