import { Agent, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
export type OpenID4VCIParam = {
    agent: Agent;
    data?: string;
    uri?: string;
};
export declare const receiveCredentialFromOpenId4VciOffer: ({ agent, data, uri }: OpenID4VCIParam) => Promise<W3cCredentialRecord | SdJwtVcRecord>;
//# sourceMappingURL=resolver.d.ts.map