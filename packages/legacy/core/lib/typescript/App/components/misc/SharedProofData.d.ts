import { GroupedSharedProofDataItem } from '@hyperledger/aries-bifold-verifier';
import React from 'react';
interface SharedProofDataProps {
    recordId: string;
    onSharedProofDataLoad?: (sharedProofData: GroupedSharedProofDataItem[]) => void;
}
declare const SharedProofData: React.FC<SharedProofDataProps>;
export default SharedProofData;
//# sourceMappingURL=SharedProofData.d.ts.map