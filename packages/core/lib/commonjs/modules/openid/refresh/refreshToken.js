"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = refreshAccessToken;
var _core = require("@credo-ts/core");
var _metadata = require("../metadata");
var _config = require("./config");
async function refreshAccessToken({
  logger,
  cred,
  agent
}) {
  logger.info(`[refreshAccessToken] Checking new credential for record: ${cred.id}`);
  //   return _mockTokenRefreshResponse
  const refreshMetaData = (0, _metadata.getRefreshCredentialMetadata)(cred);
  if (!refreshMetaData) {
    logger.error(`[refreshAccessToken] No refresh metadata found for credential: ${cred.id}`);
    return;
  }
  logger.info(`[refreshAccessToken] Found refresh metadata for credential: ${cred.id}`);
  const {
    refreshToken,
    tokenEndpoint
  } = refreshMetaData;
  if (_config.USE_CREDO_OPENID_REFRESH_FLOW) {
    logger.info(`[refreshAccessToken] Credo refresh flow enabled for credential: ${cred.id}`);
    if (refreshMetaData.resolvedCredentialOffer) {
      var _refreshMetaData$reso, _tokenResponse$dpop, _tokenResponse$dpop2;
      const tokenResponse = await agent.openid4vc.holder.refreshToken({
        refreshToken,
        issuerMetadata: refreshMetaData.resolvedCredentialOffer.metadata,
        authorizationServer: refreshMetaData.authorizationServer ?? ((_refreshMetaData$reso = refreshMetaData.resolvedCredentialOffer.metadata.authorizationServers[0]) === null || _refreshMetaData$reso === void 0 ? void 0 : _refreshMetaData$reso.issuer),
        clientId: refreshMetaData.clientId,
        dpop: refreshMetaData.dpop ? {
          alg: refreshMetaData.dpop.alg,
          jwk: _core.Kms.PublicJwk.fromUnknown(refreshMetaData.dpop.jwk),
          nonce: refreshMetaData.dpop.nonce
        } : undefined
      });
      logger.info(`[refreshAccessToken] Credo token refresh succeeded: ${JSON.stringify({
        token_type: tokenResponse.accessTokenResponse.token_type,
        expires_in: tokenResponse.accessTokenResponse.expires_in,
        has_access_token: Boolean(tokenResponse.accessToken),
        has_refresh_token: Boolean(tokenResponse.refreshToken),
        has_dpop: Boolean(tokenResponse.dpop)
      })}`);
      (0, _metadata.setRefreshCredentialMetadata)(cred, {
        ...refreshMetaData,
        refreshToken: tokenResponse.refreshToken || refreshMetaData.refreshToken,
        dpop: tokenResponse.dpop ? {
          alg: tokenResponse.dpop.alg,
          jwk: tokenResponse.dpop.jwk.toJson(),
          nonce: tokenResponse.dpop.nonce
        } : refreshMetaData.dpop
      });
      await (0, _metadata.persistCredentialRecord)(agent.context, cred);
      return {
        access_token: tokenResponse.accessToken,
        refresh_token: tokenResponse.refreshToken,
        token_type: tokenResponse.accessTokenResponse.token_type,
        expires_in: tokenResponse.accessTokenResponse.expires_in,
        c_nonce: tokenResponse.cNonce,
        c_nonce_expires_in: tokenResponse.accessTokenResponse.c_nonce_expires_in,
        scope: tokenResponse.accessTokenResponse.scope,
        authorization_details: tokenResponse.accessTokenResponse.authorization_details,
        dpop_nonce: (_tokenResponse$dpop = tokenResponse.dpop) === null || _tokenResponse$dpop === void 0 ? void 0 : _tokenResponse$dpop.nonce,
        dpopNonce: (_tokenResponse$dpop2 = tokenResponse.dpop) === null || _tokenResponse$dpop2 === void 0 ? void 0 : _tokenResponse$dpop2.nonce,
        dpop: tokenResponse.dpop
      };
    }
    logger.warn(`[refreshAccessToken] Credo refresh flow enabled but no resolved credential offer is stored for credential ${cred.id}; falling back to legacy refresh flow`);
  }
  logger.info(`[refreshAccessToken] Legacy refresh flow enabled for credential: ${cred.id}`);
  try {
    if (!tokenEndpoint) {
      throw new Error('No token endpoint found in the credential offer metadata');
    }
    logger.info(`[refreshAccessToken] Found token endpoint for credential: ${cred.id}: ${tokenEndpoint}`);

    // Build token endpoint:
    const tokenUrl = tokenEndpoint.endsWith('/') ? tokenEndpoint.slice(0, -1) : tokenEndpoint;
    logger.info(`[refreshAccessToken] Refreshing access token at URL: ${tokenUrl} for credential: ${cred.id}`);
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      // these are accepted by some ASs that share the same endpoint with pre-auth:
      pre_authorized_code: '',
      pre_authorized_code_alt: '',
      user_pin: ''
    });
    const res = await fetch(tokenUrl.toString(), {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });
    logger.info(`[refreshAccessToken] Token endpoint response status: ${res.status}`);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Refresh failed ${res.status}: ${errText}`);
    }
    const data = await res.json();
    logger.info(`[refreshAccessToken] Token refresh succeeded: ${JSON.stringify({
      token_type: data.token_type,
      expires_in: data.expires_in,
      has_access_token: Boolean(data.access_token),
      has_refresh_token: Boolean(data.refresh_token)
    })}`);

    // If refresh token rotated, persist it
    if (data.refresh_token && data.refresh_token !== refreshToken) {
      logger.info(`[refreshAccessToken] Refresh token rotated; saving new one`);
      (0, _metadata.setRefreshCredentialMetadata)(cred, {
        ...refreshMetaData,
        refreshToken: data.refresh_token
      });
      await (0, _metadata.persistCredentialRecord)(agent.context, cred);
    }
    return data;
  } catch (error) {
    logger.error(`[refreshAccessToken] Error getting new token: ${error}`);
    throw error;
  }
}
//# sourceMappingURL=refreshToken.js.map