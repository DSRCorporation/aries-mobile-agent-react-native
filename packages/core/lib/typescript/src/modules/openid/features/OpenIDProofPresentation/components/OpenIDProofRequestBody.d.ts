import React from 'react';
import { FormattedSubmission } from '../../../types';
import { type SelectedCredentialsFormat } from '../../../types';
import type { OpenIDCredentialRecord } from '../../../credentialRecord';
interface OpenIDProofRequestBodyProps {
    credentialsRequested: OpenIDCredentialRecord[];
    onPressAltCredChange: (inputDescriptorID: string, selectedCredID: string) => void;
    selectedCredentialsSubmission?: SelectedCredentialsFormat;
    submission?: FormattedSubmission;
    verifierName: string;
}
declare const OpenIDProofRequestBody: React.FC<OpenIDProofRequestBodyProps>;
export default OpenIDProofRequestBody;
//# sourceMappingURL=OpenIDProofRequestBody.d.ts.map