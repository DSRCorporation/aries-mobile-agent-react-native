import Keychain from 'react-native-keychain';
import { KeychainServices } from '../constants';
import { WalletSecret } from '../types/security';
import { LoginAttempt } from '../types/state';
export interface WalletSalt {
    id: string;
    salt: string;
}
export interface WalletKey {
    key: string;
}
export declare const optionsForKeychainAccess: (service: KeychainServices, useBiometrics?: boolean) => Keychain.Options;
export declare const secretForPIN: (PIN: string, salt?: string) => Promise<WalletSecret>;
export declare const wipeWalletKey: (useBiometrics: boolean) => Promise<void>;
export declare const storeWalletKey: (secret: WalletKey, useBiometrics?: boolean) => Promise<boolean>;
export declare const storeWalletSalt: (secret: WalletSalt) => Promise<boolean>;
export declare const storeLoginAttempt: (loginAttempt: LoginAttempt) => Promise<boolean>;
export declare const storeWalletSecret: (secret: WalletSecret, useBiometrics?: boolean) => Promise<boolean>;
export declare const loadWalletSalt: () => Promise<WalletSalt | undefined>;
export declare const loadLoginAttempt: () => Promise<LoginAttempt | undefined>;
export declare const loadWalletKey: (title?: string, description?: string) => Promise<WalletKey | undefined>;
export declare const loadWalletSecret: (title?: string, description?: string) => Promise<{
    secret: WalletSecret | undefined;
    err: string;
}>;
export declare const isBiometricsActive: () => Promise<boolean>;
//# sourceMappingURL=keychain.d.ts.map