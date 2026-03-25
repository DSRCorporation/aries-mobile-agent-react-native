"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wipeWalletKey = exports.storeWalletSecret = exports.storeWalletSalt = exports.storeWalletKey = exports.storeLoginAttempt = exports.secretForPIN = exports.optionsForKeychainAccess = exports.loadWalletSecret = exports.loadWalletSalt = exports.loadWalletKey = exports.loadLoginAttempt = exports.isBiometricsActive = void 0;
var _reactNative = require("react-native");
var _reactNativeKeychain = _interopRequireWildcard(require("react-native-keychain"));
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const keyFauxUserName = 'WalletFauxPINUserName';
const saltFauxUserName = 'WalletFauxSaltUserName';
const loginAttemptFauxUserName = 'WalletFauxLoginAttemptUserName';
// TODO: consider combing WalletSalt, WalletKey all into Wallet Secret, then using partials when required

const optionsForKeychainAccess = (service, useBiometrics = false) => {
  const opts = {
    accessible: useBiometrics ? _reactNativeKeychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY : _reactNativeKeychain.ACCESSIBLE.ALWAYS,
    service
  };
  if (useBiometrics) {
    opts.accessControl = _reactNativeKeychain.ACCESS_CONTROL.BIOMETRY_ANY;
  }
  if (_reactNative.Platform.OS === 'android') {
    opts.securityLevel = _reactNativeKeychain.SECURITY_LEVEL.ANY;
    if (!useBiometrics) {
      opts.storage = _reactNativeKeychain.STORAGE_TYPE.AES_GCM_NO_AUTH;
    } else {
      opts.storage = _reactNativeKeychain.STORAGE_TYPE.RSA;
    }
  }
  return opts;
};
exports.optionsForKeychainAccess = optionsForKeychainAccess;
const secretForPIN = async (PIN, hashAlgorithm, salt) => {
  const mySalt = salt ?? _reactNativeUuid.default.v4().toString();
  const myKey = await hashAlgorithm(PIN, mySalt);
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
  return Boolean(result);
};
exports.storeWalletKey = storeWalletKey;
const storeWalletSalt = async secret => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.Salt, false);
  const secretAsString = JSON.stringify(secret);
  const result = await _reactNativeKeychain.default.setGenericPassword(saltFauxUserName, secretAsString, opts);
  return Boolean(result);
};
exports.storeWalletSalt = storeWalletSalt;
const storeLoginAttempt = async loginAttempt => {
  const opts = optionsForKeychainAccess(_constants.KeychainServices.LoginAttempt, false);
  const loginAttemptAsString = JSON.stringify(loginAttempt);
  const result = await _reactNativeKeychain.default.setGenericPassword(loginAttemptFauxUserName, loginAttemptAsString, opts);
  return Boolean(result);
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
  let salt = undefined;
  const opts = {
    service: _constants.KeychainServices.Salt
  };
  const result = await _reactNativeKeychain.default.getGenericPassword(opts);
  if (!result) {
    return;
  }

  // salt data is stored and returned as a string and needs to be parsed
  const parsedSalt = JSON.parse(result.password);
  if (!parsedSalt.id || !parsedSalt.salt) {
    throw new Error('Wallet salt failed to load');
  }
  salt = {
    id: parsedSalt.id,
    salt: parsedSalt.salt
  };
  return salt;
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
  var _salt, _salt2;
  let salt;
  let key;
  let secret = undefined;
  try {
    salt = await loadWalletSalt();
    key = await loadWalletKey(title, description);
  } catch (e) {
    throw new Error((e === null || e === void 0 ? void 0 : e.message) ?? e);
  }
  if (!((_salt = salt) !== null && _salt !== void 0 && _salt.id) || !((_salt2 = salt) !== null && _salt2 !== void 0 && _salt2.salt) || !key) {
    throw new Error('Wallet secret is missing key property');
  }
  secret = {
    id: salt.id,
    key: key.key,
    salt: salt.salt
  };
  return secret;
};

// This function checks if the biometrics on a device have been configured
// If fingerprints or a face scan is setup, this will return true
// If the device supports biometrics but they have not been configured, it will return false
exports.loadWalletSecret = loadWalletSecret;
const isBiometricsActive = async () => {
  const result = await (0, _reactNativeKeychain.getSupportedBiometryType)();
  return Boolean(result);
};
exports.isBiometricsActive = isBiometricsActive;
//# sourceMappingURL=keychain.js.map