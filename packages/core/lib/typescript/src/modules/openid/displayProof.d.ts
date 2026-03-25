import { ClaimFormat, type DifPexCredentialsForRequest } from '@credo-ts/core';
import { type CredentialMetadata, type DisplayImage } from './display';
export interface FormattedSubmission {
    name: string;
    purpose?: string;
    areAllSatisfied: boolean;
    entries: FormattedSubmissionEntry[];
}
export type FormattedSelectedCredentialEntry = {
    id: string;
    credentialName: string;
    issuerName?: string;
    requestedAttributes?: string[];
    disclosedPayload?: Record<string, unknown>;
    metadata?: CredentialMetadata;
    backgroundColor?: string;
    backgroundImage?: DisplayImage;
    textColor?: string;
    claimFormat: ClaimFormat | 'AnonCreds';
};
export interface FormattedSubmissionEntry {
    /** can be either AnonCreds groupName or PEX inputDescriptorId */
    inputDescriptorId: string;
    isSatisfied: boolean;
    name: string;
    purpose?: string;
    description?: string;
    credentials: Array<FormattedSelectedCredentialEntry>;
}
export declare function formatDifPexCredentialsForRequest(credentialsForRequest: DifPexCredentialsForRequest): FormattedSubmission;
//# sourceMappingURL=displayProof.d.ts.map