import { BrandingOverlay } from '@bifold/oca';
import { BrandingOverlayType, CredentialOverlay } from '@bifold/oca/build/legacy';
import React from 'react';
interface Props {
    overlay: CredentialOverlay<BrandingOverlay>;
    overlayType: BrandingOverlayType;
    hasBody: boolean;
    proof?: boolean;
}
declare const CredentialIssuerBody: React.FC<Props>;
export default CredentialIssuerBody;
//# sourceMappingURL=CredentialCard11Issuer.d.ts.map