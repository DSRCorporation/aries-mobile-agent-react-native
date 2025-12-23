"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _ButtonApi = require("../components/buttons/Button-api");
var _PINInput = _interopRequireDefault(require("../components/inputs/PINInput"));
var _AlertModal = _interopRequireDefault(require("../components/modals/AlertModal"));
var _KeyboardView = _interopRequireDefault(require("../components/views/KeyboardView"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _PINCreationValidation = require("../utils/PINCreationValidation");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-next-line import/no-named-as-default

const PINCreate = ({
  setAuthenticated,
  route
}) => {
  var _route$params;
  const updatePin = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.updatePin;
  const {
    setPIN: setWalletPIN,
    checkPIN,
    rekeyWallet
  } = (0, _auth.useAuth)();
  const [PIN, setPIN] = (0, _react.useState)('');
  const [PINTwo, setPINTwo] = (0, _react.useState)('');
  const [PINOld, setPINOld] = (0, _react.useState)('');
  const [continueEnabled, setContinueEnabled] = (0, _react.useState)(true);
  const [isLoading, setLoading] = (0, _react.useState)(false);
  const [modalState, setModalState] = (0, _react.useState)({
    visible: false,
    title: '',
    message: ''
  });
  const iconSize = 24;
  const navigation = (0, _native.useNavigation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const PINTwoInputRef = (0, _react.useRef)(null);
  const createPINButtonRef = (0, _react.useRef)(null);
  const actionButtonLabel = updatePin ? t('PINCreate.ChangePIN') : t('PINCreate.CreatePIN');
  const actionButtonTestId = updatePin ? (0, _testable.testIdWithKey)('ChangePIN') : (0, _testable.testIdWithKey)('CreatePIN');
  const [PINCreateHeader, {
    PINSecurity
  }, Button] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_PIN_CREATE_HEADER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMP_BUTTON]);
  const [PINOneValidations, setPINOneValidations] = (0, _react.useState)((0, _PINCreationValidation.PINCreationValidations)(PIN, PINSecurity.rules));
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {}
  });
  const passcodeCreate = async PIN => {
    try {
      setContinueEnabled(false);
      await setWalletPIN(PIN);
      // This will trigger initAgent
      setAuthenticated(true);
      dispatch({
        type: _store.DispatchAction.DID_CREATE_PIN
      });
      navigation.dispatch(_native.CommonActions.reset({
        index: 0,
        routes: [{
          name: _navigators.Screens.UseBiometry
        }]
      }));
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1040'), t('Error.Message1040'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1040);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const validatePINEntry = (PINOne, PINTwo) => {
    for (const validation of PINOneValidations) {
      if (validation.isInvalid) {
        setModalState({
          visible: true,
          title: t('PINCreate.InvalidPIN'),
          message: t(`PINCreate.Message.${validation.errorName}`)
        });
        return false;
      }
    }
    if (PINOne !== PINTwo) {
      setModalState({
        visible: true,
        title: t('PINCreate.InvalidPIN'),
        message: t('PINCreate.PINsDoNotMatch')
      });
      return false;
    }
    return true;
  };
  const checkOldPIN = async PIN => {
    const valid = await checkPIN(PIN);
    if (!valid) {
      setModalState({
        visible: true,
        title: t('PINCreate.InvalidPIN'),
        message: t(`PINCreate.Message.OldPINIncorrect`)
      });
    }
    return valid;
  };
  const confirmEntry = async (PINOne, PINTwo) => {
    if (!validatePINEntry(PINOne, PINTwo)) {
      return;
    }
    await passcodeCreate(PINOne);
  };
  (0, _react.useEffect)(() => {
    if (updatePin) {
      setContinueEnabled(PIN !== '' && PINTwo !== '' && PINOld !== '');
    }
  }, [PINOld, PIN, PINTwo]);
  return /*#__PURE__*/_react.default.createElement(_KeyboardView.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(PINCreateHeader, {
    updatePin: updatePin
  }), updatePin && /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreate.EnterOldPINTitle'),
    testID: (0, _testable.testIdWithKey)('EnterOldPIN'),
    onPINChanged: p => {
      setPINOld(p);
    }
  }), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreate.EnterPINTitle', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    onPINChanged: p => {
      setPIN(p);
      setPINOneValidations((0, _PINCreationValidation.PINCreationValidations)(p, PINSecurity.rules));
      if (p.length === _constants.minPINLength) {
        if (PINTwoInputRef && PINTwoInputRef.current) {
          PINTwoInputRef.current.focus();
          // NOTE:(jl) `findNodeHandle` will be deprecated in React 18.
          // https://reactnative.dev/docs/new-architecture-library-intro#preparing-your-javascript-codebase-for-the-new-react-native-renderer-fabric
          const reactTag = (0, _reactNative.findNodeHandle)(PINTwoInputRef.current);
          if (reactTag) {
            _reactNative.AccessibilityInfo.setAccessibilityFocus(reactTag);
          }
        }
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false
  }), PINSecurity.displayHelper && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 16
    }
  }, PINOneValidations.map((validation, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row'
      },
      key: index
    }, validation.isInvalid ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "clear",
      size: iconSize,
      color: ColorPallet.notification.errorIcon
    }) : /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "check",
      size: iconSize,
      color: ColorPallet.notification.successIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        paddingLeft: 4
      }]
    }, t(`PINCreate.Helper.${validation.errorName}`)));
  })), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreate.ReenterPIN', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    onPINChanged: p => {
      setPINTwo(p);
      if (p.length === _constants.minPINLength) {
        _reactNative.Keyboard.dismiss();
        if (createPINButtonRef && createPINButtonRef.current) {
          // NOTE:(jl) `findNodeHandle` will be deprecated in React 18.
          // https://reactnative.dev/docs/new-architecture-library-intro#preparing-your-javascript-codebase-for-the-new-react-native-renderer-fabric
          const reactTag = (0, _reactNative.findNodeHandle)(createPINButtonRef.current);
          if (reactTag) {
            _reactNative.AccessibilityInfo.setAccessibilityFocus(reactTag);
          }
        }
      }
    },
    testID: (0, _testable.testIdWithKey)('ReenterPIN'),
    accessibilityLabel: t('PINCreate.ReenterPIN', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    autoFocus: false,
    ref: PINTwoInputRef
  }), modalState.visible && /*#__PURE__*/_react.default.createElement(_AlertModal.default, {
    title: modalState.title,
    message: modalState.message,
    submit: () => {
      if (modalState.onModalDismiss) {
        modalState.onModalDismiss();
      }
      setModalState({
        ...modalState,
        visible: false,
        onModalDismiss: undefined
      });
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(Button, {
    title: actionButtonLabel,
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: _ButtonApi.ButtonType.Primary,
    disabled: !continueEnabled || PIN.length < _constants.minPINLength || PINTwo.length < _constants.minPINLength,
    onPress: async () => {
      setLoading(true);
      if (updatePin) {
        const valid = validatePINEntry(PIN, PINTwo);
        if (valid) {
          setContinueEnabled(false);
          const oldPinValid = await checkOldPIN(PINOld);
          if (oldPinValid) {
            const success = await rekeyWallet(PINOld, PIN, store.preferences.useBiometry);
            if (success) {
              setModalState({
                visible: true,
                title: t('PINCreate.PinChangeSuccessTitle'),
                message: t('PINCreate.PinChangeSuccessMessage'),
                onModalDismiss: () => {
                  navigation.navigate(_navigators.Screens.Settings);
                }
              });
            }
          }
          setContinueEnabled(true);
        }
      } else {
        await confirmEntry(PIN, PINTwo);
      }
      setLoading(false);
    },
    ref: createPINButtonRef
  }, !continueEnabled && isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null))));
};
var _default = exports.default = PINCreate;
//# sourceMappingURL=PINCreate.js.map