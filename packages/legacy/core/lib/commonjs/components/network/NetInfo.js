"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactI18next = require("react-i18next");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _network = require("../../contexts/network");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NetInfo = () => {
  const {
    silentAssertConnectedNetwork,
    assertLedgerConnectivity
  } = (0, _network.useNetwork)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const isConnected = silentAssertConnectedNetwork();
  (0, _react.useEffect)(() => {
    if (isConnected) {
      assertLedgerConnectivity().then(status => {
        if (status) {
          return;
        }
        _reactNativeToastMessage.default.show({
          type: 'warn',
          autoHide: false,
          text1: t('NetInfo.LedgerConnectivityIssueMessage')
        });
      });
      return;
    }
    _reactNativeToastMessage.default.show({
      type: 'error',
      autoHide: true,
      text1: t('NetInfo.NoInternetConnectionTitle')
    });
  }, [isConnected]);
  return null;
};
var _default = exports.default = NetInfo;
//# sourceMappingURL=NetInfo.js.map