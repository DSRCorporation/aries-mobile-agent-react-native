export let RefreshStatus = /*#__PURE__*/function (RefreshStatus) {
  RefreshStatus["Valid"] = "valid";
  RefreshStatus["Invalid"] = "invalid";
  RefreshStatus["Error"] = "error";
  return RefreshStatus;
}({});

/**
 * Controls how invalid OpenID credentials are handled after status checks.
 * - InvalidThenOnDemand: show invalid notification; replacement is attempted on user action.
 * - FullReplacement: orchestrator attempts replacement immediately and surfaces replacement notification when available.
 */
export let OpenIDCredentialRefreshFlowType = /*#__PURE__*/function (OpenIDCredentialRefreshFlowType) {
  OpenIDCredentialRefreshFlowType["InvalidThenOnDemand"] = "invalid-then-on-demand";
  OpenIDCredentialRefreshFlowType["FullReplacement"] = "full-replacement";
  return OpenIDCredentialRefreshFlowType;
}({});
export let OpenIDCustomNotificationType = /*#__PURE__*/function (OpenIDCustomNotificationType) {
  OpenIDCustomNotificationType["CredentialReplacementAvailable"] = "CustomNotificationOpenIDCredential";
  OpenIDCustomNotificationType["CredentialExpired"] = "CredentialExpired";
  return OpenIDCustomNotificationType;
}({});
//# sourceMappingURL=types.js.map