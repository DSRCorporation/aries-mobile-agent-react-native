import '@hyperledger/aries-askar-react-native';
import 'reflect-metadata';
import React from 'react';
import { WalletSecret } from '../types/security';
export interface AuthContext {
    checkPIN: (PIN: string) => Promise<boolean>;
    getWalletCredentials: () => Promise<WalletSecret | undefined>;
    walletSecret?: WalletSecret;
    removeSavedWalletSecret: () => void;
    disableBiometrics: () => Promise<void>;
    setPIN: (PIN: string) => Promise<void>;
    commitPIN: (useBiometry: boolean) => Promise<boolean>;
    isBiometricsActive: () => Promise<boolean>;
    rekeyWallet: (oldPin: string, newPin: string, useBiometry?: boolean) => Promise<boolean>;
}
export declare const AuthContext: React.Context<AuthContext>;
export declare const AuthProvider: React.FC<React.PropsWithChildren>;
export declare const useAuth: () => AuthContext;
//# sourceMappingURL=auth.d.ts.map