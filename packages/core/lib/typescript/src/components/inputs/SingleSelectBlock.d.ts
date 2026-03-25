import React from 'react';
export interface BlockSelection {
    value: string;
    id: string;
}
interface Props {
    selection: BlockSelection[];
    onSelect: (selected: BlockSelection) => void;
    initialSelect?: BlockSelection;
}
declare const SingleSelectBlock: React.FC<Props>;
export default SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.d.ts.map