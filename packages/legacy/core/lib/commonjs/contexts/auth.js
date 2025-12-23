"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuth = exports.AuthProvider = exports.AuthContext = void 0;
require("@hyperledger/aries-askar-react-native");
require("reflect-metadata");
var _askar = require("@credo-ts/askar");
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _reactNative = require("@credo-ts/react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative2 = require("react-native");
var _constants = require("../constants");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _keychain = require("../services/keychain");
var _crypto = require("../utils/crypto");
var _migration = require("../utils/migration");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// NOTE: We need to import these to be able to use the AskarWallet in this file.

// eslint-disable-next-line import/no-extraneous-dependencies

const AuthContext = exports.AuthContext = /*#__PURE__*/(0, _react.createContext)(null);
const AuthProvider = ({
  children
}) => {
  const [walletSecret, setWalletSecret] = (0, _react.useState)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const setPIN = async PIN => {
    const secret = await (0, _keychain.secretForPIN)(PIN);
    await (0, _keychain.storeWalletSecret)(secret);
  };
  const getWalletCredentials = async () => {
    if (walletSecret && walletSecret.key) {
      return walletSecret;
    }
    const {
      secret,
      err
    } = await (0, _keychain.loadWalletSecret)(t('Biometry.UnlockPromptTitle'), t('Biometry.UnlockPromptDescription'));
    _reactNative2.DeviceEventEmitter.emit(_constants.EventTypes.BIOMETRY_ERROR, err !== undefined);
    if (!secret) {
      return;
    }
    setWalletSecret(secret);
    return secret;
  };
  const commitPIN = async useBiometry => {
    const secret = await getWalletCredentials();
    if (!secret) {
      return false;
    }
    // set did authenticate to true if we can get wallet credentials
    dispatch({
      type: _store.DispatchAction.DID_AUTHENTICATE
    });
    if (useBiometry) {
      await (0, _keychain.storeWalletSecret)(secret, useBiometry);
    } else {
      // erase wallet key if biometrics is disabled
      await (0, _keychain.wipeWalletKey)(useBiometry);
    }
    return true;
  };
  const checkPIN = async PIN => {
    try {
      const secret = await (0, _keychain.loadWalletSalt)();
      if (!secret || !secret.salt) {
        return false;
      }
      const hash = await (0, _crypto.hashPIN)(PIN, secret.salt);
      if (!(0, _migration.didMigrateToAskar)(store.migration)) {
        await (0, _migration.migrateToAskar)(secret.id, hash);
        dispatch({
          type: _store.DispatchAction.DID_MIGRATE_TO_ASKAR
        });
      }

      // NOTE: a custom wallet is used to check if the wallet key is correct. This is different from the wallet used in the rest of the app.
      // We create an AskarWallet instance and open the wallet with the given secret.
      const askarWallet = new _askar.AskarWallet(new _core.ConsoleLogger(_core.LogLevel.off), new _reactNative.agentDependencies.FileSystem(), new _core.SigningProviderRegistry([]));
      await askarWallet.open({
        id: secret.id,
        key: hash
      });
      await askarWallet.close();
      const fullSecret = await (0, _keychain.secretForPIN)(PIN, secret.salt);
      setWalletSecret(fullSecret);
      return true;
    } catch (e) {
      return false;
    }
  };
  const removeSavedWalletSecret = () => {
    setWalletSecret(undefined);
  };
  const disableBiometrics = async () => {
    await (0, _keychain.wipeWalletKey)(true);
  };
  const rekeyWallet = async (oldPin, newPin, useBiometry) => {
    try {
      // argon2.hash can sometimes generate an error
      const secret = await (0, _keychain.loadWalletSalt)();
      if (!secret) {
        return false;
      }
      const oldHash = await (0, _crypto.hashPIN)(oldPin, secret.salt);
      const newSecret = await (0, _keychain.secretForPIN)(newPin);
      const newHash = await (0, _crypto.hashPIN)(newPin, newSecret.salt);
      if (!newSecret.key) {
        return false;
      }
      await (agent === null || agent === void 0 ? void 0 : agent.wallet.close());
      await (agent === null || agent === void 0 ? void 0 : agent.wallet.rotateKey({
        id: secret.id,
        key: oldHash,
        rekey: newHash
      }));
      await (0, _keychain.storeWalletSecret)(newSecret, useBiometry);
      setWalletSecret(newSecret);
    } catch {
      return false;
    }
    return true;
  };
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      checkPIN,
      getWalletCredentials,
      removeSavedWalletSecret,
      disableBiometrics,
      commitPIN,
      setPIN,
      isBiometricsActive: _keychain.isBiometricsActive,
      rekeyWallet,
      walletSecret
    }
  }, children);
};
exports.AuthProvider = AuthProvider;
const useAuth = () => (0, _react.useContext)(AuthContext);
exports.useAuth = useAuth;
//# sourceMappingURL=auth.js.map