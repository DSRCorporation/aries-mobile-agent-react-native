import { CredentialExchangeRecord } from '@credo-ts/core';
import { Attribute, Predicate } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
import { ViewStyle } from 'react-native';
import { GenericFn } from '../../types/fn';
export interface CredentialCardProps {
    credential?: CredentialExchangeRecord;
    credDefId?: string;
    schemaId?: string;
    credName?: string;
    onPress?: GenericFn;
    style?: ViewStyle;
    proof?: boolean;
    displayItems?: (Attribute | Predicate)[];
    existsInWallet?: boolean;
    satisfiedPredicates?: boolean;
    hasAltCredentials?: boolean;
    handleAltCredChange?: () => void;
}
declare const CredentialCard: React.FC<CredentialCardProps>;
export default CredentialCard;
//# sourceMappingURL=CredentialCard.d.ts.map