import { Mdoc, MdocRecord, TypedArrayEncoder } from '@credo-ts/core';
import { Hasher, SdJwtVcRecord, ClaimFormat, JsonTransformer } from '@credo-ts/core';
import { decodeSdJwtSync, getClaimsSync } from '@sd-jwt/decode';
import { detectImageMimeType, formatDate, getHostNameFromUrl, isDateString, sanitizeString } from './utils/utils';
import { getOpenId4VcCredentialMetadata } from './metadata';
function findDisplay(display) {
  if (!display) return undefined;
  let item = display.find(d => {
    var _d$locale;
    return (_d$locale = d.locale) === null || _d$locale === void 0 ? void 0 : _d$locale.startsWith('en-');
  });
  if (!item) item = display.find(d => !d.locale);
  if (!item) item = display[0];
  return item;
}
function getOpenId4VcIssuerDisplay(openId4VcMetadata) {
  const issuerDisplay = {};

  // Try to extract from openid metadata first
  if (openId4VcMetadata) {
    const openidIssuerDisplay = findDisplay(openId4VcMetadata.issuer.display);
    if (openidIssuerDisplay) {
      issuerDisplay.name = openidIssuerDisplay.name;
      if (openidIssuerDisplay.logo) {
        var _openidIssuerDisplay$, _openidIssuerDisplay$2;
        issuerDisplay.logo = {
          uri: (_openidIssuerDisplay$ = openidIssuerDisplay.logo) === null || _openidIssuerDisplay$ === void 0 ? void 0 : _openidIssuerDisplay$.uri,
          altText: (_openidIssuerDisplay$2 = openidIssuerDisplay.logo) === null || _openidIssuerDisplay$2 === void 0 ? void 0 : _openidIssuerDisplay$2.alt_text
        };
      }
    }

    // If the credentialDisplay contains a logo, and the issuerDisplay does not, use the logo from the credentialDisplay
    const openidCredentialDisplay = findDisplay(openId4VcMetadata.credential.display);
    if (openidCredentialDisplay && !issuerDisplay.logo && openidCredentialDisplay.logo) {
      var _openidCredentialDisp, _openidCredentialDisp2;
      issuerDisplay.logo = {
        uri: (_openidCredentialDisp = openidCredentialDisplay.logo) === null || _openidCredentialDisp === void 0 ? void 0 : _openidCredentialDisp.uri,
        altText: (_openidCredentialDisp2 = openidCredentialDisplay.logo) === null || _openidCredentialDisp2 === void 0 ? void 0 : _openidCredentialDisp2.altText
      };
    }
  }

  // Last fallback: use issuer id from openid4vc
  if (!issuerDisplay.name && openId4VcMetadata !== null && openId4VcMetadata !== void 0 && openId4VcMetadata.issuer.id) {
    issuerDisplay.name = getHostNameFromUrl(openId4VcMetadata.issuer.id);
  }
  if (openId4VcMetadata !== null && openId4VcMetadata !== void 0 && openId4VcMetadata.issuer.id) {
    issuerDisplay.domain = getHostNameFromUrl(openId4VcMetadata.issuer.id);
  }
  return {
    ...issuerDisplay,
    name: issuerDisplay.name ?? 'Unknown'
  };
}
function getIssuerDisplay(metadata) {
  var _openidIssuerDisplay$3, _openidIssuerDisplay$4;
  const issuerDisplay = {};
  // Try to extract from openid metadata first
  const openidIssuerDisplay = findDisplay(metadata === null || metadata === void 0 ? void 0 : metadata.issuer.display);
  issuerDisplay.name = openidIssuerDisplay === null || openidIssuerDisplay === void 0 ? void 0 : openidIssuerDisplay.name;
  issuerDisplay.logo = openidIssuerDisplay !== null && openidIssuerDisplay !== void 0 && openidIssuerDisplay.logo ? {
    uri: (_openidIssuerDisplay$3 = openidIssuerDisplay.logo) === null || _openidIssuerDisplay$3 === void 0 ? void 0 : _openidIssuerDisplay$3.uri,
    altText: (_openidIssuerDisplay$4 = openidIssuerDisplay.logo) === null || _openidIssuerDisplay$4 === void 0 ? void 0 : _openidIssuerDisplay$4.alt_text
  } : undefined;

  // If the credentialDisplay contains a logo, and the issuerDisplay does not, use the logo from the credentialDisplay
  const openidCredentialDisplay = findDisplay(metadata === null || metadata === void 0 ? void 0 : metadata.credential.display);
  if (openidCredentialDisplay && !issuerDisplay.logo && openidCredentialDisplay.logo) {
    var _openidCredentialDisp3, _openidCredentialDisp4;
    issuerDisplay.logo = {
      uri: (_openidCredentialDisp3 = openidCredentialDisplay.logo) === null || _openidCredentialDisp3 === void 0 ? void 0 : _openidCredentialDisp3.uri,
      altText: (_openidCredentialDisp4 = openidCredentialDisplay.logo) === null || _openidCredentialDisp4 === void 0 ? void 0 : _openidCredentialDisp4.altText
    };
  }
  return issuerDisplay;
}
function processIssuerDisplay(metadata, issuerDisplay) {
  // Last fallback: use issuer id from openid4vc
  if (!issuerDisplay.name && metadata !== null && metadata !== void 0 && metadata.issuer.id) {
    issuerDisplay.name = getHostNameFromUrl(metadata.issuer.id);
  }
  return {
    ...issuerDisplay,
    name: issuerDisplay.name ?? 'Unknown'
  };
}
function getW3cIssuerDisplay(credential, openId4VcMetadata) {
  const issuerDisplay = getIssuerDisplay(openId4VcMetadata);

  // If openid metadata is not available, try to extract display metadata from the credential based on JFF metadata
  const jffCredential = credential;
  const issuerJson = typeof jffCredential.issuer === 'string' ? undefined : jffCredential.issuer;

  // Issuer Display from JFF
  if (!issuerDisplay.logo || !issuerDisplay.logo.uri) {
    issuerDisplay.logo = issuerJson !== null && issuerJson !== void 0 && issuerJson.logoUrl ? {
      uri: issuerJson === null || issuerJson === void 0 ? void 0 : issuerJson.logoUrl
    } : issuerJson !== null && issuerJson !== void 0 && issuerJson.image ? {
      uri: typeof issuerJson.image === 'string' ? issuerJson.image : issuerJson.image.id
    } : undefined;
  }

  // Issuer name from JFF
  if (!issuerDisplay.name) {
    issuerDisplay.name = issuerJson === null || issuerJson === void 0 ? void 0 : issuerJson.name;
  }
  return processIssuerDisplay(openId4VcMetadata, issuerDisplay);
}
function getCredentialDisplay(credentialPayload, openId4VcMetadata) {
  const credentialDisplay = {};
  if (openId4VcMetadata) {
    const openidCredentialDisplay = findDisplay(openId4VcMetadata.credential.display);
    credentialDisplay.name = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.name;
    credentialDisplay.description = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.description;
    credentialDisplay.textColor = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.textColor;
    credentialDisplay.backgroundColor = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.backgroundColor;
    credentialDisplay.backgroundImage = openidCredentialDisplay !== null && openidCredentialDisplay !== void 0 && openidCredentialDisplay.backgroundImage ? {
      uri: openidCredentialDisplay.backgroundImage.uri,
      altText: openidCredentialDisplay.backgroundImage.altText
    } : undefined;
    credentialDisplay.logo = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.logo;
    credentialDisplay.primary_overlay_attribute = openidCredentialDisplay === null || openidCredentialDisplay === void 0 ? void 0 : openidCredentialDisplay.primary_overlay_attribute;
  }
  return credentialDisplay;
}
function getW3cCredentialDisplay(credential, openId4VcMetadata) {
  var _jffCredential$creden;
  const credentialDisplay = getCredentialDisplay(credential, openId4VcMetadata);

  // If openid metadata is not available, try to extract display metadata from the credential based on JFF metadata
  const jffCredential = credential;
  if (!credentialDisplay.name) {
    credentialDisplay.name = jffCredential.name;
  }

  // If there's no name for the credential, we extract it from the last type
  // and sanitize it. This is not optimal. But provides at least something.
  if (!credentialDisplay.name && jffCredential.type.length > 1) {
    const lastType = jffCredential.type[jffCredential.type.length - 1];
    credentialDisplay.name = lastType && !lastType.startsWith('http') ? sanitizeString(lastType) : undefined;
  }

  // Use background color from the JFF credential if not provided by the OID4VCI metadata
  if (!credentialDisplay.backgroundColor && (_jffCredential$creden = jffCredential.credentialBranding) !== null && _jffCredential$creden !== void 0 && _jffCredential$creden.backgroundColor) {
    credentialDisplay.backgroundColor = jffCredential.credentialBranding.backgroundColor;
  }
  return {
    ...credentialDisplay,
    // Last fallback, if there's really no name for the credential, we use a generic name
    name: credentialDisplay.name ?? 'Credential'
  };
}
function getSdJwtCredentialDisplay(credentialPayload, openId4VcMetadata) {
  const credentialDisplay = getCredentialDisplay(credentialPayload, openId4VcMetadata);
  if (!credentialDisplay.name && typeof credentialPayload.vct === 'string') {
    credentialDisplay.name = sanitizeString(credentialPayload.vct);
  }
  return {
    ...credentialDisplay,
    name: credentialDisplay.name ?? 'Credential'
  };
}
function getMdocCredentialDisplay(credentialPayload, openId4VcMetadata) {
  const credentialDisplay = {};
  if (openId4VcMetadata) {
    const openidCredentialDisplay = findDisplay(openId4VcMetadata.credential.display);
    if (openidCredentialDisplay) {
      credentialDisplay.name = openidCredentialDisplay.name;
      credentialDisplay.description = openidCredentialDisplay.description;
      credentialDisplay.textColor = openidCredentialDisplay.textColor;
      credentialDisplay.backgroundColor = openidCredentialDisplay.backgroundColor;
      if (openidCredentialDisplay.backgroundImage) {
        credentialDisplay.backgroundImage = {
          uri: openidCredentialDisplay.backgroundImage.uri,
          altText: openidCredentialDisplay.backgroundImage.altText
        };
      }

      // NOTE: logo is used in issuer display (not sure if that's right though)
    }
  }

  // TODO: mdoc
  // If there's no name for the credential, we extract it from the last type
  // and sanitize it. This is not optimal. But provides at least something.
  // if (!credentialDisplay.name && typeof credentialPayload.vct === 'string') {
  //   credentialDisplay.name = sanitizeString(credentialPayload.vct)
  // }

  return {
    ...credentialDisplay,
    // Last fallback, if there's really no name for the credential, we use a generic name
    // TODO: use on-device AI to determine a name for the credential based on the credential data
    name: credentialDisplay.name ?? 'Credential'
  };
}
function safeCalculateJwkThumbprint(jwk) {
  try {
    const thumbprint = TypedArrayEncoder.toBase64URL(Hasher.hash(JSON.stringify({
      k: jwk.k,
      e: jwk.e,
      crv: jwk.crv,
      kty: jwk.kty,
      n: jwk.n,
      x: jwk.x,
      y: jwk.y
    }), 'sha-256'));
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-256:${thumbprint}`;
  } catch {
    return undefined;
  }
}
export function filterAndMapSdJwtKeys(sdJwtVcPayload) {
  // TODO: We should map these claims to nice format and names
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    _sd_alg,
    _sd_hash,
    iss,
    vct,
    cnf,
    iat,
    exp,
    nbf,
    ...visibleProperties
  } = sdJwtVcPayload;
  const holder = cnf.kid ?? cnf.jwk ? safeCalculateJwkThumbprint(cnf.jwk) : undefined;
  const credentialMetadata = {
    type: vct,
    issuer: iss,
    holder
  };
  if (iat) {
    credentialMetadata.issuedAt = formatDate(new Date(iat * 1000));
  }
  if (exp) {
    credentialMetadata.validUntil = formatDate(new Date(exp * 1000));
  }
  if (nbf) {
    credentialMetadata.validFrom = formatDate(new Date(nbf * 1000));
  }
  return {
    visibleProperties: Object.fromEntries(Object.entries(visibleProperties).map(([key, value]) => [key, recursivelyMapAttribues(value)])),
    metadata: credentialMetadata,
    raw: {
      issuedAt: iat ? new Date(iat * 1000) : undefined,
      validUntil: exp ? new Date(exp * 1000) : undefined,
      validFrom: nbf ? new Date(nbf * 1000) : undefined
    }
  };
}
export function getCredentialForDisplay(credentialRecord) {
  var _credential$credentia;
  if (credentialRecord instanceof SdJwtVcRecord) {
    // FIXME: we should probably add a decode method on the SdJwtVcRecord
    // as you now need the agent context to decode the sd-jwt vc, while that's
    // not really needed
    const {
      disclosures,
      jwt
    } = decodeSdJwtSync(credentialRecord.firstCredential.compact, (data, alg) => Hasher.hash(data, alg));
    const decodedPayload = getClaimsSync(jwt.payload, disclosures, (data, alg) => Hasher.hash(data, alg));
    const openId4VcMetadata = getOpenId4VcCredentialMetadata(credentialRecord);
    const issuerDisplay = getOpenId4VcIssuerDisplay(openId4VcMetadata);
    const credentialDisplay = getSdJwtCredentialDisplay(decodedPayload, openId4VcMetadata);
    const mapped = filterAndMapSdJwtKeys(decodedPayload);
    return {
      id: `sd-jwt-vc-${credentialRecord.id}`,
      createdAt: credentialRecord.createdAt,
      display: {
        ...credentialDisplay,
        issuer: issuerDisplay
      },
      attributes: mapped.visibleProperties,
      metadata: mapped.metadata,
      claimFormat: ClaimFormat.SdJwtW3cVc,
      validUntil: mapped.raw.validUntil,
      validFrom: mapped.raw.validFrom,
      credentialSubject: openId4VcMetadata === null || openId4VcMetadata === void 0 ? void 0 : openId4VcMetadata.credential.credential_subject
    };
  }
  if (credentialRecord instanceof MdocRecord) {
    const openId4VcMetadata = getOpenId4VcCredentialMetadata(credentialRecord);
    const issuerDisplay = getOpenId4VcIssuerDisplay(openId4VcMetadata);
    const credentialDisplay = getMdocCredentialDisplay({}, openId4VcMetadata);
    const mdocInstance = Mdoc.fromBase64Url(credentialRecord.firstCredential.base64Url);
    const attributes = Object.fromEntries(Object.values(mdocInstance.issuerSignedNamespaces).flatMap(v => Object.entries(v).map(([key, value]) => [key, recursivelyMapAttribues(value)])));
    return {
      id: `mdoc-${credentialRecord.id}`,
      createdAt: credentialRecord.createdAt,
      display: {
        ...credentialDisplay,
        issuer: issuerDisplay
      },
      attributes,
      // TODO:
      metadata: {
        // holder: 'Unknown',
        issuer: 'Unknown',
        type: mdocInstance.docType
      },
      claimFormat: ClaimFormat.MsoMdoc,
      validUntil: mdocInstance.validityInfo.validUntil,
      validFrom: mdocInstance.validityInfo.validFrom,
      credentialSubject: openId4VcMetadata === null || openId4VcMetadata === void 0 ? void 0 : openId4VcMetadata.credential.credential_subject
    };
  }
  const credential = JsonTransformer.toJSON(credentialRecord.firstCredential.claimFormat === ClaimFormat.JwtVc ? credentialRecord.firstCredential.credential : credentialRecord.firstCredential);
  const openId4VcMetadata = getOpenId4VcCredentialMetadata(credentialRecord);
  const issuerDisplay = getW3cIssuerDisplay(credential, openId4VcMetadata);
  const credentialDisplay = getW3cCredentialDisplay(credential, openId4VcMetadata);

  // to be implimented later support credential with multiple subjects
  const credentialAttributes = Array.isArray(credential.credentialSubject) ? credential.credentialSubject[0] ?? {} : credential.credentialSubject;

  // Extract issuer id from credential
  const issuerId = credential.issuer.id;

  // Extract holder/subject id from credential subject
  const holderId = Array.isArray(credential.credentialSubject) ? (_credential$credentia = credential.credentialSubject[0]) === null || _credential$credentia === void 0 ? void 0 : _credential$credentia.id : credential.credentialSubject.id;
  return {
    id: `w3c-credential-${credentialRecord.id}`,
    createdAt: credentialRecord.createdAt,
    display: {
      ...credentialDisplay,
      issuer: issuerDisplay
    },
    credential,
    attributes: credentialAttributes,
    metadata: {
      holder: holderId,
      issuer: issuerId,
      type: credential.type[credential.type.length - 1],
      issuedAt: formatDate(new Date(credential.issuanceDate)),
      validUntil: credential.expiryDate ? formatDate(new Date(credential.expiryDate)) : undefined,
      validFrom: undefined
    },
    claimFormat: credentialRecord.firstCredential.claimFormat,
    validUntil: credential.expiryDate ? new Date(credential.expiryDate) : undefined,
    validFrom: credential.issuanceDate ? new Date(credential.issuanceDate) : undefined,
    credentialSubject: openId4VcMetadata === null || openId4VcMetadata === void 0 ? void 0 : openId4VcMetadata.credential.credential_subject
  };
}
export function recursivelyMapAttribues(value) {
  if (value instanceof Uint8Array) {
    const imageMimeType = detectImageMimeType(value);
    if (imageMimeType) {
      return `data:${imageMimeType};base64,${TypedArrayEncoder.toBase64(value)}`;
    }

    // TODO: what to do with a buffer that is not an image?
    return TypedArrayEncoder.toUtf8String(value);
  }
  if (value === null || value === undefined || typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Date || typeof value === 'string' && isDateString(value)) {
    // TODO: handle DateOnly (should be handled as time is 0 then)
    return formatDate(value);
  }
  if (typeof value === 'string') return value;
  if (value instanceof Map) {
    return Object.fromEntries(Array.from(value.entries()).map(([key, value]) => [key, recursivelyMapAttribues(value)]));
  }
  if (Array.isArray(value)) return value.map(recursivelyMapAttribues);
  return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, recursivelyMapAttribues(value)]));
}
//# sourceMappingURL=display.js.map