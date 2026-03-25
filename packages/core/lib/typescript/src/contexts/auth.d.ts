import 'reflect-metadata';
import { Agent } from '@credo-ts/core';
import React from 'react';
import { WalletSecret } from '../types/security';
export interface AuthContext {
    lockOutUser: (reason: LockoutReason) => void;
    checkWalletPIN: (PIN: string) => Promise<boolean>;
    getWalletSecret: () => Promise<WalletSecret | undefined>;
    walletSecret?: WalletSecret;
    removeSavedWalletSecret: () => void;
    disableBiometrics: () => Promise<void>;
    setPIN: (PIN: string) => Promise<void>;
    commitWalletToKeychain: (useBiometry: boolean) => Promise<boolean>;
    isBiometricsActive: () => Promise<boolean>;
    verifyPIN: (PIN: string) => Promise<boolean>;
    rekeyWallet: (agent: Agent, oldPin: string, newPin: string, useBiometry?: boolean) => Promise<boolean>;
}
export declare const AuthContext: React.Context<AuthContext>;
export declare enum LockoutReason {
    Timeout = "Timeout",
    Logout = "Logout"
}
export declare const AuthProvider: React.FC<React.PropsWithChildren>;
export declare const useAuth: () => AuthContext;
//# sourceMappingURL=auth.d.ts.map