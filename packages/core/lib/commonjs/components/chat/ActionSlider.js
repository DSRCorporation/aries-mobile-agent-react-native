"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
var _SafeAreaModal = _interopRequireDefault(require("../modals/SafeAreaModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ActionSlider = ({
  actions,
  onDismiss
}) => {
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    centeredView: {
      marginTop: 'auto',
      justifyContent: 'flex-end'
    },
    outsideListener: {
      height: '100%'
    },
    modalView: {
      backgroundColor: ColorPalette.grayscale.white,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    drawerTitleText: {
      ...TextTheme.bold,
      textAlign: 'center',
      marginVertical: 10
    },
    drawerContentText: {
      ...TextTheme.normal
    },
    drawerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 12
    },
    drawerRowItem: {
      color: ColorPalette.grayscale.black
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    animationType: "slide",
    transparent: true,
    onRequestClose: onDismiss
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.outsideListener,
    onPress: onDismiss
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.centeredView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: (0, _testable.testIdWithKey)('Close'),
    accessibilityLabel: t('Global.Close'),
    accessibilityRole: 'button',
    onPress: onDismiss,
    hitSlop: _constants.hitSlop,
    style: {
      alignSelf: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "window-close",
    size: 35,
    style: styles.drawerRowItem
  })), actions === null || actions === void 0 ? void 0 : actions.map(action => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      key: action.text,
      testID: (0, _testable.testIdWithKey)(action.text),
      accessibilityLabel: action.text,
      accessibilityRole: "button",
      style: styles.drawerRow,
      onPress: action.onPress
    }, /*#__PURE__*/_react.default.createElement(action.icon, null), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        ...styles.drawerRowItem,
        marginLeft: 5
      }
    }, action.text));
  }))));
};
var _default = exports.default = ActionSlider;
//# sourceMappingURL=ActionSlider.js.map