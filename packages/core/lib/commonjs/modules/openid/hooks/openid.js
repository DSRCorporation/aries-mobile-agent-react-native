"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenID = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = require("react");
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _constants = require("../../../constants");
var _containerApi = require("../../../container-api");
var _error = require("../../../types/error");
var _offerResolve = require("../offerResolve");
var _resolverProof = require("../resolverProof");
var _utils = require("../utils/utils");
var _metadata = require("../metadata");
var _types = require("../refresh/types");
const useOpenID = ({
  openIDUri,
  openIDPresentationUri
}) => {
  const [openIdRecord, setOpenIdRecord] = (0, _react.useState)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    enableHardwareBackedHolderBinding
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const resolveOpenIDCredential = (0, _react.useCallback)(async uri => {
    if (!agent) {
      return;
    }
    try {
      var _getCredentialConfigu;
      const resolvedCredentialOffer = await (0, _offerResolve.resolveOpenId4VciOffer)({
        agent: agent,
        uri: uri
      });
      const authServers = resolvedCredentialOffer.metadata.credentialIssuer.authorization_servers;
      const authServer = resolvedCredentialOffer.metadata.authorizationServers[0];
      const credentialIssuer = authServer.issuer;
      const issuerMetadata = resolvedCredentialOffer.metadata.credentialIssuer;
      const configID = (_getCredentialConfigu = (0, _utils.getCredentialConfigurationIds)(resolvedCredentialOffer)) === null || _getCredentialConfigu === void 0 ? void 0 : _getCredentialConfigu[0];
      const tokenEndpoint = authServer === null || authServer === void 0 ? void 0 : authServer.token_endpoint;
      const credentialEndpoint = issuerMetadata.credential_endpoint;
      if (!configID) {
        throw new Error('No credential configuration ID found in the credential offer metadata');
      }
      if (!credentialIssuer) {
        throw new Error('No credential issuer found in the credential offer metadata');
      }
      const dpopSigningAlgValuesSupported = [authServer.dpop_signing_alg_values_supported, issuerMetadata.dpop_signing_alg_values_supported].find(Array.isArray);
      const dpopSignatureAlgorithm = (0, _offerResolve.getDpopSignatureAlgorithm)({
        dpopSigningAlgValuesSupported,
        enableHardwareBackedHolderBinding
      });
      const holderBindingKey = dpopSignatureAlgorithm ? await (0, _offerResolve.createHolderBindingKey)({
        agent,
        signatureAlgorithm: dpopSignatureAlgorithm,
        enableHardwareBackedHolderBinding
      }) : undefined;
      const tokenResponse = await (0, _offerResolve.acquirePreAuthorizedAccessToken)({
        agent,
        resolvedCredentialOffer,
        dpop: holderBindingKey && dpopSignatureAlgorithm ? {
          jwk: holderBindingKey,
          alg: dpopSignatureAlgorithm
        } : undefined
      });
      const refreshToken = tokenResponse.refreshToken;
      _metadata.temporaryMetaVanillaObject.tokenResponse = tokenResponse;
      const credential = await (0, _offerResolve.receiveCredentialFromOpenId4VciOffer)({
        agent,
        resolvedCredentialOffer,
        tokenResponse: tokenResponse,
        enableHardwareBackedHolderBinding,
        holderBindingKey
      });
      if (refreshToken) {
        (0, _metadata.setRefreshCredentialMetadata)(credential, {
          tokenEndpoint: tokenEndpoint,
          refreshToken: refreshToken,
          authorizationServer: tokenResponse.authorizationServer,
          issuerMetadataCache: {
            credential_issuer: credentialIssuer,
            credential_endpoint: credentialEndpoint,
            token_endpoint: tokenEndpoint,
            authorization_servers: authServers,
            credential_configurations_supported: issuerMetadata === null || issuerMetadata === void 0 ? void 0 : issuerMetadata.credential_configurations_supported
          },
          credentialIssuer: credentialIssuer,
          credentialConfigurationId: configID,
          tokenBinding: tokenResponse.dpop ? 'DPoP' : 'Bearer',
          dpop: tokenResponse.dpop ? {
            alg: tokenResponse.dpop.alg,
            jwk: tokenResponse.dpop.jwk.toJson(),
            nonce: tokenResponse.dpop.nonce
          } : undefined,
          lastCheckedAt: Date.now(),
          lastCheckResult: _types.RefreshStatus.Valid,
          attemptCount: 0,
          resolvedCredentialOffer: resolvedCredentialOffer
        });
      }
      return credential;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const error = new _error.BifoldError(t('Error.Title1024'), errorMessage, errorMessage, 1043);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.OPENID_CONNECTION_ERROR, error);
    }
  }, [agent, enableHardwareBackedHolderBinding, t]);
  const resolveOpenIDPresentationRequest = (0, _react.useCallback)(async uri => {
    if (!agent) {
      return;
    }
    try {
      const record = await (0, _resolverProof.getCredentialsForProofRequest)({
        agent: agent,
        request: uri
      });
      return record;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const error = new _error.BifoldError(t('Error.Title1043'), errorMessage, errorMessage, 1043);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.OPENID_CONNECTION_ERROR, error);
    }
  }, [agent, t]);
  (0, _react.useEffect)(() => {
    if (!openIDPresentationUri) {
      return;
    }
    resolveOpenIDPresentationRequest(openIDPresentationUri).then(value => {
      if (value) {
        setOpenIdRecord(value);
      }
    });
  }, [openIDPresentationUri, resolveOpenIDPresentationRequest]);
  (0, _react.useEffect)(() => {
    if (!openIDUri) {
      return;
    }
    resolveOpenIDCredential(openIDUri).then(value => {
      if (value) {
        setOpenIdRecord(value);
      }
    });
  }, [openIDUri, resolveOpenIDCredential]);
  return openIdRecord;
};
exports.useOpenID = useOpenID;
//# sourceMappingURL=openid.js.map