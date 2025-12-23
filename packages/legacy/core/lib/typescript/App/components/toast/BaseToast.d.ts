import React from 'react';
import { GenericFn } from '../../types/fn';
interface BaseToastProps {
    title?: string;
    body?: string;
    toastType: string;
    onPress?: GenericFn;
    onShow?: GenericFn;
    onHide?: GenericFn;
}
export declare enum ToastType {
    Success = "success",
    Info = "info",
    Warn = "warn",
    Error = "error"
}
declare const BaseToast: React.FC<BaseToastProps>;
export default BaseToast;
//# sourceMappingURL=BaseToast.d.ts.map