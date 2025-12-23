import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Screens } from '../types/navigators';
interface PINCreateProps extends StackScreenProps<ParamListBase, Screens.CreatePIN> {
    setAuthenticated: (status: boolean) => void;
}
declare const PINCreate: React.FC<PINCreateProps>;
export default PINCreate;
//# sourceMappingURL=PINCreate.d.ts.map