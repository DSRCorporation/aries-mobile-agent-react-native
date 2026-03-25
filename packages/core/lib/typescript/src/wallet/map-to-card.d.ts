import { DidCommCredentialExchangeRecord as CredentialExchangeRecord } from '@credo-ts/didcomm';
import { WalletCredentialCardData, AnonCredsBundleLite, W3CInput, MapOpts } from './ui-types';
import { Attribute, BrandingOverlayType, CredentialOverlay, OCABundleResolverType, Predicate } from '@bifold/oca/build/legacy';
import { BrandingOverlay } from '@bifold/oca';
import { CredentialErrors, GenericCredentialExchangeRecord } from '../types/credentials';
import { IColorPalette } from '../theme';
export declare const brandingOverlayTypeString: (type: BrandingOverlayType) => "Branding01" | "Branding10" | "Branding11";
export declare function mapAnonCredsToCard(rec: CredentialExchangeRecord, bundle: AnonCredsBundleLite, opts?: MapOpts): WalletCredentialCardData;
export declare function mapW3CToCard(input: W3CInput, id: string): WalletCredentialCardData;
/**
 * Generic map function to convert a CredentialExchangeRecord (AnonCreds or W3C) to WalletCredentialCardData
 * Uses OCA bundle resolver to fetch overlays as needed.
 * If a brandingOverlay is provided, it will be used instead of resolving a new one.
 * If proof=true, will map in proof context (limited attributes, no PII, no primary/secondary ordering).
 */
export interface GenericCardMapInput {
    credential: GenericCredentialExchangeRecord;
    bundleResolver: OCABundleResolverType;
    colorPalette: IColorPalette;
    unknownIssuerName: string;
    brandingOverlay?: CredentialOverlay<BrandingOverlay>;
    proof?: boolean;
    credentialErrors?: CredentialErrors[];
    credName?: string;
    credentialConnectionLabel?: string;
    displayItems?: (Attribute | Predicate)[];
}
export declare function mapCredentialTypeToCard({ credential, bundleResolver, colorPalette, unknownIssuerName, brandingOverlay, proof, credentialErrors, credName, credentialConnectionLabel, displayItems, }: GenericCardMapInput): Promise<WalletCredentialCardData | undefined>;
//# sourceMappingURL=map-to-card.d.ts.map