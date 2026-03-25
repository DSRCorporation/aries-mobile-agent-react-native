import React, { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';
import { Screens } from '../types/navigators';
export interface LayoutProps {
    safeArea?: boolean;
    customEdges?: Edge[];
    style?: ViewStyle;
    Header?: React.FC | undefined;
}
type Props = {
    screen: Screens;
};
declare const ScreenLayout: React.FC<PropsWithChildren<Props>>;
export default ScreenLayout;
//# sourceMappingURL=ScreenLayout.d.ts.map