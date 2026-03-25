import React from 'react';
export interface BiometryControlProps {
    biometryEnabled: boolean;
    onBiometryToggle: (newValue: boolean) => void;
    children?: React.ReactNode;
}
declare const BiometryControl: React.FC<BiometryControlProps>;
export default BiometryControl;
//# sourceMappingURL=BiometryControl.d.ts.map