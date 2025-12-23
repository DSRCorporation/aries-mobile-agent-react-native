import * as React from 'react';
export interface NetworkContext {
    silentAssertConnectedNetwork: () => boolean;
    assertConnectedNetwork: () => boolean;
    displayNetInfoModal: () => void;
    hideNetInfoModal: () => void;
    assertLedgerConnectivity: () => Promise<boolean>;
}
export declare const NetworkContext: React.Context<NetworkContext>;
export declare const NetworkProvider: React.FC<React.PropsWithChildren>;
export declare const useNetwork: () => NetworkContext;
//# sourceMappingURL=network.d.ts.map