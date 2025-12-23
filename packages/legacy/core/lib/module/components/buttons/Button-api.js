export let ButtonType = /*#__PURE__*/function (ButtonType) {
  ButtonType[ButtonType["Critical"] = 0] = "Critical";
  ButtonType[ButtonType["Primary"] = 1] = "Primary";
  ButtonType[ButtonType["Secondary"] = 2] = "Secondary";
  ButtonType[ButtonType["ModalCritical"] = 3] = "ModalCritical";
  ButtonType[ButtonType["ModalPrimary"] = 4] = "ModalPrimary";
  ButtonType[ButtonType["ModalSecondary"] = 5] = "ModalSecondary";
  ButtonType[ButtonType["SecondaryCritical"] = 6] = "SecondaryCritical";
  return ButtonType;
}({});
export let ButtonState = /*#__PURE__*/function (ButtonState) {
  ButtonState["Default"] = "default";
  ButtonState["Disabled"] = "disabled";
  ButtonState["Active"] = "active";
  return ButtonState;
}({});
export let ButtonStyleNames = /*#__PURE__*/function (ButtonStyleNames) {
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