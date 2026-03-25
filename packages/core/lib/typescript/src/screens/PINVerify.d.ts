import React from 'react';
type PINVerifyProps = {
    setAuthenticated: (...args: any[]) => void;
    usage?: PINEntryUsage;
    onCancelAuth?: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
};
export declare enum PINEntryUsage {
    PINCheck = 0,
    ChangeBiometrics = 1,
    ChangePIN = 2
}
declare const PINVerify: React.FC<PINVerifyProps>;
export default PINVerify;
//# sourceMappingURL=PINVerify.d.ts.map