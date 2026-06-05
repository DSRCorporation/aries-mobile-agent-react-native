import { ClaimFormat } from '@credo-ts/core';
import { filterAndMapSdJwtKeys, getCredentialForDisplay } from './display';
const asRecord = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const flattenMdocDisclosedPayload = value => Object.fromEntries(Object.values(asRecord(value)).flatMap(entry => entry && typeof entry === 'object' && !Array.isArray(entry) ? Object.entries(entry) : []));
const getDcqlClaimFormat = record => {
  switch (record.type) {
    case 'MdocRecord':
      return ClaimFormat.MsoMdoc;
    case 'SdJwtVcRecord':
      return ClaimFormat.SdJwtDc;
    default:
      return record.firstCredential.claimFormat;
  }
};
const getDcqlDisclosedPayload = validCredential => {
  const output = validCredential.claims.valid_claim_sets[0].output;
  if (validCredential.record.type === 'MdocRecord') {
    return flattenMdocDisclosedPayload(output);
  }
  if (validCredential.record.type === 'SdJwtVcRecord') {
    return filterAndMapSdJwtKeys(asRecord(output)).visibleProperties;
  }
  return asRecord(output);
};
const formatDcqlClaimPath = path => path.filter(item => item !== null).join('.');
const getDcqlRequestedAttributes = credentialQuery => {
  var _credentialQuery$clai2;
  if (credentialQuery.format === 'mso_mdoc') {
    var _credentialQuery$clai;
    return ((_credentialQuery$clai = credentialQuery.claims) === null || _credentialQuery$clai === void 0 ? void 0 : _credentialQuery$clai.map(claim => 'path' in claim ? formatDcqlClaimPath(claim.path) : [claim.namespace, claim.claim_name].join('.'))) ?? [];
  }
  return ((_credentialQuery$clai2 = credentialQuery.claims) === null || _credentialQuery$clai2 === void 0 ? void 0 : _credentialQuery$clai2.map(claim => formatDcqlClaimPath(claim.path))) ?? [];
};
const getDcqlCredentialName = credentialQuery => {
  if (credentialQuery.format === 'mso_mdoc') {
    var _credentialQuery$meta;
    return ((_credentialQuery$meta = credentialQuery.meta) === null || _credentialQuery$meta === void 0 ? void 0 : _credentialQuery$meta.doctype_value) ?? credentialQuery.id;
  }
  if (credentialQuery.format === 'vc+sd-jwt' && credentialQuery.meta && 'vct_values' in credentialQuery.meta || credentialQuery.format === 'dc+sd-jwt') {
    var _credentialQuery$meta2;
    return credentialQuery.meta && 'vct_values' in credentialQuery.meta && (_credentialQuery$meta2 = credentialQuery.meta.vct_values) !== null && _credentialQuery$meta2 !== void 0 && _credentialQuery$meta2[0] ? credentialQuery.meta.vct_values[0].replace('https://', '') : credentialQuery.id;
  }
  return credentialQuery.id;
};
export function formatDcqlCredentialsForRequest(queryResult) {
  const credentialSets = queryResult.credential_sets ?? [{
    required: true,
    options: [queryResult.credentials.map(credential => credential.id)],
    matching_options: queryResult.can_be_satisfied ? [queryResult.credentials.map(credential => credential.id)] : undefined
  }];
  const entries = credentialSets.flatMap(credentialSet => {
    var _credentialSet$matchi;
    const credentialIds = ((_credentialSet$matchi = credentialSet.matching_options) === null || _credentialSet$matchi === void 0 ? void 0 : _credentialSet$matchi[0]) ?? credentialSet.options[0];
    return credentialIds.map(credentialId => {
      const credentialQuery = queryResult.credentials.find(credential => credential.id === credentialId);
      if (!credentialQuery) {
        throw new Error(`Credential '${credentialId}' not found in dcql query`);
      }
      const match = queryResult.credential_matches[credentialId];
      const validCredentials = match !== null && match !== void 0 && match.success ? Array.from(match.valid_credentials) : [];
      if (validCredentials.length === 0) {
        return {
          inputDescriptorId: credentialId,
          name: getDcqlCredentialName(credentialQuery),
          purpose: typeof credentialSet.purpose === 'string' ? credentialSet.purpose : undefined,
          description: undefined,
          isSatisfied: false,
          credentials: [{
            id: credentialId,
            credentialName: getDcqlCredentialName(credentialQuery),
            requestedAttributes: getDcqlRequestedAttributes(credentialQuery),
            claimFormat: ClaimFormat.JwtVc
          }]
        };
      }
      return {
        inputDescriptorId: credentialId,
        name: credentialId,
        purpose: typeof credentialSet.purpose === 'string' ? credentialSet.purpose : undefined,
        description: undefined,
        isSatisfied: validCredentials.length >= 1,
        credentials: validCredentials.map(validCredential => {
          const {
            display,
            metadata
          } = getCredentialForDisplay(validCredential.record);
          const disclosedPayload = getDcqlDisclosedPayload(validCredential);
          return {
            id: validCredential.record.id,
            credentialName: display.name,
            issuerName: display.issuer.name,
            requestedAttributes: [...Object.keys(disclosedPayload)],
            metadata,
            backgroundColor: display.backgroundColor,
            textColor: display.textColor,
            backgroundImage: display.backgroundImage,
            claimFormat: getDcqlClaimFormat(validCredential.record)
          };
        })
      };
    });
  });
  return {
    areAllSatisfied: entries.every(entry => entry.isSatisfied),
    name: 'Unknown',
    purpose: credentialSets.map(credentialSet => credentialSet.purpose).find(purpose => typeof purpose === 'string'),
    entries
  };
}
export function formatDifPexCredentialsForRequest(credentialsForRequest) {
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
          } = getCredentialForDisplay(verifiableCredential.credentialRecord);
          let disclosedPayload = attributes;
          if (verifiableCredential.claimFormat === ClaimFormat.SdJwtDc) {
            disclosedPayload = filterAndMapSdJwtKeys(verifiableCredential.disclosedPayload).visibleProperties;
          } else if (verifiableCredential.claimFormat === ClaimFormat.MsoMdoc) {
            disclosedPayload = Object.fromEntries(Object.values(verifiableCredential.disclosedPayload).flatMap(entry => Object.entries(entry)));
          }
          return {
            id: verifiableCredential.credentialRecord.id,
            credentialName: display.name,
            issuerName: display.issuer.name,
            requestedAttributes: [...Object.keys(disclosedPayload)],
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
export function formatOpenIdProofRequest(record) {
  if (record.presentationExchange) {
    return formatDifPexCredentialsForRequest(record.presentationExchange.credentialsForRequest);
  }
  if (record.dcql) {
    return formatDcqlCredentialsForRequest(record.dcql.queryResult);
  }
  return undefined;
}
//# sourceMappingURL=displayProof.js.map