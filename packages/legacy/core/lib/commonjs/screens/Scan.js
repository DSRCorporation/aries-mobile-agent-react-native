"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativePermissions = require("react-native-permissions");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _NewQRView = _interopRequireDefault(require("../components/misc/NewQRView"));
var _QRScanner = _interopRequireDefault(require("../components/misc/QRScanner"));
var _CameraDisclosureModal = _interopRequireDefault(require("../components/modals/CameraDisclosureModal"));
var _BaseToast = require("../components/toast/BaseToast");
var _LoadingView = _interopRequireDefault(require("../components/views/LoadingView"));
var _containerApi = require("../container-api");
var _store = require("../contexts/store");
var _error = require("../types/error");
var _helpers = require("../utils/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Scan = ({
  navigation,
  route
}) => {
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store] = (0, _store.useStore)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [showDisclosureModal, setShowDisclosureModal] = (0, _react.useState)(true);
  const [qrCodeScanError, setQrCodeScanError] = (0, _react.useState)(null);
  const [{
    enableImplicitInvitations,
    enableReuseConnections
  }, logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER]);
  let defaultToConnect = false;
  if (route !== null && route !== void 0 && route.params && route.params['defaultToConnect']) {
    defaultToConnect = route.params['defaultToConnect'];
  }
  const handleInvitation = async value => {
    try {
      await (0, _helpers.connectFromScanOrDeepLink)(value, agent, logger, navigation === null || navigation === void 0 ? void 0 : navigation.getParent(), false,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1031'), t('Error.Message1031'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1031);
      // throwing for QrCodeScanError
      throw error;
    }
  };
  const handleCodeScan = async value => {
    setQrCodeScanError(null);
    try {
      const uri = value;
      await handleInvitation(uri);
    } catch (e) {
      const error = new _error.QrCodeScanError(t('Scan.InvalidQrCode'), value, e === null || e === void 0 ? void 0 : e.message);
      setQrCodeScanError(error);
    }
  };
  const permissionFlow = async (method, permission, rationale) => {
    try {
      const permissionResult = await method(permission, rationale);
      if (permissionResult === _reactNativePermissions.RESULTS.GRANTED) {
        setShowDisclosureModal(false);
        return true;
      }
    } catch (error) {
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Error,
        text1: t('Global.Failure'),
        text2: (error === null || error === void 0 ? void 0 : error.message) || t('Error.Unknown'),
        visibilityTime: 2000,
        position: 'bottom'
      });
    }
    return false;
  };
  const requestCameraUse = async rationale => {
    if (_reactNative.Platform.OS === 'android') {
      return await permissionFlow(_reactNativePermissions.request, _reactNativePermissions.PERMISSIONS.ANDROID.CAMERA, rationale);
    } else if (_reactNative.Platform.OS === 'ios') {
      return await permissionFlow(_reactNativePermissions.request, _reactNativePermissions.PERMISSIONS.IOS.CAMERA, rationale);
    }
    return false;
  };
  (0, _react.useEffect)(() => {
    const asyncEffect = async () => {
      if (_reactNative.Platform.OS === 'android') {
        await permissionFlow(_reactNativePermissions.check, _reactNativePermissions.PERMISSIONS.ANDROID.CAMERA);
      } else if (_reactNative.Platform.OS === 'ios') {
        await permissionFlow(_reactNativePermissions.check, _reactNativePermissions.PERMISSIONS.IOS.CAMERA);
      }
      setLoading(false);
    };
    asyncEffect();
  }, []);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_LoadingView.default, null);
  }
  if (showDisclosureModal) {
    return /*#__PURE__*/_react.default.createElement(_CameraDisclosureModal.default, {
      requestCameraUse: requestCameraUse
    });
  }
  if (store.preferences.useConnectionInviterCapability) {
    return /*#__PURE__*/_react.default.createElement(_NewQRView.default, {
      defaultToConnect: defaultToConnect,
      handleCodeScan: handleCodeScan,
      error: qrCodeScanError,
      enableCameraOnError: true,
      navigation: navigation,
      route: route
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(_QRScanner.default, {
      handleCodeScan: handleCodeScan,
      error: qrCodeScanError,
      enableCameraOnError: true
    });
  }
};
var _default = exports.default = Scan;
//# sourceMappingURL=Scan.js.map