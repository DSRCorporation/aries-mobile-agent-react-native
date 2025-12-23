"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ButtonLoading = _interopRequireDefault(require("../components/animated/ButtonLoading"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _LimitedTextInput = _interopRequireDefault(require("../components/inputs/LimitedTextInput"));
var _InfoBox = require("../components/misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("../components/modals/PopupModal"));
var _KeyboardView = _interopRequireDefault(require("../components/views/KeyboardView"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RenameContact = ({
  route
}) => {
  const {
    connectionId
  } = route.params;
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const navigation = (0, _native.useNavigation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [contactName, setContactName] = (0, _react.useState)((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  const [loading, setLoading] = (0, _react.useState)(false);
  const [errorState, setErrorState] = (0, _react.useState)({
    visible: false,
    title: '',
    description: ''
  });
  const styles = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    // below used as helpful label for view, no properties needed atp
    controlsContainer: {},
    buttonContainer: {
      width: '100%'
    }
  });
  const handleChangeText = text => {
    setContactName(text);
  };
  const handleCancelPressed = () => {
    navigation.goBack();
  };
  const handleContinuePressed = () => {
    if (contactName.length < 1) {
      setErrorState({
        title: t('RenameContact.EmptyNameTitle'),
        description: t('RenameContact.EmptyNameDescription'),
        visible: true
      });
    } else if (contactName.length > 50) {
      setErrorState({
        title: t('RenameContact.CharCountTitle'),
        description: t('RenameContact.CharCountDescription'),
        visible: true
      });
    } else {
      setLoading(true);
      dispatch({
        type: _store.DispatchAction.UPDATE_ALTERNATE_CONTACT_NAMES,
        payload: [{
          [connectionId]: contactName
        }]
      });
      setLoading(false);
      navigation.goBack();
    }
  };
  const handleDismissError = () => {
    setErrorState(prev => ({
      ...prev,
      visible: false
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_KeyboardView.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, {
      width: '100%',
      marginBottom: 16
    }]
  }, t('RenameContact.ThisContactName')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_LimitedTextInput.default, {
    defaultValue: contactName,
    label: t('RenameContact.ContactName'),
    limit: 50,
    handleChangeText: handleChangeText,
    accessibilityLabel: t('RenameContact.ContactName'),
    testID: (0, _testable.testIdWithKey)('NameInput')
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Save'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Save'),
    accessibilityLabel: t('Global.Save'),
    onPress: handleContinuePressed,
    disabled: loading
  }, loading && /*#__PURE__*/_react.default.createElement(_ButtonLoading.default, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Cancel'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    onPress: handleCancelPressed
  }))))), errorState.visible && /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: handleDismissError,
    title: errorState.title,
    description: errorState.description
  }));
};
var _default = exports.default = RenameContact;
//# sourceMappingURL=RenameContact.js.map