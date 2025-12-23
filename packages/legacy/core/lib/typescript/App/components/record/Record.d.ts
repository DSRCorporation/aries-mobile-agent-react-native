import { Field } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
export interface RecordProps {
    header?: () => React.ReactElement | null;
    footer?: () => React.ReactElement | null;
    fields: Field[];
    hideFieldValues?: boolean;
    field?: (field: Field, index: number, fields: Field[]) => React.ReactElement | null;
}
declare const Record: React.FC<RecordProps>;
export default Record;
//# sourceMappingURL=Record.d.ts.map