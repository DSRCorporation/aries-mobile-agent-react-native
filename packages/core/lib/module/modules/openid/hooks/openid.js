import { useAgent } from '@bifold/react-hooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';
import { EventTypes } from '../../../constants';
import { TOKENS, useServices } from '../../../container-api';
import { BifoldError } from '../../../types/error';
import { acquirePreAuthorizedAccessToken, createHolderBindingKey, getDpopSignatureAlgorithm, receiveCredentialFromOpenId4VciOffer, resolveOpenId4VciOffer } from '../offerResolve';
import { getCredentialsForProofRequest } from '../resolverProof';
import { getCredentialConfigurationIds } from '../utils/utils';
import { setRefreshCredentialMetadata } from '../metadata';
import { RefreshStatus } from '../refresh/types';
import { temporaryMetaVanillaObject } from '../metadata';
export const useOpenID = ({
  openIDUri,
  openIDPresentationUri
}) => {
  const [openIdRecord, setOpenIdRecord] = useState();
  const {
    agent
  } = useAgent();
  const {
    t
  } = useTranslation();
  const [{
    enableHardwareBackedHolderBinding
  }] = useServices([TOKENS.CONFIG]);
  const resolveOpenIDCredential = useCallback(async uri => {
    if (!agent) {
      return;
    }
    try {
      var _getCredentialConfigu;
      const resolvedCredentialOffer = await resolveOpenId4VciOffer({
        agent: agent,
        uri: uri
      });
      const authServers = resolvedCredentialOffer.metadata.credentialIssuer.authorization_servers;
      const authServer = resolvedCredentialOffer.metadata.authorizationServers[0];
      const credentialIssuer = authServer.issuer;
      const issuerMetadata = resolvedCredentialOffer.metadata.credentialIssuer;
      const configID = (_getCredentialConfigu = getCredentialConfigurationIds(resolvedCredentialOffer)) === null || _getCredentialConfigu === void 0 ? void 0 : _getCredentialConfigu[0];
      const tokenEndpoint = authServer === null || authServer === void 0 ? void 0 : authServer.token_endpoint;
      const credentialEndpoint = issuerMetadata.credential_endpoint;
      if (!configID) {
        throw new Error('No credential configuration ID found in the credential offer metadata');
      }
      if (!credentialIssuer) {
        throw new Error('No credential issuer found in the credential offer metadata');
      }
      const dpopSigningAlgValuesSupported = [authServer.dpop_signing_alg_values_supported, issuerMetadata.dpop_signing_alg_values_supported].find(Array.isArray);
      const dpopSignatureAlgorithm = getDpopSignatureAlgorithm({
        dpopSigningAlgValuesSupported,
        enableHardwareBackedHolderBinding
      });
      const holderBindingKey = dpopSignatureAlgorithm ? await createHolderBindingKey({
        agent,
        signatureAlgorithm: dpopSignatureAlgorithm,
        enableHardwareBackedHolderBinding
      }) : undefined;
      const tokenResponse = await acquirePreAuthorizedAccessToken({
        agent,
        resolvedCredentialOffer,
        dpop: holderBindingKey && dpopSignatureAlgorithm ? {
          jwk: holderBindingKey,
          alg: dpopSignatureAlgorithm
        } : undefined
      });
      const refreshToken = tokenResponse.refreshToken;
      temporaryMetaVanillaObject.tokenResponse = tokenResponse;
      const credential = await receiveCredentialFromOpenId4VciOffer({
        agent,
        resolvedCredentialOffer,
        tokenResponse: tokenResponse,
        enableHardwareBackedHolderBinding,
        holderBindingKey
      });
      if (refreshToken) {
        setRefreshCredentialMetadata(credential, {
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
          lastCheckResult: RefreshStatus.Valid,
          attemptCount: 0,
          resolvedCredentialOffer: resolvedCredentialOffer
        });
      }
      return credential;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const error = new BifoldError(t('Error.Title1024'), errorMessage, errorMessage, 1043);
      DeviceEventEmitter.emit(EventTypes.OPENID_CONNECTION_ERROR, error);
    }
  }, [agent, enableHardwareBackedHolderBinding, t]);
  const resolveOpenIDPresentationRequest = useCallback(async uri => {
    if (!agent) {
      return;
    }
    try {
      const record = await getCredentialsForProofRequest({
        agent: agent,
        request: uri
      });
      return record;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const error = new BifoldError(t('Error.Title1043'), errorMessage, errorMessage, 1043);
      DeviceEventEmitter.emit(EventTypes.OPENID_CONNECTION_ERROR, error);
    }
  }, [agent, t]);
  useEffect(() => {
    if (!openIDPresentationUri) {
      return;
    }
    resolveOpenIDPresentationRequest(openIDPresentationUri).then(value => {
      if (value) {
        setOpenIdRecord(value);
      }
    });
  }, [openIDPresentationUri, resolveOpenIDPresentationRequest]);
  useEffect(() => {
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
//# sourceMappingURL=openid.js.map