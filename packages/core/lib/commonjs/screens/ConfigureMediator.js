"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeBouncyCheckbox = _interopRequireDefault(require("react-native-bouncy-checkbox"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _store = require("../contexts/store");
var _store2 = require("../contexts/reducers/store");
var _theme = require("../contexts/theme");
var _ThemedText = require("../components/texts/ThemedText");
var _testable = require("../utils/testable");
var _auth = require("../contexts/auth");
var _DismissiblePopupModal = _interopRequireDefault(require("../components/modals/DismissiblePopupModal"));
var _mediatorhelpers = require("../utils/mediatorhelpers");
var _didcomm = require("@credo-ts/didcomm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ConfigureMediator = ({
  route
}) => {
  var _route$params;
  const [store, dispatch] = (0, _store.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    ColorPalette,
    SettingsTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    lockOutUser
  } = (0, _auth.useAuth)();
  const supportedMediators = store.preferences.availableMediators;
  const scannedMediatorUri = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.scannedMediatorUri;
  const [isModalVisible, setIsModalVisible] = (0, _react.useState)(false);
  const [pendingMediatorId, setPendingMediatorId] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (scannedMediatorUri && !store.preferences.availableMediators.includes(scannedMediatorUri)) {
      dispatch({
        type: _store2.DispatchAction.ADD_AVAILABLE_MEDIATOR,
        payload: [scannedMediatorUri]
      });
    }
  }, [scannedMediatorUri, dispatch, store.preferences.availableMediators]);
  const mediators = supportedMediators.map(mediator => ({
    id: mediator,
    label: String(mediator),
    testID: (0, _testable.testIdWithKey)(mediator)
  }));
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.primaryBackground,
      width: '100%'
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPalette.brand.primaryBackground,
      marginHorizontal: 25
    },
    checkboxContainer: {
      justifyContent: 'center'
    }
  });
  const confirmMediatorChange = async () => {
    if (!pendingMediatorId || !agent) return;
    await agent.context.dependencyManager.resolve(_didcomm.DidCommMediationRecipientService).clearDefaultMediator(agent.context);
    agent.config.logger.info(`successfully cleared default mediator`);
    await (0, _mediatorhelpers.setMediationToDefault)(agent, pendingMediatorId);
    dispatch({
      type: _store2.DispatchAction.SET_SELECTED_MEDIATOR,
      payload: [pendingMediatorId]
    });
    lockOutUser(_auth.LockoutReason.Logout);
    setIsModalVisible(false);
  };
  const handleMediatorChange = async mediatorId => {
    if (mediatorId === store.preferences.selectedMediator) return;
    setPendingMediatorId(mediatorId);
    setIsModalVisible(true);
  };
  const MediatorRow = ({
    label,
    id,
    testID,
    selected,
    onPress
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title"
  }, label), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.checkboxContainer,
    accessibilityLabel: label,
    accessibilityRole: "radio",
    testID: (0, _testable.testIdWithKey)(testID)
  }, /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    disableText: true,
    fillColor: ColorPalette.brand.secondaryBackground,
    unfillColor: ColorPalette.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPalette.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: "circle",
      size: 18,
      color: ColorPalette.brand.primary
    }),
    onPress: () => onPress(id),
    isChecked: selected,
    disableBuiltInState: true
  })));
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: mediators,
    keyExtractor: item => item.id,
    renderItem: ({
      item
    }) => /*#__PURE__*/_react.default.createElement(MediatorRow, {
      label: item.label.split('?')[0],
      id: item.id,
      testID: item.testID,
      selected: store.preferences.selectedMediator === item.id,
      onPress: handleMediatorChange
    })
  }), isModalVisible && /*#__PURE__*/_react.default.createElement(_DismissiblePopupModal.default, {
    title: t('Settings.ChangeMediator'),
    description: t('Settings.ChangeMediatorDescription'),
    onCallToActionLabel: t('Global.Confirm'),
    onCallToActionPressed: () => confirmMediatorChange(),
    onDismissPressed: () => setIsModalVisible(false)
  }));
};
var _default = exports.default = ConfigureMediator;
//# sourceMappingURL=ConfigureMediator.js.map