"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePINValidation = void 0;
var _react = require("react");
var _reactI18next = require("react-i18next");
var _InlineErrorText = require("../components/inputs/InlineErrorText");
var _containerApi = require("../container-api");
var _PINValidation = require("../utils/PINValidation");
const initialModalState = {
  visible: false,
  title: '',
  message: ''
};
const usePINValidation = PIN => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    PINSecurity
  }, inlineMessages] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.INLINE_ERRORS]);
  const [inlineMessageField1, setInlineMessageField1] = (0, _react.useState)();
  const [inlineMessageField2, setInlineMessageField2] = (0, _react.useState)();
  const [modalState, setModalState] = (0, _react.useState)(initialModalState);
  const clearModal = (0, _react.useCallback)(() => {
    setModalState(initialModalState);
  }, []);
  const [PINValidations, setPINValidations] = (0, _react.useState)((0, _PINValidation.createPINValidations)(PIN, PINSecurity.rules));
  (0, _react.useEffect)(() => {
    setPINValidations((0, _PINValidation.createPINValidations)(PIN, PINSecurity.rules));
  }, [PIN, PINSecurity.rules]);
  const attentionMessage = (0, _react.useCallback)((title, message, pinOne) => {
    if (inlineMessages.enabled) {
      const config = {
        message: message,
        inlineType: _InlineErrorText.InlineErrorType.error,
        config: inlineMessages
      };
      if (pinOne) {
        setInlineMessageField1(config);
      } else {
        setInlineMessageField2(config);
      }
    } else {
      setModalState({
        visible: true,
        title: title,
        message: message,
        onModalDismiss: clearModal
      });
    }
  }, [inlineMessages, clearModal]);
  const comparePINEntries = (0, _react.useCallback)((pinOne, pinTwo) => {
    if (pinOne !== pinTwo) {
      attentionMessage(t('PINCreate.InvalidPIN'), t('PINCreate.PINsDoNotMatch'), false);
      return false;
    }
    return true;
  }, [attentionMessage, t]);
  const validatePINEntry = (0, _react.useCallback)((pinOne, pinTwo) => {
    const PINValidation = (0, _PINValidation.createPINValidations)(pinOne, PINSecurity.rules);
    for (const validation of PINValidation) {
      if (validation.isInvalid) {
        attentionMessage(t('PINCreate.InvalidPIN'), t(`PINCreate.Message.${validation.errorName}`, validation === null || validation === void 0 ? void 0 : validation.errorTextAddition), true);
        return false;
      }
    }
    return pinTwo ? comparePINEntries(pinOne, pinTwo) : true;
  }, [t, attentionMessage, PINSecurity.rules, comparePINEntries]);
  return {
    PINValidations,
    validatePINEntry,
    inlineMessageField1,
    inlineMessageField2,
    modalState,
    setModalState,
    clearModal,
    PINSecurity,
    comparePINEntries,
    setInlineMessageField1,
    setInlineMessageField2
  };
};
exports.usePINValidation = usePINValidation;
//# sourceMappingURL=usePINValidation.js.map