// NOTE: We need to import these to be able to use the AskarWallet in this file.
import '@hyperledger/aries-askar-react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';
import { AskarWallet } from '@credo-ts/askar';
import { ConsoleLogger, LogLevel, SigningProviderRegistry } from '@credo-ts/core';
import { useAgent } from '@credo-ts/react-hooks';
import { agentDependencies } from '@credo-ts/react-native';
import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';
import { EventTypes } from '../constants';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { isBiometricsActive, loadWalletSalt, loadWalletSecret, secretForPIN, storeWalletSecret, wipeWalletKey } from '../services/keychain';
import { hashPIN } from '../utils/crypto';
import { didMigrateToAskar, migrateToAskar } from '../utils/migration';
export const AuthContext = /*#__PURE__*/createContext(null);
export const AuthProvider = ({
  children
}) => {
  const [walletSecret, setWalletSecret] = useState();
  const [store, dispatch] = useStore();
  const {
    agent
  } = useAgent();
  const {
    t
  } = useTranslation();
  const setPIN = async PIN => {
    const secret = await secretForPIN(PIN);
    await storeWalletSecret(secret);
  };
  const getWalletCredentials = async () => {
    if (walletSecret && walletSecret.key) {
      return walletSecret;
    }
    const {
      secret,
      err
    } = await loadWalletSecret(t('Biometry.UnlockPromptTitle'), t('Biometry.UnlockPromptDescription'));
    DeviceEventEmitter.emit(EventTypes.BIOMETRY_ERROR, err !== undefined);
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
      type: DispatchAction.DID_AUTHENTICATE
    });
    if (useBiometry) {
      await storeWalletSecret(secret, useBiometry);
    } else {
      // erase wallet key if biometrics is disabled
      await wipeWalletKey(useBiometry);
    }
    return true;
  };
  const checkPIN = async PIN => {
    try {
      const secret = await loadWalletSalt();
      if (!secret || !secret.salt) {
        return false;
      }
      const hash = await hashPIN(PIN, secret.salt);
      if (!didMigrateToAskar(store.migration)) {
        await migrateToAskar(secret.id, hash);
        dispatch({
          type: DispatchAction.DID_MIGRATE_TO_ASKAR
        });
      }

      // NOTE: a custom wallet is used to check if the wallet key is correct. This is different from the wallet used in the rest of the app.
      // We create an AskarWallet instance and open the wallet with the given secret.
      const askarWallet = new AskarWallet(new ConsoleLogger(LogLevel.off), new agentDependencies.FileSystem(), new SigningProviderRegistry([]));
      await askarWallet.open({
        id: secret.id,
        key: hash
      });
      await askarWallet.close();
      const fullSecret = await secretForPIN(PIN, secret.salt);
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
    await wipeWalletKey(true);
  };
  const rekeyWallet = async (oldPin, newPin, useBiometry) => {
    try {
      // argon2.hash can sometimes generate an error
      const secret = await loadWalletSalt();
      if (!secret) {
        return false;
      }
      const oldHash = await hashPIN(oldPin, secret.salt);
      const newSecret = await secretForPIN(newPin);
      const newHash = await hashPIN(newPin, newSecret.salt);
      if (!newSecret.key) {
        return false;
      }
      await (agent === null || agent === void 0 ? void 0 : agent.wallet.close());
      await (agent === null || agent === void 0 ? void 0 : agent.wallet.rotateKey({
        id: secret.id,
        key: oldHash,
        rekey: newHash
      }));
      await storeWalletSecret(newSecret, useBiometry);
      setWalletSecret(newSecret);
    } catch {
      return false;
    }
    return true;
  };
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: {
      checkPIN,
      getWalletCredentials,
      removeSavedWalletSecret,
      disableBiometrics,
      commitPIN,
      setPIN,
      isBiometricsActive,
      rekeyWallet,
      walletSecret
    }
  }, children);
};
export const useAuth = () => useContext(AuthContext);
//# sourceMappingURL=auth.js.map