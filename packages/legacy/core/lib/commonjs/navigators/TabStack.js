"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bottomTabs = require("@react-navigation/bottom-tabs");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeOrientationLocker = require("react-native-orientation-locker");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _AttachTourStep = require("../components/tour/AttachTourStep");
var _containerApi = require("../container-api");
var _network = require("../contexts/network");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _tour = require("../types/tour");
var _testable = require("../utils/testable");
var _CredentialStack = _interopRequireDefault(require("./CredentialStack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TabStack = () => {
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const [HomeStack, {
    useNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.STACK_HOME, _containerApi.TOKENS.NOTIFICATIONS]);
  const notifications = useNotifications();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const Tab = (0, _bottomTabs.createBottomTabNavigator)();
  const {
    assertConnectedNetwork
  } = (0, _network.useNetwork)();
  const {
    ColorPallet,
    TabTheme,
    TextTheme
  } = (0, _theme.useTheme)();
  const [orientation, setOrientation] = (0, _react.useState)(_reactNativeOrientationLocker.OrientationType.PORTRAIT);
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
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    }
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
        tourID: _tour.TourID.HomeTour,
        index: 1
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
        name: focused ? 'message-text' : 'message-text-outline',
        color: color,
        size: 30
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
        backgroundColor: ColorPallet.semantic.error
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
        tourID: _tour.TourID.HomeTour,
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
        tourID: _tour.TourID.CredentialsTour,
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
      }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
        accessible: false,
        name: "qrcode-scan",
        color: TabTheme.tabBarButtonIconStyle.color,
        size: 32,
        style: {
          paddingLeft: 0.5,
          paddingTop: 0.5
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
        if (!assertConnectedNetwork()) {
          return;
        }
        navigation.navigate(_navigators.Stacks.ConnectStack, {
          screen: _navigators.Screens.Scan
        });
      }
    })
  }, () => /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), /*#__PURE__*/_react.default.createElement(Tab.Screen, {
    name: _navigators.TabStacks.CredentialStack,
    component: _CredentialStack.default,
    options: {
      tabBarIconStyle: styles.tabBarIcon,
      tabBarIcon: ({
        color,
        focused
      }) => /*#__PURE__*/_react.default.createElement(_AttachTourStep.AttachTourStep, {
        tourID: _tour.TourID.HomeTour,
        index: 2
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          ...TabTheme.tabBarContainerStyle,
          justifyContent: showLabels ? 'flex-end' : 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
        name: focused ? 'wallet' : 'wallet-outline',
        color: color,
        size: 30
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
  })));
};
var _default = exports.default = TabStack;
//# sourceMappingURL=TabStack.js.map