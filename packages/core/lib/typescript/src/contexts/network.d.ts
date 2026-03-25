import React, { PropsWithChildren } from 'react';
export interface NetworkContext {
    silentAssertConnectedNetwork: () => boolean | null;
    assertNetworkConnected: () => boolean;
    displayNetInfoModal: () => void;
    hideNetInfoModal: () => void;
    assertInternetReachable: () => boolean | null;
}
export declare const NetworkContext: React.Context<NetworkContext>;
export declare const NetworkProvider: ({ children }: PropsWithChildren) => React.JSX.Element;
export declare const useNetwork: () => NetworkContext;
//# sourceMappingURL=network.d.ts.map