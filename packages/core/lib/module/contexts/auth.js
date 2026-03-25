import 'reflect-metadata';
import { AskarModule, AskarModuleConfig, AskarStoreManager } from '@credo-ts/askar';
import { DeviceEventEmitter } from 'react-native';
import { Agent, ConsoleLogger, LogLevel } from '@credo-ts/core';
import { agentDependencies } from '@credo-ts/react-native';
import { askar } from '@openwallet-foundation/askar-react-native';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DispatchAction } from './reducers/store';
import { useStore } from './store';
import { isBiometricsActive, loadWalletSalt, loadWalletSecret, secretForPIN, storeWalletSecret, wipeWalletKey } from '../services/keychain';
import { migrateToAskar } from '../utils/migration';
import { BifoldError } from '../types/error';
import { EventTypes } from '../constants';
import { useServices, TOKENS } from '../container-api';
export const AuthContext = /*#__PURE__*/createContext(null);
export let LockoutReason = /*#__PURE__*/function (LockoutReason) {
  LockoutReason["Timeout"] = "Timeout";
  LockoutReason["Logout"] = "Logout";
  return LockoutReason;
}({});
export const AuthProvider = ({
  children
}) => {
  const [walletSecret, setWalletSecret] = useState();
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const [hashPIN, logger] = useServices([TOKENS.FN_PIN_HASH_ALGORITHM, TOKENS.UTIL_LOGGER]);
  const setPIN = useCallback(async PIN => {
    const secret = await secretForPIN(PIN, hashPIN);
    await storeWalletSecret(secret);
  }, [hashPIN]);
  const getWalletSecret = useCallback(async () => {
    if (walletSecret) {
      return walletSecret;
    }
    const secret = await loadWalletSecret(t('Biometry.UnlockPromptTitle'), t('Biometry.UnlockPromptDescription'));
    setWalletSecret(secret);
    return secret;
  }, [t, walletSecret]);
  const commitWalletToKeychain = useCallback(async useBiometry => {
    const secret = await getWalletSecret();
    if (!secret) {
      return false;
    }

    // set did authenticate to true if we can get wallet credentials
    dispatch({
      type: DispatchAction.DID_AUTHENTICATE
    });
    if (useBiometry) {
      await storeWalletSecret(secret, useBiometry);
    } else {
      // erase wallet key if biometrics is disabled
      await wipeWalletKey(useBiometry);
    }
    return true;
  }, [dispatch, getWalletSecret]);
  const checkWalletPIN = useCallback(async PIN => {
    try {
      const secret = await loadWalletSalt();
      if (!(secret !== null && secret !== void 0 && secret.salt)) {
        return false;
      }
      const hash = await hashPIN(PIN, secret.salt);
      if (!store.migration.didMigrateToAskar) {
        await migrateToAskar(secret.id, hash);
        dispatch({
          type: DispatchAction.DID_MIGRATE_TO_ASKAR
        });
      }
      const validationAgent = new Agent({
        config: {
          logger: new ConsoleLogger(LogLevel.off),
          autoUpdateStorageOnStartup: false
        },
        modules: {
          askar: new AskarModule({
            askar,
            store: {
              id: secret.id,
              key: hash
            }
          })
        },
        dependencies: agentDependencies
      });
      const storeManager = validationAgent.dependencyManager.resolve(AskarStoreManager);
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
  const removeSavedWalletSecret = useCallback(() => {
    setWalletSecret(undefined);
  }, []);
  const lockOutUser = useCallback(reason => {
    removeSavedWalletSecret();
    dispatch({
      type: DispatchAction.DID_AUTHENTICATE,
      payload: [false]
    });
    dispatch({
      type: DispatchAction.LOCKOUT_UPDATED,
      payload: [{
        displayNotification: reason === LockoutReason.Timeout
      }]
    });
  }, [removeSavedWalletSecret, dispatch]);
  const disableBiometrics = useCallback(async () => {
    await wipeWalletKey(true);
  }, []);
  const rekeyWallet = useCallback(async (agent, oldPin, newPin, useBiometry) => {
    try {
      if (!agent) {
        logger.warn('No agent set, cannot rekey wallet');
        return false;
      }
      const secret = await loadWalletSalt();
      if (!secret) {
        logger.warn('No wallet secret found, cannot rekey wallet');
        return false;
      }
      const oldKey = await hashPIN(oldPin, secret.salt);
      const newSecret = await secretForPIN(newPin, hashPIN);
      if (!newSecret.key) {
        return false;
      }
      const storeManager = agent.dependencyManager.resolve(AskarStoreManager);
      const askarModuleConfig = agent.dependencyManager.resolve(AskarModuleConfig);
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
      await storeWalletSecret(newSecret, useBiometry);
      setWalletSecret(newSecret);
    } catch (err) {
      logger.error('Error rekeying wallet', err);
      return false;
    }
    return true;
  }, [hashPIN, logger]);
  const verifyPIN = useCallback(async PIN => {
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
      const error = new BifoldError(t('Error.Title1042'), t('Error.Message1042'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1042);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
      return false;
    }
  }, [getWalletSecret, t, hashPIN]);
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: {
      lockOutUser,
      checkWalletPIN,
      getWalletSecret,
      removeSavedWalletSecret,
      disableBiometrics,
      commitWalletToKeychain,
      setPIN,
      isBiometricsActive,
      rekeyWallet,
      walletSecret,
      verifyPIN
    }
  }, children);
};
export const useAuth = () => useContext(AuthContext);
//# sourceMappingURL=auth.js.map