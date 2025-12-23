import { Field } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
import { ViewStyle } from 'react-native';
interface VerifierCredentialCardProps {
    style?: ViewStyle;
    displayItems?: Field[];
    elevated?: boolean;
    credDefId?: string;
    schemaId: string;
    preview?: boolean;
    onChangeValue?: (schema: string, label: string, name: string, value: string) => void;
}
/**
 * This component is meant to be used in the ProofRequestDetails screen to show what
 * a proof request will look like with proper branding etc. and allow for the changing
 * of predicate values. It is a greatly trimmed-down version of the CredentialCard11.
 */
declare const VerifierCredentialCard: React.FC<VerifierCredentialCardProps>;
export default VerifierCredentialCard;
//# sourceMappingURL=VerifierCredentialCard.d.ts.map