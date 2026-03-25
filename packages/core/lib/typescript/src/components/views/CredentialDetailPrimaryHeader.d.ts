import { BrandingOverlay } from '@bifold/oca';
import { BrandingOverlayType, CredentialOverlay } from '@bifold/oca/build/legacy';
import React from 'react';
import { DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
type CredentialDetailPrimaryHeaderProps = {
    overlay: CredentialOverlay<BrandingOverlay>;
    brandingOverlayType?: BrandingOverlayType;
    credential?: DidCommCredentialExchangeRecord;
};
declare const CredentialDetailPrimaryHeader: React.FC<CredentialDetailPrimaryHeaderProps>;
export default CredentialDetailPrimaryHeader;
//# sourceMappingURL=CredentialDetailPrimaryHeader.d.ts.map