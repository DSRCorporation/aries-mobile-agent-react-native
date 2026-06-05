import React from 'react';
import { W3cCredentialDisplay } from '../types';
import { GenericFn } from '../../../types/fn';
import { ViewStyle } from 'react-native';
import { OpenIDCredentialRecord } from '../credentialRecord';
interface CredentialCardProps {
    credentialDisplay?: W3cCredentialDisplay;
    credentialRecord?: OpenIDCredentialRecord;
    onPress?: GenericFn;
    style?: ViewStyle;
}
declare const OpenIDCredentialCard: React.FC<CredentialCardProps>;
export default OpenIDCredentialCard;
//# sourceMappingURL=OpenIDCredentialCard.d.ts.map