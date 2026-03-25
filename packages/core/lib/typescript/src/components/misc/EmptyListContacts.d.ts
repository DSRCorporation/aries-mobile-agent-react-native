import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ContactStackParams, Screens } from '../../types/navigators';
export interface EmptyListProps {
    navigation: StackNavigationProp<ContactStackParams, Screens.Contacts>;
}
declare const EmptyListContacts: React.FC<EmptyListProps>;
export default EmptyListContacts;
//# sourceMappingURL=EmptyListContacts.d.ts.map