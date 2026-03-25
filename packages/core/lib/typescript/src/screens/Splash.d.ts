import React from 'react';
import { WalletSecret } from '../types/security';
export type SplashProps = {
    initializeAgent: (walletSecret: WalletSecret) => Promise<void>;
};
/**
 * This Splash screen is shown in two scenarios: initial load of the app,
 * and during agent initialization after login
 */
declare const Splash: React.FC<SplashProps>;
export default Splash;
//# sourceMappingURL=Splash.d.ts.map