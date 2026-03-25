import { useAgent } from '@bifold/react-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, useWindowDimensions, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { OrientationType, useOrientationChange } from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AttachTourStep } from '../components/tour/AttachTourStep';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useNetwork } from '../contexts/network';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { connectFromScanOrDeepLink } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import { BaseTourID } from '../types/tour';
import { ThemedText } from '../components/texts/ThemedText';
const TabStack = () => {
  const {
    fontScale
  } = useWindowDimensions();
  const badgeFontSize = useMemo(() => {
    if (fontScale >= 1.2 && fontScale < 1.5) {
      return {
        fontSize: 15,
        lineHeight: 15
      };
    } else if (fontScale >= 1.5 && fontScale < 1.7) {
      return {
        fontSize: 10,
        lineHeight: 10
      };
    } else if (fontScale >= 1.7 && fontScale < 3) {
      return {
        fontSize: 8,
        lineHeight: 8
      };
    } else if (fontScale >= 3 && fontScale < 4) {
      return {
        fontSize: 6,
        lineHeight: 6
      };
    }
    return null;
  }, [fontScale]);
  const [HomeStack, {
    useNotifications
  }, {
    enableImplicitInvitations,
    enableReuseConnections
  }, logger, CredentialStack] = useServices([TOKENS.STACK_HOME, TOKENS.NOTIFICATIONS, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.STACK_CREDENTIAL]);
  const notifications = useNotifications({});
  const {
    t
  } = useTranslation();
  const Tab = createBottomTabNavigator();
  const {
    assertNetworkConnected
  } = useNetwork();
  const {
    ColorPalette,
    TabTheme,
    TextTheme,
    Assets,
    NavigationTheme
  } = useTheme();
  const [orientation, setOrientation] = useState(OrientationType.PORTRAIT);
  const [store, dispatch] = useStore();
  const {
    agent
  } = useAgent();
  const navigation = useNavigation();
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
  const handleDeepLink = useCallback(async deepLink => {
    logger.info(`Handling deeplink: ${deepLink}`);

    // If it's just the general link with no params, set link inactive and do nothing
    if (deepLink.search(/oob=|c_i=|d_m=|url=/) < 0) {
      dispatch({
        type: DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined]
      });
      return;
    }
    try {
      await connectFromScanOrDeepLink(deepLink, agent, logger, navigation, true,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch (err) {
      const error = new BifoldError(t('Error.Title1039'), t('Error.Message1039'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1039);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    } finally {
      dispatch({
        type: DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined]
      });
    }
  }, [agent, enableImplicitInvitations, enableReuseConnections, logger, navigation, t, dispatch]);
  useEffect(() => {
    if (store.deepLink && agent && store.authentication.didAuthenticate) {
      handleDeepLink(store.deepLink);
    }
  }, [store.deepLink, agent, store.authentication.didAuthenticate, handleDeepLink]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1,
      backgroundColor: NavigationTheme.colors.background
    },
    edges: ['left', 'right', 'top']
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
        tourID: BaseTourID.HomeTour,
        index: 1
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, focused ? /*#__PURE__*/React.createElement(Assets.svg.tabOneFocusedIcon, {
        height: 30,
        width: 30,
        fill: color
      }) : /*#__PURE__*/React.createElement(Assets.svg.tabOneIcon, {
        height: 30,
        width: 30,
        fill: color
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
        backgroundColor: ColorPalette.semantic.error,
        ...badgeFontSize
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
        tourID: BaseTourID.HomeTour,
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
        tourID: BaseTourID.CredentialsTour,
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
      }, /*#__PURE__*/React.createElement(Assets.svg.tabTwoIcon, {
        height: 30,
        width: 30,
        fill: TabTheme.tabBarButtonIconStyle.color,
        style: {
          paddingLeft: 0.5,
          paddingRight: 0.5
        }
      })), showLabels && /*#__PURE__*/React.createElement(ThemedText, {
        maxFontSizeMultiplier: 1.2,
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
        if (!assertNetworkConnected()) {
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
        tourID: BaseTourID.HomeTour,
        index: 2
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, focused ? /*#__PURE__*/React.createElement(Assets.svg.tabThreeFocusedIcon, {
        height: 30,
        width: 30,
        fill: color
      }) : /*#__PURE__*/React.createElement(Assets.svg.tabThreeIcon, {
        height: 30,
        width: 30,
        fill: color
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
  })), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: TabTheme.tabBarSecondaryBackgroundColor
    },
    edges: ['bottom']
  }));
};
export default TabStack;
//# sourceMappingURL=TabStack.js.map