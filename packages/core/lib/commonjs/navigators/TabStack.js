"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _bottomTabs = require("@react-navigation/bottom-tabs");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeOrientationLocker = require("react-native-orientation-locker");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _AttachTourStep = require("../components/tour/AttachTourStep");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _network = require("../contexts/network");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _tour = require("../types/tour");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const TabStack = () => {
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const badgeFontSize = (0, _react.useMemo)(() => {
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
  }, logger, CredentialStack] = (0, _containerApi.useServices)([_containerApi.TOKENS.STACK_HOME, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.STACK_CREDENTIAL]);
  const notifications = useNotifications({});
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const Tab = (0, _bottomTabs.createBottomTabNavigator)();
  const {
    assertNetworkConnected
  } = (0, _network.useNetwork)();
  const {
    ColorPalette,
    TabTheme,
    TextTheme,
    Assets,
    NavigationTheme
  } = (0, _theme.useTheme)();
  const [orientation, setOrientation] = (0, _react.useState)(_reactNativeOrientationLocker.OrientationType.PORTRAIT);
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const navigation = (0, _native.useNavigation)();
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18;
  const styles = _reactNative.StyleSheet.create({
    tabBarIcon: {
      flex: 1
    }
  });
  (0, _reactNativeOrientationLocker.useOrientationChange)(orientationType => {
    setOrientation(orientationType);
  });
  const leftMarginForDevice = () => {
    if ((0, _reactNativeDeviceInfo.isTablet)()) {
      return orientation in [_reactNativeOrientationLocker.OrientationType.PORTRAIT, _reactNativeOrientationLocker.OrientationType['PORTRAIT-UPSIDEDOWN']] ? 130 : 170;
    }
    return 0;
  };
  const handleDeepLink = (0, _react.useCallback)(async deepLink => {
    logger.info(`Handling deeplink: ${deepLink}`);

    // If it's just the general link with no params, set link inactive and do nothing
    if (deepLink.search(/oob=|c_i=|d_m=|url=/) < 0) {
      dispatch({
        type: _store.DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined]
      });
      return;
    }
    try {
      await (0, _helpers.connectFromScanOrDeepLink)(deepLink, agent, logger, navigation, true,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1039'), t('Error.Message1039'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1039);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    } finally {
      dispatch({
        type: _store.DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined]
      });
    }
  }, [agent, enableImplicitInvitations, enableReuseConnections, logger, navigation, t, dispatch]);
  (0, _react.useEffect)(() => {
    if (store.deepLink && agent && store.authentication.didAuthenticate) {
      handleDeepLink(store.deepLink);
    }
  }, [store.deepLink, agent, store.authentication.didAuthenticate, handleDeepLink]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1,
      backgroundColor: NavigationTheme.colors.background
    },
    edges: ['left', 'right', 'top']
  }, /*#__PURE__*/_react.default.createElement(Tab.Navigator, {
    initialRouteName: _navigators.TabStacks.HomeStack,
    screenOptions: {
      unmountOnBlur: true,
      tabBarStyle: {
        ...TabTheme.tabBarStyle
      },
      tabBarActiveTintColor: TabTheme.tabBarActiveTintColor,
      tabBarInactiveTintColor: TabTheme.tabBarInactiveTintColor,
      header: () => null
    }
  }, /*#__PURE__*/_react.default.createElement(Tab.Screen, {
    name: _navigators.TabStacks.HomeStack,
    component: HomeStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        color,
        focused
      }) => /*#__PURE__*/_react.default.createElement(_AttachTourStep.AttachTourStep, {
        tourID: _tour.BaseTourID.HomeTour,
        index: 1
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, focused ? /*#__PURE__*/_react.default.createElement(Assets.svg.tabOneFocusedIcon, {
        height: 30,
        width: 30,
        fill: color
      }) : /*#__PURE__*/_react.default.createElement(Assets.svg.tabOneIcon, {
        height: 30,
        width: 30,
        fill: color
      }), showLabels && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
        }
      }, t('TabStack.Home')))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: `${t('TabStack.Home')} (${notifications.length ?? 0})`,
      tabBarTestID: (0, _testable.testIdWithKey)(t('TabStack.Home')),
      tabBarBadge: notifications.length || undefined,
      tabBarBadgeStyle: {
        marginLeft: leftMarginForDevice(),
        backgroundColor: ColorPalette.semantic.error,
        ...badgeFontSize
      }
    }
  }), /*#__PURE__*/_react.default.createElement(Tab.Screen, {
    name: _navigators.TabStacks.ConnectStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        focused
      }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          position: 'relative',
          flex: 1,
          width: 90
        }
      }, /*#__PURE__*/_react.default.createElement(_AttachTourStep.AttachTourStep, {
        tourID: _tour.BaseTourID.HomeTour,
        index: 0,
        fill: true
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          position: 'absolute',
          flexGrow: 1,
          width: 90,
          bottom: 0,
          minHeight: 90,
          margin: 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement(_AttachTourStep.AttachTourStep, {
        tourID: _tour.BaseTourID.CredentialsTour,
        index: 0,
        fill: true
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexGrow: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        accessible: true,
        accessibilityRole: 'button',
        accessibilityLabel: t('TabStack.Scan'),
        style: {
          ...TabTheme.focusTabIconStyle
        }
      }, /*#__PURE__*/_react.default.createElement(Assets.svg.tabTwoIcon, {
        height: 30,
        width: 30,
        fill: TabTheme.tabBarButtonIconStyle.color,
        style: {
          paddingLeft: 0.5,
          paddingRight: 0.5
        }
      })), showLabels && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        maxFontSizeMultiplier: 1.2,
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          marginTop: 5
        }
      }, t('TabStack.Scan'))))))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: t('TabStack.Scan'),
      tabBarTestID: (0, _testable.testIdWithKey)(t('TabStack.Scan'))
    },
    listeners: ({
      navigation
    }) => ({
      tabPress: e => {
        e.preventDefault();
        if (!assertNetworkConnected()) {
          return;
        }
        navigation.navigate(_navigators.Stacks.ConnectStack, {
          screen: _navigators.Screens.Scan
        });
      }
    })
  }, () => /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), /*#__PURE__*/_react.default.createElement(Tab.Screen, {
    name: _navigators.TabStacks.CredentialStack,
    component: CredentialStack,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        color,
        focused
      }) => /*#__PURE__*/_react.default.createElement(_AttachTourStep.AttachTourStep, {
        tourID: _tour.BaseTourID.HomeTour,
        index: 2
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, focused ? /*#__PURE__*/_react.default.createElement(Assets.svg.tabThreeFocusedIcon, {
        height: 30,
        width: 30,
        fill: color
      }) : /*#__PURE__*/_react.default.createElement(Assets.svg.tabThreeIcon, {
        height: 30,
        width: 30,
        fill: color
      }), showLabels && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          ...TabTheme.tabBarTextStyle,
          color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
          fontWeight: focused ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
        }
      }, t('TabStack.Credentials')))),
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: t('TabStack.Credentials'),
      tabBarTestID: (0, _testable.testIdWithKey)(t('TabStack.Credentials'))
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: TabTheme.tabBarSecondaryBackgroundColor
    },
    edges: ['bottom']
  }));
};
var _default = exports.default = TabStack;
//# sourceMappingURL=TabStack.js.map