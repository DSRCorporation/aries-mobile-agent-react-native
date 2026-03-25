"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuth = exports.LockoutReason = exports.AuthProvider = exports.AuthContext = void 0;
require("reflect-metadata");
var _askar = require("@credo-ts/askar");
var _reactNative = require("react-native");
var _core = require("@credo-ts/core");
var _reactNative2 = require("@credo-ts/react-native");
var _askarReactNative = require("@openwallet-foundation/askar-react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _store = require("./reducers/store");
var _store2 = require("./store");
var _keychain = require("../services/keychain");
var _migration = require("../utils/migration");
var _error = require("../types/error");
var _constants = require("../constants");
var _containerApi = require("../container-api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AuthContext = exports.AuthContext = /*#__PURE__*/(0, _react.createContext)(null);
let LockoutReason = exports.LockoutReason = /*#__PURE__*/function (LockoutReason) {
  LockoutReason["Timeout"] = "Timeout";
  LockoutReason["Logout"] = "Logout";
  return LockoutReason;
}({});
const AuthProvider = ({
  children
}) => {
  const [walletSecret, setWalletSecret] = (0, _react.useState)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [hashPIN, logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.FN_PIN_HASH_ALGORITHM, _containerApi.TOKENS.UTIL_LOGGER]);
  const setPIN = (0, _react.useCallback)(async PIN => {
    const secret = await (0, _keychain.secretForPIN)(PIN, hashPIN);
    await (0, _keychain.storeWalletSecret)(secret);
  }, [hashPIN]);
  const getWalletSecret = (0, _react.useCallback)(async () => {
    if (walletSecret) {
      return walletSecret;
    }
    const secret = await (0, _keychain.loadWalletSecret)(t('Biometry.UnlockPromptTitle'), t('Biometry.UnlockPromptDescription'));
    setWalletSecret(secret);
    return secret;
  }, [t, walletSecret]);
  const commitWalletToKeychain = (0, _react.useCallback)(async useBiometry => {
    const secret = await getWalletSecret();
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
  }, [dispatch, getWalletSecret]);
  const checkWalletPIN = (0, _react.useCallback)(async PIN => {
    try {
      const secret = await (0, _keychain.loadWalletSalt)();
      if (!(secret !== null && secret !== void 0 && secret.salt)) {
        return false;
      }
      const hash = await hashPIN(PIN, secret.salt);
      if (!store.migration.didMigrateToAskar) {
        await (0, _migration.migrateToAskar)(secret.id, hash);
        dispatch({
          type: _store.DispatchAction.DID_MIGRATE_TO_ASKAR
        });
      }
      const validationAgent = new _core.Agent({
        config: {
          logger: new _core.ConsoleLogger(_core.LogLevel.off),
          autoUpdateStorageOnStartup: false
        },
        modules: {
          askar: new _askar.AskarModule({
            askar: _askarReactNative.askar,
            store: {
              id: secret.id,
              key: hash
            }
          })
        },
        dependencies: _reactNative2.agentDependencies
      });
      const storeManager = validationAgent.dependencyManager.resolve(_askar.AskarStoreManager);
      try {
        await storeManager.openStore(validationAgent.context);
      } finally {
        if (storeManager.isStoreOpen(validationAgent.context)) {
          await storeManager.closeStore(validationAgent.context);
        }
      }
      setWalletSecret({
        id: secret.id,
        key: hash,
        salt: secret.salt
      });
      return true;
    } catch {
      return false;
    }
  }, [dispatch, store.migration.didMigrateToAskar, hashPIN]);
  const removeSavedWalletSecret = (0, _react.useCallback)(() => {
    setWalletSecret(undefined);
  }, []);
  const lockOutUser = (0, _react.useCallback)(reason => {
    removeSavedWalletSecret();
    dispatch({
      type: _store.DispatchAction.DID_AUTHENTICATE,
      payload: [false]
    });
    dispatch({
      type: _store.DispatchAction.LOCKOUT_UPDATED,
      payload: [{
        displayNotification: reason === LockoutReason.Timeout
      }]
    });
  }, [removeSavedWalletSecret, dispatch]);
  const disableBiometrics = (0, _react.useCallback)(async () => {
    await (0, _keychain.wipeWalletKey)(true);
  }, []);
  const rekeyWallet = (0, _react.useCallback)(async (agent, oldPin, newPin, useBiometry) => {
    try {
      if (!agent) {
        logger.warn('No agent set, cannot rekey wallet');
        return false;
      }
      const secret = await (0, _keychain.loadWalletSalt)();
      if (!secret) {
        logger.warn('No wallet secret found, cannot rekey wallet');
        return false;
      }
      const oldKey = await hashPIN(oldPin, secret.salt);
      const newSecret = await (0, _keychain.secretForPIN)(newPin, hashPIN);
      if (!newSecret.key) {
        return false;
      }
      const storeManager = agent.dependencyManager.resolve(_askar.AskarStoreManager);
      const askarModuleConfig = agent.dependencyManager.resolve(_askar.AskarModuleConfig);
      if (askarModuleConfig.store.key !== oldKey) {
        logger.warn('Old PIN is incorrect');
        return false;
      }
      if (!storeManager.isStoreOpen(agent.context)) {
        await storeManager.openStore(agent.context);
      }
      await storeManager.rotateStoreKey(agent.context, {
        newKey: newSecret.key
      });
      askarModuleConfig.store.key = newSecret.key;
      await (0, _keychain.storeWalletSecret)(newSecret, useBiometry);
      setWalletSecret(newSecret);
    } catch (err) {
      logger.error('Error rekeying wallet', err);
      return false;
    }
    return true;
  }, [hashPIN, logger]);
  const verifyPIN = (0, _react.useCallback)(async PIN => {
    try {
      const credentials = await getWalletSecret();
      if (!credentials) {
        throw new Error('Get wallet credentials error');
      }
      const key = await hashPIN(PIN, credentials.salt);
      if (credentials.key !== key) {
        return false;
      }
      return true;
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1042'), t('Error.Message1042'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1042);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      return false;
    }
  }, [getWalletSecret, t, hashPIN]);
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      lockOutUser,
      checkWalletPIN,
      getWalletSecret,
      removeSavedWalletSecret,
      disableBiometrics,
      commitWalletToKeychain,
      setPIN,
      isBiometricsActive: _keychain.isBiometricsActive,
      rekeyWallet,
      walletSecret,
      verifyPIN
    }
  }, children);
};
exports.AuthProvider = AuthProvider;
const useAuth = () => (0, _react.useContext)(AuthContext);
exports.useAuth = useAuth;
//# sourceMappingURL=auth.js.map