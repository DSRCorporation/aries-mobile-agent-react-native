"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wipeWalletKey = exports.storeWalletSecret = exports.storeWalletSalt = exports.storeWalletKey = exports.storeLoginAttempt = exports.secretForPIN = exports.optionsForKeychainAccess = exports.loadWalletSecret = exports.loadWalletSalt = exports.loadWalletKey = exports.loadLoginAttempt = exports.isBiometricsActive = void 0;
var _reactNative = require("react-native");
var _reactNativeKeychain = _interopRequireWildcard(require("react-native-keychain"));
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _constants = require("../constants");
var _crypto = require("../utils/crypto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const keyFauxUserName = 'WalletFauxPINUserName';
const saltFauxUserName = 'WalletFauxSaltUserName';
const loginAttemptFauxUserName = 'WalletFauxLoginAttemptUserName';
const optionsForKeychainAccess = (service, useBiometrics = false) => {
  const opts = {
    accessible: useBiometrics ? _reactNativeKeychain.default.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY : _reactNativeKeychain.default.ACCESSIBLE.ALWAYS,
    service
  };
  if (useBiometrics) {
    opts.accessControl = _reactNativeKeychain.default.ACCESS_CONTROL.BIOMETRY_ANY;
  }
  if (_reactNative.Platform.OS === 'android') {
    opts.securityLevel = _reactNativeKeychain.default.SECURITY_LEVEL.ANY;
    if (!useBiometrics) {
      opts.storage = _reactNativeKeychain.default.STORAGE_TYPE.AES;
    } else {
      opts.storage = _reactNativeKeychain.default.STORAGE_TYPE.RSA;
    }
  }
  return opts;
};
exports.optionsForKeychainAccess = optionsForKeychainAccess;
const secretForPIN = async (PIN, salt) => {
  const mySalt = salt ?? _reactNativeUuid.default.v4().toString();
  const myKey = await (0, _crypto.hashPIN)(PIN, mySalt);
  const secret = {
    id: _constants.walletId,
    key: myKey,
    salt: mySalt
  };
  return secret;
};
exports.secretForPIN = secretForPIN;
const wipeWalletKey = async useBiometrics => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.Key, useBiometrics);
  await _reactNativeKeychain.default.resetGenericPassword(opts);
};
exports.wipeWalletKey = wipeWalletKey;
const storeWalletKey = async (secret, useBiometrics = false) => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.Key, useBiometrics);
  const secretAsString = JSON.stringify(secret);
  await wipeWalletKey(useBiometrics);
  const result = await _reactNativeKeychain.default.setGenericPassword(keyFauxUserName, secretAsString, opts);
  return typeof result === 'boolean' ? false : true;
};
exports.storeWalletKey = storeWalletKey;
const storeWalletSalt = async secret => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.Salt, false);
  const secretAsString = JSON.stringify(secret);
  const result = await _reactNativeKeychain.default.setGenericPassword(saltFauxUserName, secretAsString, opts);
  return typeof result === 'boolean' ? false : true;
};
exports.storeWalletSalt = storeWalletSalt;
const storeLoginAttempt = async loginAttempt => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.LoginAttempt, false);
  const loginAttemptAsString = JSON.stringify(loginAttempt);
  const result = await _reactNativeKeychain.default.setGenericPassword(loginAttemptFauxUserName, loginAttemptAsString, opts);
  return typeof result !== 'boolean';
};
exports.storeLoginAttempt = storeLoginAttempt;
const storeWalletSecret = async (secret, useBiometrics = false) => {
  let keyResult = false;
  if (secret.key) {
    keyResult = await storeWalletKey({
      key: secret.key
    }, useBiometrics);
  }
  const saltResult = await storeWalletSalt({
    id: secret.id,
    salt: secret.salt
  });
  return keyResult && saltResult;
};
exports.storeWalletSecret = storeWalletSecret;
const loadWalletSalt = async () => {
  const opts = {
    service: _constants.KeychainServices.Salt
  };
  const result = await _reactNativeKeychain.default.getGenericPassword(opts);
  if (!result) {
    return;
  }
  return JSON.parse(result.password);
};
exports.loadWalletSalt = loadWalletSalt;
const loadLoginAttempt = async () => {
  const opts = {
    service: _constants.KeychainServices.LoginAttempt
  };
  const result = await _reactNativeKeychain.default.getGenericPassword(opts);
  if (!result) {
    return;
  }
  return JSON.parse(result.password);
};
exports.loadLoginAttempt = loadLoginAttempt;
const loadWalletKey = async (title, description) => {
  let opts = {
    service: _constants.KeychainServices.Key
  };
  if (title && description) {
    opts = {
      ...opts,
      authenticationPrompt: {
        title,
        description
      }
    };
  }
  const result = await _reactNativeKeychain.default.getGenericPassword(opts);
  if (!result) {
    return;
  }
  return JSON.parse(result.password);
};
exports.loadWalletKey = loadWalletKey;
const loadWalletSecret = async (title, description) => {
  let salt;
  let key;
  let err = '';
  try {
    salt = await loadWalletSalt();
    key = await loadWalletKey(title, description);
  } catch (e) {
    err = (e === null || e === void 0 ? void 0 : e.message) ?? e;
  }
  return {
    secret: {
      ...salt,
      ...key
    },
    err
  };
};
exports.loadWalletSecret = loadWalletSecret;
const isBiometricsActive = async () => {
  const result = await (0, _reactNativeKeychain.getSupportedBiometryType)();
  return result !== null ? true : false;
};
exports.isBiometricsActive = isBiometricsActive;
//# sourceMappingURL=keychain.js.map