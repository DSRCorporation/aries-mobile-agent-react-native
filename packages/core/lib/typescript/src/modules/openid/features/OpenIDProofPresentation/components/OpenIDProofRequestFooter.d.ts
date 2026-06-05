import React from 'react';
import { type SelectedCredentialsFormat } from '../../../types';
import { OpenId4VPRequestRecord, FormattedSubmission } from '../../../types';
interface OpenIDProofPresentationFooterProps {
    buttonsVisible: boolean;
    credential?: OpenId4VPRequestRecord;
    onPressAccept: (...args: any[]) => void;
    onPressDecline: (...args: any[]) => void;
    onPressDismiss: (...args: any[]) => void;
    selectedCredentialsSubmission?: SelectedCredentialsFormat;
    submission?: FormattedSubmission;
}
declare const OpenIDProofPresentationFooter: React.FC<OpenIDProofPresentationFooterProps>;
export default OpenIDProofPresentationFooter;
//# sourceMappingURL=OpenIDProofRequestFooter.d.ts.map