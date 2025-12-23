import React from 'react';
interface Action {
    text: string;
    icon: React.FC;
    onPress: () => void;
}
interface Props {
    actions: Action[] | undefined;
    onDismiss: () => void;
}
declare const ActionSlider: React.FC<Props>;
export default ActionSlider;
//# sourceMappingURL=ActionSlider.d.ts.map