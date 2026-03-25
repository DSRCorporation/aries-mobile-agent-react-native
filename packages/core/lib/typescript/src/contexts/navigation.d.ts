import type { useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
export interface NavContainerProps extends React.PropsWithChildren {
    navigationRef: ReturnType<typeof useNavigationContainerRef> | null;
}
declare const NavContainer: ({ navigationRef, children }: NavContainerProps) => React.JSX.Element;
export default NavContainer;
//# sourceMappingURL=navigation.d.ts.map