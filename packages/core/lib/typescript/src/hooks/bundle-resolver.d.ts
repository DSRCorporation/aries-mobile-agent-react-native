import { CredentialOverlay, Field, OCABundle, OCABundleResolveAllParams, OCABundleResolveDefaultParams, OCABundleResolvePresentationFieldsParams } from '@bifold/oca/build/legacy';
import { BaseOverlay, BrandingOverlay, LegacyBrandingOverlay } from '@bifold/oca';
type BundleResolverParams<T> = T extends CredentialOverlay<BrandingOverlay | BaseOverlay | LegacyBrandingOverlay> ? OCABundleResolveAllParams : T extends OCABundle ? OCABundleResolveDefaultParams : T extends Field[] ? OCABundleResolvePresentationFieldsParams : never;
export declare function useBranding<T extends CredentialOverlay<BrandingOverlay | BaseOverlay | LegacyBrandingOverlay> | OCABundle | Field>(params: BundleResolverParams<T>): {
    overlay: T;
};
export {};
//# sourceMappingURL=bundle-resolver.d.ts.map