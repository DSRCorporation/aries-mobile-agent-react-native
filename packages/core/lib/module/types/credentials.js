export let CredentialErrors = /*#__PURE__*/function (CredentialErrors) {
  CredentialErrors[CredentialErrors["Revoked"] = 0] = "Revoked";
  // Credential has been revoked
  CredentialErrors[CredentialErrors["NotInWallet"] = 1] = "NotInWallet";
  // Credential requested for proof does not exists in users wallet
  CredentialErrors[CredentialErrors["PredicateError"] = 2] = "PredicateError"; // Credential requested for proof contains a predicate match that is not satisfied
  return CredentialErrors;
}({});
//# sourceMappingURL=credentials.js.map