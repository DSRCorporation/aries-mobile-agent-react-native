import type { DidCommConnectionRecord } from '@credo-ts/didcomm';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ContactStackParams, Screens } from '../../types/navigators';
export interface ContactListItemProps {
    contact: DidCommConnectionRecord;
    navigation: StackNavigationProp<ContactStackParams, Screens.Contacts>;
}
declare const ContactListItem: React.FC<ContactListItemProps>;
export default ContactListItem;
//# sourceMappingURL=ContactListItem.d.ts.map