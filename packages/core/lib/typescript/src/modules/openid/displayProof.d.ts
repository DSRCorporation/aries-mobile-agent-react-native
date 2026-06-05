import { type DcqlQueryResult, type DifPexCredentialsForRequest } from '@credo-ts/core';
import { FormattedSubmission, OpenId4VPRequestRecord } from './types';
export declare function formatDcqlCredentialsForRequest(queryResult: DcqlQueryResult): FormattedSubmission;
export declare function formatDifPexCredentialsForRequest(credentialsForRequest: DifPexCredentialsForRequest): FormattedSubmission;
export declare function formatOpenIdProofRequest(record: OpenId4VPRequestRecord): FormattedSubmission | undefined;
//# sourceMappingURL=displayProof.d.ts.map