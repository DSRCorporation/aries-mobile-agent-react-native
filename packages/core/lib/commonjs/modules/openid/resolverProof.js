"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchInvitationDataUrl = fetchInvitationDataUrl;
exports.shareProof = exports.getCredentialsForProofRequest = void 0;
var _core = require("@credo-ts/core");
var _utils = require("./utils/utils");
var _reactNative = require("react-native");
function handleTextResponse(text) {
  // If the text starts with 'ey' we assume it's a JWT and thus an OpenID authorization request
  if (text.startsWith('ey')) {
    return {
      success: true,
      result: {
        format: 'parsed',
        type: 'openid-authorization-request',
        data: text
      }
    };
  }

  // Otherwise we still try to parse it as JSON
  try {
    const json = JSON.parse(text);
    return handleJsonResponse(json);

    // handel like above
  } catch (error) {
    throw new Error(`[handleTextResponse] Error:${error}`);
  }
}
function handleJsonResponse(json) {
  // We expect a JSON object
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    throw new Error('[handleJsonResponse] Invitation not recognized.');
  }
  if ('@type' in json) {
    return {
      success: true,
      result: {
        format: 'parsed',
        type: 'didcomm',
        data: json
      }
    };
  }
  if ('credential_issuer' in json) {
    return {
      success: true,
      result: {
        format: 'parsed',
        type: 'openid-credential-offer',
        data: json
      }
    };
  }
  throw new Error('[handleJsonResponse] Invitation not recognized.');
}
async function fetchInvitationDataUrl(dataUrl) {
  // If we haven't had a response after 10 seconds, we will handle as if the invitation is not valid.
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 10000);
  try {
    // If we still don't know what type of invitation it is, we assume it is a URL that we need to fetch to retrieve the invitation.
    const response = await fetch(dataUrl, {
      headers: {
        // for DIDComm out of band invitations we should include application/json
        // but we are flexible and also want to support other types of invitations
        // as e.g. the OpenID SIOP request is a signed encoded JWT string
        Accept: 'application/json, text/plain, */*'
      }
    });
    clearTimeout(timeout);
    if (!response.ok) {
      throw new Error('[retrieve_invitation_error] Unable to retrieve invitation.');
    }
    const contentType = response.headers.get('content-type');
    if (contentType !== null && contentType !== void 0 && contentType.includes('application/json')) {
      const json = await response.json();
      return handleJsonResponse(json);
    }
    const text = await response.text();
    return handleTextResponse(text);
  } catch (error) {
    clearTimeout(timeout);
    throw new Error(`[retrieve_invitation_error] Unable to retrieve invitation: ${error}`);
  }
}

/**
 * Entry point for the OpenID4VP flow after QR scanning / deeplink / paste handling
 * has identified an OpenID authorization request.
 *
 * This is the resolve phase only:
 * - accept the raw request string coming from scan/deeplink handling
 * - ask Credo to resolve the request into PEX or DCQL details
 * - return a record that the proof UI can render
 *
 * It does not send anything to the verifier. The later submit phase is handled by
 * {@link shareProof}, after the user explicitly opts in to share credentials.
 */
const getCredentialsForProofRequest = async ({
  agent,
  request
}) => {
  try {
    agent.config.logger.info(`$$Receiving openid authorization request ${request}`);
    const resolved = await agent.modules.openid4vc.holder.resolveOpenId4VpAuthorizationRequest(request);
    if (!resolved.presentationExchange && !resolved.dcql) {
      throw new Error('Unsupported authorization request: missing presentation exchange or dcql parameters.');
    }
    const requestRecord = {
      ...resolved,
      verifierHostName: resolved.authorizationRequestPayload.response_uri ? (0, _utils.getHostNameFromUrl)(String(resolved.authorizationRequestPayload.response_uri)) : undefined,
      createdAt: new Date(),
      type: 'OpenId4VPRequestRecord'
    };
    return requestRecord;
  } catch (err) {
    agent.config.logger.error(`Parsing presentation request:  ${(err === null || err === void 0 ? void 0 : err.message) ?? err}`);
    throw err;
  }
};
exports.getCredentialsForProofRequest = getCredentialsForProofRequest;
const getPexCredentialsForRequest = (credentialsForRequest, selectedProofCredentials) => {
  if (!credentialsForRequest.areRequirementsSatisfied) {
    throw new Error('Requirements from proof request are not satisfied');
  }

  // `selectedProofCredentials` always represents the user's final UI choice.
  // For PEX, the map key is the input descriptor id.
  return Object.fromEntries(credentialsForRequest.requirements.flatMap(requirement => requirement.submissionEntry.map(entry => {
    const credentialId = selectedProofCredentials[entry.inputDescriptorId].id;
    const credential = entry.verifiableCredentials.find(vc => vc.credentialRecord.id === credentialId) ?? entry.verifiableCredentials[0];
    return [entry.inputDescriptorId, [credential]];
  })));
};
const getDcqlCredentialForRequest = validCredential => {
  const useMode = _core.CredentialMultiInstanceUseMode.NewOrFirst;
  switch (validCredential.record.type) {
    case 'MdocRecord':
      return {
        claimFormat: _core.ClaimFormat.MsoMdoc,
        credentialRecord: validCredential.record,
        disclosedPayload: validCredential.claims.valid_claim_sets[0].output,
        useMode
      };
    case 'SdJwtVcRecord':
      return {
        claimFormat: _core.ClaimFormat.SdJwtDc,
        credentialRecord: validCredential.record,
        disclosedPayload: validCredential.claims.valid_claim_sets[0].output,
        useMode
      };
    case 'W3cCredentialRecord':
      return {
        claimFormat: validCredential.record.firstCredential.claimFormat,
        credentialRecord: validCredential.record,
        disclosedPayload: validCredential.record.firstCredential.jsonCredential,
        useMode
      };
    case 'W3cV2CredentialRecord':
      return {
        claimFormat: validCredential.record.firstCredential.claimFormat,
        credentialRecord: validCredential.record,
        disclosedPayload: validCredential.claims.valid_claim_sets[0].output,
        useMode
      };
  }
};
const getDcqlCredentialsForRequest = (agent, queryResult, selectedProofCredentials) => {
  if (!queryResult.can_be_satisfied) {
    throw new Error('Cannot select the credentials for the dcql query presentation if the request cannot be satisfied');
  }

  // This is the same user-selection map as for PEX.
  // For DCQL, the map key is the credential query id instead of the input descriptor id.
  if (Object.keys(selectedProofCredentials).length === 0) {
    return agent.openid4vc.holder.selectCredentialsForDcqlRequest(queryResult);
  }
  return Object.fromEntries(Object.entries(selectedProofCredentials).map(([credentialQueryId, selectedCredential]) => {
    const match = queryResult.credential_matches[credentialQueryId];
    if (!(match !== null && match !== void 0 && match.success)) {
      throw new Error(`No matching DCQL credentials found for credential query id ${credentialQueryId}`);
    }
    const validCredentials = Array.from(match.valid_credentials);
    const validCredential = validCredentials.find(credential => credential.record.id === selectedCredential.id);
    if (!validCredential) {
      throw new Error(`Could not find credential record ${selectedCredential.id} in valid credential matches for credential query id ${credentialQueryId}`);
    }
    return [credentialQueryId, [getDcqlCredentialForRequest(validCredential)]];
  }));
};

/**
 * Submit phase for OpenID4VP after the user has reviewed the request and chosen
 * which credentials to share.
 *
 * This function takes:
 * - the resolved request record created by {@link getCredentialsForProofRequest}
 * - the user's final credential selections from the proof UI
 *
 * It then maps those selections into the Credo input expected for either
 * presentation exchange or DCQL and submits the authorization response.
 */
const shareProof = async ({
  agent,
  requestRecord,
  selectedProofCredentials
}) => {
  try {
    var _result$serverRespons;
    const presentationExchange = requestRecord.presentationExchange ? {
      credentials: getPexCredentialsForRequest(requestRecord.presentationExchange.credentialsForRequest, selectedProofCredentials)
    } : undefined;
    const dcql = !presentationExchange && requestRecord.dcql ? {
      credentials: getDcqlCredentialsForRequest(agent, requestRecord.dcql.queryResult, selectedProofCredentials)
    } : undefined;
    if (!presentationExchange && !dcql) {
      throw new Error('Unsupported authorization request: missing presentation exchange or dcql parameters.');
    }
    const result = await agent.openid4vc.holder.acceptOpenId4VpAuthorizationRequest({
      authorizationRequestPayload: requestRecord.authorizationRequestPayload,
      presentationExchange,
      dcql,
      origin: requestRecord.origin
    });

    // if redirect_uri is provided, open it in the browser
    // Even if the response returned an error, we must open this uri
    if (result.serverResponse && typeof result.serverResponse.body === 'object' && typeof ((_result$serverRespons = result.serverResponse.body) === null || _result$serverRespons === void 0 ? void 0 : _result$serverRespons.redirect_uri) === 'string') {
      await _reactNative.Linking.openURL(result.serverResponse.body.redirect_uri);
    }
    if (result.serverResponse && (result.serverResponse.status < 200 || result.serverResponse.status > 299)) {
      throw new Error(`Error while accepting authorization request. ${result.serverResponse.body}`);
    }
    return result;
  } catch (error) {
    // Handle biometric authentication errors
    throw new Error(`Error accepting proof request. ${(error === null || error === void 0 ? void 0 : error.message) ?? error}`);
  }
};
exports.shareProof = shareProof;
//# sourceMappingURL=resolverProof.js.map