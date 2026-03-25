"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonType = exports.ButtonStyleNames = exports.ButtonState = void 0;
let ButtonType = exports.ButtonType = /*#__PURE__*/function (ButtonType) {
  ButtonType[ButtonType["Critical"] = 0] = "Critical";
  ButtonType[ButtonType["Primary"] = 1] = "Primary";
  ButtonType[ButtonType["Secondary"] = 2] = "Secondary";
  ButtonType[ButtonType["Tertiary"] = 3] = "Tertiary";
  ButtonType[ButtonType["ModalCritical"] = 4] = "ModalCritical";
  ButtonType[ButtonType["ModalPrimary"] = 5] = "ModalPrimary";
  ButtonType[ButtonType["ModalSecondary"] = 6] = "ModalSecondary";
  ButtonType[ButtonType["SecondaryCritical"] = 7] = "SecondaryCritical";
  ButtonType[ButtonType["ModalTertiary"] = 8] = "ModalTertiary";
  return ButtonType;
}({});
let ButtonState = exports.ButtonState = /*#__PURE__*/function (ButtonState) {
  ButtonState["Default"] = "default";
  ButtonState["Disabled"] = "disabled";
  ButtonState["Active"] = "active";
  return ButtonState;
}({});
let ButtonStyleNames = exports.ButtonStyleNames = /*#__PURE__*/function (ButtonStyleNames) {
  ButtonStyleNames["Critical_Default"] = "Critical_default";
  ButtonStyleNames["Critical_Disabled"] = "Critical_disabled";
  ButtonStyleNames["Critical_Active"] = "Critical_active";
  return ButtonStyleNames;
}({});
/*
type stylesType = { readonly [key in ButtonStyleNames]?: ViewStyle | TextStyle | ImageStyle}
const styles: stylesType = StyleSheet.create({
  [ButtonStyleNames.Critical_Default]: {},
  [ButtonType.Secondary]: {},
  [ButtonType.ModalCritical]: {},
  [ButtonType.ModalPrimary]: {},
  [ButtonType.ModalSecondary]: {},
  [ButtonType.SecondaryCritical]: {},
})
*/
//# sourceMappingURL=Button-api.js.map