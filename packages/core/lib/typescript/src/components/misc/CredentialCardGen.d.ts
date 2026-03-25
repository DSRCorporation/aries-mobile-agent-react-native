import React from 'react';
import type { ViewStyle } from 'react-native';
import { BrandingOverlay } from '@bifold/oca';
import { Attribute, CredentialOverlay, Predicate } from '@bifold/oca/build/legacy';
import type { GenericFn } from '../../types/fn';
import type { CredentialErrors, GenericCredentialExchangeRecord } from '../../types/credentials';
export interface CredentialCardProps {
    credential?: GenericCredentialExchangeRecord;
    credDefId?: string;
    schemaId?: string;
    credName?: string;
    onPress?: GenericFn;
    style?: ViewStyle;
    proof?: boolean;
    displayItems?: (Attribute | Predicate)[];
    hasAltCredentials?: boolean;
    credentialErrors?: CredentialErrors[];
    handleAltCredChange?: () => void;
    brandingOverlay?: CredentialOverlay<BrandingOverlay>;
}
declare const CredentialCardGen: React.FC<CredentialCardProps>;
export default CredentialCardGen;
//# sourceMappingURL=CredentialCardGen.d.ts.map