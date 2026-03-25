"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerSection = exports.Banner = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _store = require("../../contexts/reducers/store");
var _store2 = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Banner = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [expanded, setExpanded] = (0, _react.useState)(false);
  const bannerMessages = store.preferences.bannerMessages;
  const alertMessage = {
    id: 'alertMessage',
    title: t('Banner.AlertsLength', {
      alerts: bannerMessages.length
    }),
    type: 'error',
    variant: 'summary'
  };
  const dismissBanner = key => {
    dispatch({
      type: _store.DispatchAction.REMOVE_BANNER_MESSAGE,
      payload: [key]
    });
  };
  if (!bannerMessages || bannerMessages.length == 0) {
    return null;
  }
  if (bannerMessages.length === 1) {
    const message = bannerMessages[0];
    return /*#__PURE__*/_react.default.createElement(BannerSection, {
      id: message.id,
      key: message.id,
      title: message.title,
      type: message.type,
      variant: "detail",
      onDismiss: () => dismissBanner(message.id),
      dismissible: message.dismissible
    });
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(BannerSection, {
    id: alertMessage.id,
    title: t('Banner.AlertsLength', {
      alerts: bannerMessages.length
    }),
    type: alertMessage.type,
    variant: alertMessage.variant,
    expanded: expanded,
    onToggle: () => setExpanded(!expanded),
    dismissible: alertMessage.dismissible
  }), expanded && bannerMessages.map(message => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: message.id
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 2,
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }), /*#__PURE__*/_react.default.createElement(BannerSection, {
    id: message.id,
    key: message.id,
    title: message.title,
    type: message.type,
    variant: "detail",
    onDismiss: () => dismissBanner(message.id),
    dismissible: message.dismissible
  }))));
};
exports.Banner = Banner;
const BannerSection = ({
  title,
  type,
  onDismiss,
  dismissible = true,
  variant,
  expanded,
  onToggle
}) => {
  const {
    Spacing,
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.primary,
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.md
    },
    icon: {
      marginRight: Spacing.md
    }
  });
  const iconName = type => {
    switch (type) {
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert';
      case 'info':
        return 'information';
      case 'success':
        return 'check-circle';
      default:
        return 'information';
    }
  };
  const bannerColor = type => {
    switch (type) {
      case 'error':
        return '#CE3E39';
      case 'warning':
        return '#F8BB47';
      case 'info':
        return '#2E5DD7';
      case 'success':
        return '#42814A';
      default:
        return '#2E5DD7';
    }
  };

  // If more details are needed we might need to push the banner down to accommodate the extra information
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      ...styles.container,
      backgroundColor: bannerColor(type)
    },
    testID: (0, _testable.testIdWithKey)(`button-${type}`),
    onPress: () => {
      if (variant === 'summary' && onToggle) {
        onToggle();
      } else if (dismissible && onDismiss) {
        onDismiss();
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: iconName(type),
    size: 24,
    color: type === 'warning' ? ColorPalette.brand.secondaryBackground : ColorPalette.grayscale.white,
    style: styles.icon,
    testID: (0, _testable.testIdWithKey)(`icon-${type}`)
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: 'bold',
    style: {
      color: type === 'warning' ? ColorPalette.brand.secondaryBackground : ColorPalette.grayscale.white,
      flex: 1
    },
    testID: (0, _testable.testIdWithKey)(`text-${type}`)
  }, title), variant === 'summary' && /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: expanded ? 'chevron-up' : 'chevron-down',
    size: 24,
    color: "white"
  }));
};
exports.BannerSection = BannerSection;
//# sourceMappingURL=Banner.js.map