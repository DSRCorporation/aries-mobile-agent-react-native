import React from 'react';
import { FormattedSubmission, OpenId4VPRequestRecord } from '../../types';
import { OpenIDCredentialRecord } from '../../credentialRecord';
interface OpenIdProofRequestDisplayProps {
    buttonsVisible: boolean;
    credential?: OpenId4VPRequestRecord;
    credentialsRequested: OpenIDCredentialRecord[];
    onPressAccept: (...args: any[]) => void;
    onPressAltCredChange: (inputDescriptorID: string, selectedCredID: string) => void;
    onPressDecline: (...args: any[]) => void;
    onPressDismiss: (...args: any[]) => void;
    selectedCredentialsSubmission?: SelectedCredentialsFormat;
    submission?: FormattedSubmission;
    verifierName: any;
}
interface SelectedCredentialsFormat {
    [inputDescriptorId: string]: {
        id: string;
        claimFormat: string;
    };
}
declare const OpenIdProofRequestDisplay: React.FC<OpenIdProofRequestDisplayProps>;
export default OpenIdProofRequestDisplay;
//# sourceMappingURL=OpenIDProofRequestDisplay.d.ts.map