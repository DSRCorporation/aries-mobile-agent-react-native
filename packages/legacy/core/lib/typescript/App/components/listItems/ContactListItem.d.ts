import type { ConnectionRecord } from '@credo-ts/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ContactStackParams, Screens } from '../../types/navigators';
interface Props {
    contact: ConnectionRecord;
    navigation: StackNavigationProp<ContactStackParams, Screens.Contacts>;
}
declare const ContactListItem: React.FC<Props>;
export default ContactListItem;
//# sourceMappingURL=ContactListItem.d.ts.map