"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDifPexCredentialsForRequest = formatDifPexCredentialsForRequest;
var _core = require("@credo-ts/core");
var _display = require("./display");
function formatDifPexCredentialsForRequest(credentialsForRequest) {
  const entries = credentialsForRequest.requirements.flatMap(requirement => {
    return requirement.submissionEntry.map(submission => {
      return {
        inputDescriptorId: submission.inputDescriptorId,
        name: submission.name ?? 'Unknown',
        purpose: submission.purpose,
        description: submission.purpose,
        isSatisfied: submission.verifiableCredentials.length >= 1,
        credentials: submission.verifiableCredentials.map(verifiableCredential => {
          const {
            display,
            attributes,
            metadata,
            claimFormat
          } = (0, _display.getCredentialForDisplay)(verifiableCredential.credentialRecord);
          let disclosedPayload = attributes;
          if (verifiableCredential.claimFormat === _core.ClaimFormat.SdJwtDc) {
            disclosedPayload = (0, _display.filterAndMapSdJwtKeys)(verifiableCredential.disclosedPayload).visibleProperties;
          } else if (verifiableCredential.claimFormat === _core.ClaimFormat.MsoMdoc) {
            disclosedPayload = Object.fromEntries(Object.values(verifiableCredential.disclosedPayload).flatMap(entry => Object.entries(entry)));
          }
          return {
            id: verifiableCredential.credentialRecord.id,
            credentialName: display.name,
            issuerName: display.issuer.name,
            requestedAttributes: [...Object.keys(disclosedPayload)],
            disclosedPayload,
            metadata,
            backgroundColor: display.backgroundColor,
            textColor: display.textColor,
            backgroundImage: display.backgroundImage,
            claimFormat
          };
        })
      };
    });
  });
  return {
    areAllSatisfied: entries.every(entry => entry.isSatisfied),
    name: credentialsForRequest.name ?? 'Unknown',
    purpose: credentialsForRequest.purpose,
    entries
  };
}
//# sourceMappingURL=displayProof.js.map