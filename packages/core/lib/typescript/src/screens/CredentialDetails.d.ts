import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ContactStackParams, NotificationStackParams, RootStackParams, Screens } from '../types/navigators';
type CredentialDetailsProps = StackScreenProps<RootStackParams & ContactStackParams & NotificationStackParams, Screens.CredentialDetails>;
declare const CredentialDetails: React.FC<CredentialDetailsProps>;
export default CredentialDetails;
//# sourceMappingURL=CredentialDetails.d.ts.map