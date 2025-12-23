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
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _navigators = require("../../types/navigators");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NotificationModal = ({
  title,
  doneTitle,
  doneType = _Button.ButtonType.Primary,
  doneAccessibilityLabel,
  onDone,
  onHome,
  doneVisible = true,
  homeVisible = true,
  testID,
  visible,
  children
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const [modalVisible, setModalVisible] = (0, _react.useState)(true);
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    childContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 25
    },
    buttonContainer: {
      marginBottom: 35,
      marginHorizontal: 20
    },
    iconContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    iconButton: {
      padding: 20,
      paddingVertical: 28
    }
  });
  (0, _react.useEffect)(() => {
    if (visible !== undefined) {
      setModalVisible(visible);
    }
  }, [visible]);
  const close = () => {
    setModalVisible(false);
  };
  const closeHome = () => {
    close();
    navigation.navigate(_navigators.Screens.Home);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    testID: testID,
    visible: modalVisible,
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, homeVisible ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Global.Home'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('Home'),
    style: styles.iconButton,
    onPress: onHome || closeHome,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: "home",
    size: 24,
    color: ColorPallet.notification.infoText
  }))) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.childContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.headingThree, {
      fontWeight: TextTheme.normal.fontWeight,
      textAlign: 'center'
    }]
  }, title), children), doneVisible ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: doneTitle || t('Global.Done'),
    accessibilityLabel: doneAccessibilityLabel || t('Global.Done'),
    testID: (0, _testable.testIdWithKey)('Done'),
    buttonType: doneType,
    onPress: onDone || close
  })) : null));
};
var _default = exports.default = NotificationModal;
//# sourceMappingURL=NotificationModal.js.map