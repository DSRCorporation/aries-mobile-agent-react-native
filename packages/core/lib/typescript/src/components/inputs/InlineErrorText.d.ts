import React from 'react';
import { InlineErrorConfig } from '../../types/error';
export declare enum InlineErrorType {
    error = 0,
    warning = 1
}
export interface InlineMessageProps {
    message: string;
    inlineType: InlineErrorType;
    config: InlineErrorConfig;
}
declare const InlineErrorText: React.FC<InlineMessageProps>;
export default InlineErrorText;
//# sourceMappingURL=InlineErrorText.d.ts.map