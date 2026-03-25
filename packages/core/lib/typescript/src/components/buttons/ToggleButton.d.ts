import React from 'react';
interface ToggleButtonProps {
    isEnabled: boolean;
    isAvailable: boolean;
    toggleAction: () => void;
    testID?: string;
    enabledIcon?: string;
    disabledIcon?: string;
    disabled?: boolean;
}
declare const ToggleButton: React.FC<ToggleButtonProps>;
export default ToggleButton;
//# sourceMappingURL=ToggleButton.d.ts.map