import { ProofRequestTemplate } from '@bifold/verifier';
import { BifoldLogger } from '../services/logger';
import { FileCache } from './fileCache';
type ProofRequestTemplateFn = (useDevTemplates: boolean) => Array<ProofRequestTemplate>;
export declare const applyTemplateMarkers: (templates: any) => any;
export declare const applyDevRestrictions: (templates: ProofRequestTemplate[]) => ProofRequestTemplate[];
export interface IProofBundleResolver {
    resolve: (acceptDevRestrictions: boolean) => Promise<ProofRequestTemplate[] | undefined>;
    resolveById: (templateId: string, acceptDevRestrictions: boolean) => Promise<ProofRequestTemplate | undefined>;
}
export declare const useRemoteProofBundleResolver: (indexFileBaseUrl: string | undefined, log?: BifoldLogger) => IProofBundleResolver;
export declare class RemoteProofBundleResolver extends FileCache implements IProofBundleResolver {
    private templateData;
    private cacheDataFileName;
    constructor(indexFileBaseUrl: string, log?: BifoldLogger);
    resolve(acceptDevRestrictions: boolean): Promise<ProofRequestTemplate[] | undefined>;
    resolveById(templateId: string, acceptDevRestrictions: boolean): Promise<ProofRequestTemplate | undefined>;
    checkForUpdates(): Promise<void>;
    private loadBundleIndex;
}
export declare class DefaultProofBundleResolver implements IProofBundleResolver {
    private proofRequestTemplates;
    constructor(proofRequestTemplates: ProofRequestTemplateFn | undefined);
    resolve(acceptDevRestrictions: boolean): Promise<ProofRequestTemplate[]>;
    resolveById(templateId: string, acceptDevRestrictions: boolean): Promise<ProofRequestTemplate | undefined>;
}
export {};
//# sourceMappingURL=proofBundle.d.ts.map