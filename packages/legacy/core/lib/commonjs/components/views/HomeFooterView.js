"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const offset = 25;
const HomeFooterView = ({
  children
}) => {
  const credentials = [...(0, _reactHooks.useCredentialByState)(_core.CredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_core.CredentialState.Done)];
  const [{
    useNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.NOTIFICATIONS]);
  const notifications = useNotifications();
  const {
    HomeTheme,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      paddingHorizontal: offset,
      paddingBottom: offset * 3
    },
    messageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 35,
      marginHorizontal: offset
    }
  });
  const displayMessage = credentialCount => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined');
    }
    let credentialMsg;
    if (credentialCount === 1) {
      credentialMsg = /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, t('Home.YouHave'), " ", /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credential'), " ", t('Home.InYourWallet'));
    } else if (credentialCount > 1) {
      credentialMsg = /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, t('Home.YouHave'), " ", /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credentials'), " ", t('Home.InYourWallet'));
    } else {
      credentialMsg = t('Home.NoCredentials');
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, notifications.length === 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.messageContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.welcomeHeader, {
        marginTop: offset,
        marginBottom: 20
      }]
    }, t('Home.Welcome'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.messageContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, credentialMsg)));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, displayMessage(credentials.length)), children);
};
var _default = exports.default = HomeFooterView;
//# sourceMappingURL=HomeFooterView.js.map