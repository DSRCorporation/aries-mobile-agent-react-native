import React from 'react';
import { HistoryBlockSelection } from '../../types';
interface Props {
    selection: HistoryBlockSelection[] | undefined;
    onSelect: (selected: HistoryBlockSelection) => void;
    initialSelect?: HistoryBlockSelection;
    color?: string;
}
declare const SingleSelectBlock: React.FC<Props>;
export default SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.d.ts.map