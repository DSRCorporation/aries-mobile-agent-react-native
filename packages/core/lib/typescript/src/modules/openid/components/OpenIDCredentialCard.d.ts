import React from 'react';
import { W3cCredentialDisplay } from '../types';
import { GenericFn } from '../../../types/fn';
import { ViewStyle } from 'react-native';
import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
interface CredentialCardProps {
    credentialDisplay?: W3cCredentialDisplay;
    credentialRecord?: W3cCredentialRecord | SdJwtVcRecord | MdocRecord;
    onPress?: GenericFn;
    style?: ViewStyle;
}
declare const OpenIDCredentialCard: React.FC<CredentialCardProps>;
export default OpenIDCredentialCard;
//# sourceMappingURL=OpenIDCredentialCard.d.ts.map