import { BaseLogger } from '@credo-ts/core';
import { ProofRequestTemplate } from '@hyperledger/aries-bifold-verifier';
type ProofRequestTemplateFn = (useDevTemplates: boolean) => Array<ProofRequestTemplate>;
export declare const applyTemplateMarkers: (templates: any) => any;
export declare const applyDevRestrictions: (templates: ProofRequestTemplate[]) => ProofRequestTemplate[];
export interface ProofBundleResolverType {
    resolve: (acceptDevRestrictions: boolean) => Promise<ProofRequestTemplate[] | undefined>;
    resolveById: (templateId: string, acceptDevRestrictions: boolean) => Promise<ProofRequestTemplate | undefined>;
}
export declare const useRemoteProofBundleResolver: (indexFileBaseUrl: string | undefined, log?: BaseLogger) => ProofBundleResolverType;
export declare class RemoteProofBundleResolver implements ProofBundleResolverType {
    private remoteServer;
    private templateData;
    private log?;
    constructor(indexFileBaseUrl: string, log?: BaseLogger);
    resolve(acceptDevRestrictions: boolean): Promise<ProofRequestTemplate[] | undefined>;
    resolveById(templateId: string, acceptDevRestrictions: boolean): Promise<ProofRequestTemplate | undefined>;
}
export declare class DefaultProofBundleResolver implements ProofBundleResolverType {
    private proofRequestTemplates;
    constructor(proofRequestTemplates: ProofRequestTemplateFn | undefined);
    resolve(acceptDevRestrictions: boolean): Promise<ProofRequestTemplate[]>;
    resolveById(templateId: string, acceptDevRestrictions: boolean): Promise<ProofRequestTemplate | undefined>;
}
export {};
//# sourceMappingURL=proofBundle.d.ts.map