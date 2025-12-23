import React from 'react';
interface PINEnterProps {
    setAuthenticated: (status: boolean) => void;
    usage?: PINEntryUsage;
}
export declare enum PINEntryUsage {
    PINCheck = 0,
    WalletUnlock = 1
}
declare const PINEnter: React.FC<PINEnterProps>;
export default PINEnter;
//# sourceMappingURL=PINEnter.d.ts.map