import { CredentialExchangeRecord } from '@credo-ts/core';
import { Attribute, Predicate } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
import { ViewStyle } from 'react-native';
import { GenericFn } from '../../types/fn';
interface CredentialCard11Props {
    credential?: CredentialExchangeRecord;
    onPress?: GenericFn;
    style?: ViewStyle;
    displayItems?: (Attribute | Predicate)[];
    revoked?: boolean;
    error?: boolean;
    predicateError?: boolean;
    elevated?: boolean;
    credName?: string;
    credDefId?: string;
    schemaId?: string;
    proof?: boolean;
    hasAltCredentials?: boolean;
    handleAltCredChange?: () => void;
}
declare const CredentialCard11: React.FC<CredentialCard11Props>;
export default CredentialCard11;
//# sourceMappingURL=CredentialCard11.d.ts.map