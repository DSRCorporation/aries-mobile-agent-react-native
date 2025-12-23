import { Attribute, Field } from '@hyperledger/aries-oca/build/legacy';
import React from 'react';
interface RecordFieldProps {
    field: Field;
    hideFieldValue?: boolean;
    hideBottomBorder?: boolean;
    shown?: boolean;
    onToggleViewPressed?: () => void;
    fieldLabel?: (field: Field) => React.ReactElement | null;
    fieldValue?: (field: Field) => React.ReactElement | null;
}
export declare const validEncoding = "base64";
export declare const validFormat: RegExp;
interface AttributeValueParams {
    field: Attribute;
    shown?: boolean;
    style?: Record<string, unknown>;
}
export declare const AttributeValue: React.FC<AttributeValueParams>;
declare const RecordField: React.FC<RecordFieldProps>;
export default RecordField;
//# sourceMappingURL=RecordField.d.ts.map