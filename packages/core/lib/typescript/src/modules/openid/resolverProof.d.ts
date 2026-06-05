import { Agent } from '@credo-ts/core';
import { ParseInvitationResult } from '../../utils/parsers';
import { OpenId4VPRequestRecord } from './types';
import { BifoldAgent } from '../../utils/agent';
type SelectedProofCredentials = Record<string, {
    id: string;
    claimFormat: string;
}>;
export declare function fetchInvitationDataUrl(dataUrl: string): Promise<ParseInvitationResult>;
/**
 * Entry point for the OpenID4VP flow after QR scanning / deeplink / paste handling
 * has identified an OpenID authorization request.
 *
 * This is the resolve phase only:
 * - accept the raw request string coming from scan/deeplink handling
 * - ask Credo to resolve the request into PEX or DCQL details
 * - return a record that the proof UI can render
 *
 * It does not send anything to the verifier. The later submit phase is handled by
 * {@link shareProof}, after the user explicitly opts in to share credentials.
 */
export declare const getCredentialsForProofRequest: ({ agent, request, }: {
    agent: BifoldAgent;
    request: string;
}) => Promise<OpenId4VPRequestRecord | undefined>;
/**
 * Submit phase for OpenID4VP after the user has reviewed the request and chosen
 * which credentials to share.
 *
 * This function takes:
 * - the resolved request record created by {@link getCredentialsForProofRequest}
 * - the user's final credential selections from the proof UI
 *
 * It then maps those selections into the Credo input expected for either
 * presentation exchange or DCQL and submits the authorization response.
 */
export declare const shareProof: ({ agent, requestRecord, selectedProofCredentials, }: {
    agent: Agent;
    requestRecord: OpenId4VPRequestRecord;
    selectedProofCredentials: SelectedProofCredentials;
}) => Promise<any>;
export {};
//# sourceMappingURL=resolverProof.d.ts.map