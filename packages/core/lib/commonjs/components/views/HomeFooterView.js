"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _OpenIDCredentialRecordProvider = require("../../modules/openid/context/OpenIDCredentialRecordProvider");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const offset = 25;
const HomeFooterView = ({
  children
}) => {
  const {
    openIdState
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const {
    w3cCredentialRecords,
    sdJwtVcRecords
  } = openIdState;
  const credentials = [...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.Done), ...w3cCredentialRecords, ...sdJwtVcRecords];
  const {
    HomeTheme,
    TextTheme,
    Assets
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
      marginHorizontal: offset
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: 100
    }
  });
  const displayMessage = credentialCount => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined');
    }
    let credentialMsg;
    let scanReminder;
    if (credentialCount === 1) {
      credentialMsg = /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Home.YouHave'), ' ', /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credential'), " ", t('Home.InYourWallet'));
    } else if (credentialCount > 1) {
      credentialMsg = /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Home.YouHave'), ' ', /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        style: {
          fontWeight: TextTheme.bold.fontWeight
        }
      }, credentialCount), ' ', t('Home.Credentials'), " ", t('Home.InYourWallet'));
    } else {
      credentialMsg = /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        variant: "bold"
      }, t('Home.NoCredentials'));
      scanReminder = /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Home.ScanOfferAddCard'));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.imageContainer
    }, /*#__PURE__*/_react.default.createElement(Assets.svg.homeCenterImg, {
      width: '30%'
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.messageContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, credentialMsg)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.messageContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      adjustsFontSizeToFit: true,
      style: [HomeTheme.credentialMsg, {
        marginTop: offset,
        textAlign: 'center'
      }]
    }, scanReminder)));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, displayMessage(credentials.length)), children);
};
var _default = exports.default = HomeFooterView;
//# sourceMappingURL=HomeFooterView.js.map