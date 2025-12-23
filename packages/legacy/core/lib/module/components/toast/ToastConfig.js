import React from 'react';
import BaseToast, { ToastType } from './BaseToast';
export const Config = {
  success: props => /*#__PURE__*/React.createElement(BaseToast, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: ToastType.Success
  }),
  warn: props => /*#__PURE__*/React.createElement(BaseToast, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: ToastType.Warn,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  }),
  error: props => /*#__PURE__*/React.createElement(BaseToast, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: ToastType.Error,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  }),
  info: props => /*#__PURE__*/React.createElement(BaseToast, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: ToastType.Info,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  })
};
export default Config;
//# sourceMappingURL=ToastConfig.js.map