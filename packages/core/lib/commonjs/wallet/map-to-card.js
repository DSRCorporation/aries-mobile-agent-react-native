"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.brandingOverlayTypeString = void 0;
exports.mapAnonCredsToCard = mapAnonCredsToCard;
exports.mapCredentialTypeToCard = mapCredentialTypeToCard;
exports.mapW3CToCard = mapW3CToCard;
var _core = require("@credo-ts/core");
var _lodash = _interopRequireDefault(require("lodash.startcase"));
var _uiTypes = require("./ui-types");
var _legacy = require("@bifold/oca/build/legacy");
var _oca = require("@bifold/oca");
var _credentials = require("../types/credentials");
var _display = require("../modules/openid/display");
var _oca2 = require("../utils/oca");
var _localization = require("../localization");
var _credential = require("../utils/credential");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isDataUrl = v => typeof v === 'string' && /^data:image\/[a-zA-Z]+;base64,/.test(v);
const fmt = (format, value) => {
  if (!format) return value;
  if ((format === 'date' || format === 'datetime') && value) {
    const d = new Date(value);
    if (Number.isFinite(d.getTime())) return d.toLocaleDateString();
  }
  return value;
};
const mapItemToCardAttr = (item, labels, formats, flaggedPII) => {
  const key = item.name ?? '';
  const rawLabel = item.label ?? key;
  const label = (labels === null || labels === void 0 ? void 0 : labels[rawLabel]) ?? rawLabel;
  let value = item.value ?? null;
  let predicate;
  if ((0, _uiTypes.isPredicate)(item)) {
    const text = [item.pType, item.pValue].filter(Boolean).join(' ');
    // Prefer explicit value if present (rare), else predicate text
    value = item.value != null ? item.value : text;
    predicate = {
      present: true,
      satisfied: item.satisfied,
      text
    };
  }
  const isPII = !(0, _uiTypes.isPredicate)(item) ? !!(flaggedPII !== null && flaggedPII !== void 0 && flaggedPII.includes(rawLabel)) : false;
  return {
    key,
    label,
    value,
    format: formats === null || formats === void 0 ? void 0 : formats[key],
    hasError: item.hasError,
    predicate,
    // If CardAttribute in ui-types includes `isPII`, this will be kept;
    // if not, TS will ignore the extra field.
    ...(isPII ? {
      isPII
    } : {})
  };
};
const brandingOverlayTypeString = type => {
  switch (type) {
    case _legacy.BrandingOverlayType.Branding01:
      return 'Branding01';
    case _legacy.BrandingOverlayType.Branding10:
      return 'Branding10';
    case _legacy.BrandingOverlayType.Branding11:
      return 'Branding11';
  }
};
exports.brandingOverlayTypeString = brandingOverlayTypeString;
function mapAnonCredsToCard(rec, bundle, opts = {}) {
  const {
    proofContext = false,
    revoked = false,
    notInWallet = false,
    displayItems
  } = opts;
  let items = [];
  if (proofContext && displayItems !== null && displayItems !== void 0 && displayItems.length) {
    items = displayItems.map(it => mapItemToCardAttr(it, bundle.labels, bundle.formats, bundle.flaggedPII));
  } else {
    const attrs = rec.credentialAttributes ?? [];
    items = attrs.map(a => mapItemToCardAttr({
      name: a.name,
      label: a.name,
      value: a.value
    }, bundle.labels, bundle.formats, bundle.flaggedPII));

    // Primary/secondary ordering (legacy behavior) — skip in proof mode
    if (bundle.primaryAttributeKey || bundle.secondaryAttributeKey) {
      const byKey = new Map(items.map(i => [i.key, i]));
      const primary = bundle.primaryAttributeKey ? byKey.get(bundle.primaryAttributeKey) : undefined;
      const secondary = bundle.secondaryAttributeKey && bundle.secondaryAttributeKey !== bundle.primaryAttributeKey ? byKey.get(bundle.secondaryAttributeKey) : undefined;
      items = [primary, secondary, ...items.filter(i => i !== primary && i !== secondary)].filter(Boolean);
    }
  }
  const status = revoked && !proofContext ? 'error' : undefined;
  const allPI = items.length > 0 && items.every(i => {
    var _i$predicate;
    return !((_i$predicate = i.predicate) !== null && _i$predicate !== void 0 && _i$predicate.present) && (i.isPII ?? false);
  });
  return {
    id: rec.id ?? rec.threadId,
    issuerName: bundle.issuer ?? ((opts === null || opts === void 0 ? void 0 : opts.connectionLabel) || 'Unknown Contact'),
    credentialName: bundle.name ?? 'Credential',
    connectionLabel: opts === null || opts === void 0 ? void 0 : opts.connectionLabel,
    branding: {
      type: bundle.branding.type,
      primaryBg: bundle.branding.primaryBg,
      secondaryBg: bundle.branding.secondaryBg,
      logo1x1Uri: bundle.branding.logo1x1Uri,
      logoText: bundle.branding.logoText,
      backgroundSliceUri: bundle.branding.backgroundSliceUri,
      backgroundFullUri: bundle.branding.backgroundFullUri,
      watermark: bundle.watermark,
      preferredTextColor: bundle.branding.preferredTextColor
    },
    items,
    primaryAttributeKey: bundle.primaryAttributeKey,
    secondaryAttributeKey: bundle.secondaryAttributeKey,
    brandingType: bundle.branding.type,
    proofContext: proofContext,
    revoked: revoked,
    notInWallet: notInWallet,
    allPI,
    helpActionUrl: bundle.helpActionUrl,
    status
  };
}
function mapW3CToCard(input, id) {
  var _input$vc$issuer, _input$vc$issuer2, _input$vc$type;
  // console.log(' ====> W3C Input:', input)
  const issuerName = typeof input.vc.issuer === 'string' ? input.vc.issuer : ((_input$vc$issuer = input.vc.issuer) === null || _input$vc$issuer === void 0 ? void 0 : _input$vc$issuer.name) || ((_input$vc$issuer2 = input.vc.issuer) === null || _input$vc$issuer2 === void 0 ? void 0 : _input$vc$issuer2.id) || 'Unknown Contact';
  const subject = input.vc.credentialSubject ?? {};
  const items = Object.entries(subject).map(([key, raw]) => {
    var _input$labels, _input$formats, _input$piiKeys;
    const label = ((_input$labels = input.labels) === null || _input$labels === void 0 ? void 0 : _input$labels[key]) ?? (0, _lodash.default)(key);
    const format = (_input$formats = input.formats) === null || _input$formats === void 0 ? void 0 : _input$formats[key];
    const val = typeof raw === 'string' || typeof raw === 'number' ? raw : JSON.stringify(raw);
    const value = isDataUrl(val) ? val : fmt(format, val);
    return {
      key,
      label,
      value,
      format: isDataUrl(val) ? 'image' : format ?? 'text',
      isPII: ((_input$piiKeys = input.piiKeys) === null || _input$piiKeys === void 0 ? void 0 : _input$piiKeys.includes(key)) ?? false
    };
  });
  const allPI = items.length > 0 && items.every(i => {
    var _i$predicate2;
    return !((_i$predicate2 = i.predicate) !== null && _i$predicate2 !== void 0 && _i$predicate2.present) && (i.isPII ?? false);
  });
  return {
    id,
    issuerName,
    credentialName: input.vc.name || (((_input$vc$type = input.vc.type) === null || _input$vc$type === void 0 ? void 0 : _input$vc$type[1]) ?? 'Credential'),
    branding: {
      type: input.branding.type,
      primaryBg: input.branding.primaryBg,
      secondaryBg: input.branding.secondaryBg,
      logo1x1Uri: input.branding.logo1x1Uri,
      logoText: input.branding.logoText,
      backgroundSliceUri: input.branding.backgroundSliceUri,
      backgroundFullUri: input.branding.backgroundFullUri,
      watermark: input.branding.watermark,
      preferredTextColor: input.branding.preferredTextColor
    },
    items,
    brandingType: input.branding.type,
    proofContext: false,
    revoked: false,
    notInWallet: false,
    allPI,
    extraOverlayParameter: input.primary_overlay_attribute ? mapItemToCardAttr(input.primary_overlay_attribute, input.labels, input.formats, input.piiKeys) : undefined,
    helpActionUrl: input.helpActionUrl,
    hideSlice: true,
    status: undefined
  };
}

/**
 *
 * @param w3cCred
 */

const resolveBundleForW3CCredential = async (credential, bundleResolver) => {
  var _credentialDisplay$di, _credentialDisplay$di2;
  const credentialDisplay = (0, _display.getCredentialForDisplay)(credential);
  const params = {
    identifiers: {
      schemaId: '',
      credentialDefinitionId: credentialDisplay.id
    },
    meta: {
      alias: credentialDisplay.display.issuer.name,
      credConnectionId: undefined,
      credName: credentialDisplay.display.name
    },
    attributes: (0, _oca2.buildFieldsFromW3cCredsCredential)(credentialDisplay),
    language: _localization.i18n.language
  };
  const bundle = await bundleResolver.resolveAllBundles(params);
  const _bundle = bundle;
  const brandingOverlay = new _oca.BrandingOverlay('none', {
    capture_base: 'none',
    type: _legacy.BrandingOverlayType.Branding10,
    primary_background_color: credentialDisplay.display.backgroundColor,
    background_image: (_credentialDisplay$di = credentialDisplay.display.backgroundImage) === null || _credentialDisplay$di === void 0 ? void 0 : _credentialDisplay$di.uri,
    logo: (_credentialDisplay$di2 = credentialDisplay.display.logo) === null || _credentialDisplay$di2 === void 0 ? void 0 : _credentialDisplay$di2.uri
  });
  const ocaBundle = {
    ..._bundle,
    presentationFields: bundle.presentationFields,
    brandingOverlay: brandingOverlay
  };
  return ocaBundle;
};
const mapW3CCredToCard = (w3cCred, brandingOverlay, brandingOverlayTypeString) => {
  var _getAttributeField, _brandingOverlay$bran, _brandingOverlay$bran2, _brandingOverlay$bran3, _brandingOverlay$bran4, _brandingOverlay$bran5, _brandingOverlay$meta, _brandingOverlay$bund, _bundle2, _bundle3;
  const credentialDisplay = (0, _display.getCredentialForDisplay)(w3cCred);
  const extraAttributeValue = credentialDisplay.display.primary_overlay_attribute ? (_getAttributeField = (0, _oca2.getAttributeField)(credentialDisplay, credentialDisplay.display.primary_overlay_attribute)) === null || _getAttributeField === void 0 ? void 0 : _getAttributeField.field : undefined;
  const input = {
    vc: {
      issuer: credentialDisplay.display.description,
      type: credentialDisplay.metadata.type ? [credentialDisplay.metadata.type] : ['VerifiableCredential'],
      credentialSubject: credentialDisplay.credentialSubject,
      name: credentialDisplay.display.name
    },
    branding: {
      type: brandingOverlayTypeString,
      primaryBg: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bran = brandingOverlay.brandingOverlay) === null || _brandingOverlay$bran === void 0 ? void 0 : _brandingOverlay$bran.primaryBackgroundColor,
      secondaryBg: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bran2 = brandingOverlay.brandingOverlay) === null || _brandingOverlay$bran2 === void 0 ? void 0 : _brandingOverlay$bran2.secondaryBackgroundColor,
      logo1x1Uri: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bran3 = brandingOverlay.brandingOverlay) === null || _brandingOverlay$bran3 === void 0 ? void 0 : _brandingOverlay$bran3.logo,
      backgroundSliceUri: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bran4 = brandingOverlay.brandingOverlay) === null || _brandingOverlay$bran4 === void 0 ? void 0 : _brandingOverlay$bran4.backgroundImageSlice,
      backgroundFullUri: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bran5 = brandingOverlay.brandingOverlay) === null || _brandingOverlay$bran5 === void 0 ? void 0 : _brandingOverlay$bran5.backgroundImage,
      preferredTextColor: undefined,
      watermark: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$meta = brandingOverlay.metaOverlay) === null || _brandingOverlay$meta === void 0 ? void 0 : _brandingOverlay$meta.watermark
    },
    labels: brandingOverlay === null || brandingOverlay === void 0 || (_brandingOverlay$bund = brandingOverlay.bundle) === null || _brandingOverlay$bund === void 0 || (_brandingOverlay$bund = _brandingOverlay$bund.labelOverlay) === null || _brandingOverlay$bund === void 0 ? void 0 : _brandingOverlay$bund.attributeLabels,
    primary_overlay_attribute: extraAttributeValue,
    helpActionUrl: (brandingOverlay === null || brandingOverlay === void 0 || (_bundle2 = brandingOverlay.bundle) === null || _bundle2 === void 0 || (_bundle2 = _bundle2.bundle) === null || _bundle2 === void 0 || (_bundle2 = _bundle2.metadata) === null || _bundle2 === void 0 || (_bundle2 = _bundle2.issuerUrl) === null || _bundle2 === void 0 ? void 0 : _bundle2.en) ?? (brandingOverlay === null || brandingOverlay === void 0 || (_bundle3 = brandingOverlay.bundle) === null || _bundle3 === void 0 || (_bundle3 = _bundle3.bundle) === null || _bundle3 === void 0 || (_bundle3 = _bundle3.metadata) === null || _bundle3 === void 0 || (_bundle3 = _bundle3.issuerUrl) === null || _bundle3 === void 0 ? void 0 : _bundle3['en-US']) ?? undefined
  };
  return mapW3CToCard(input, credentialDisplay.id);
};

/**
 * Generic map function to convert a CredentialExchangeRecord (AnonCreds or W3C) to WalletCredentialCardData
 * Uses OCA bundle resolver to fetch overlays as needed.
 * If a brandingOverlay is provided, it will be used instead of resolving a new one.
 * If proof=true, will map in proof context (limited attributes, no PII, no primary/secondary ordering).
 */

async function mapCredentialTypeToCard({
  credential,
  bundleResolver,
  colorPalette,
  unknownIssuerName,
  brandingOverlay,
  proof = false,
  credentialErrors,
  credName,
  credentialConnectionLabel,
  displayItems
}) {
  var _bundle4, _resolvedBundle$captu, _overlay$bundle, _overlay$bundle2, _brandingOverlay, _brandingOverlay2, _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$metaOverlay3, _bundle5, _Object$values, _bundle6, _brandingOverlay3, _brandingOverlay4, _brandingOverlay5, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6, _brandingOverlay6, _brandingOverlay7;
  const brandingTypeString = brandingOverlayTypeString(bundleResolver.getBrandingOverlayType());

  //W3C case
  if (credential instanceof _core.W3cCredentialRecord || credential instanceof _core.SdJwtVcRecord || credential instanceof _core.MdocRecord) {
    const bo = brandingOverlay ?? (await resolveBundleForW3CCredential(credential, bundleResolver));
    return mapW3CCredToCard(credential, bo, brandingTypeString);
  }

  //Anoncreds case
  const rec = credential;
  if (!rec) return undefined;
  const isRevoked = !!(credentialErrors !== null && credentialErrors !== void 0 && credentialErrors.includes(_credentials.CredentialErrors.Revoked));
  const notInWallet = !!(credentialErrors !== null && credentialErrors !== void 0 && credentialErrors.includes(_credentials.CredentialErrors.NotInWallet));
  const params = {
    identifiers: (0, _credential.getCredentialIdentifiers)(rec),
    attributes: proof ? [] : rec.credentialAttributes,
    meta: {
      credName,
      credConnectionId: rec === null || rec === void 0 ? void 0 : rec.connectionId,
      alias: credentialConnectionLabel
    },
    language: _localization.i18n.language
  };
  const overlay = await bundleResolver.resolveAllBundles(params);
  const resolvedBundle = (overlay === null || overlay === void 0 || (_bundle4 = overlay.bundle) === null || _bundle4 === void 0 ? void 0 : _bundle4.bundle) ?? (overlay === null || overlay === void 0 ? void 0 : overlay.bundle);
  const overlayBundle = (resolvedBundle === null || resolvedBundle === void 0 ? void 0 : resolvedBundle.bundle) ?? resolvedBundle;
  const flagged = (overlayBundle === null || overlayBundle === void 0 ? void 0 : overlayBundle.flaggedAttributes) ?? (resolvedBundle === null || resolvedBundle === void 0 || (_resolvedBundle$captu = resolvedBundle.captureBase) === null || _resolvedBundle$captu === void 0 ? void 0 : _resolvedBundle$captu.flaggedAttributes) ?? [];
  const bundleLite = {
    labels: overlay === null || overlay === void 0 || (_overlay$bundle = overlay.bundle) === null || _overlay$bundle === void 0 || (_overlay$bundle = _overlay$bundle.labelOverlay) === null || _overlay$bundle === void 0 ? void 0 : _overlay$bundle.attributeLabels,
    formats: Object.fromEntries((((_overlay$bundle2 = overlay.bundle) === null || _overlay$bundle2 === void 0 ? void 0 : _overlay$bundle2.attributes) ?? []).map(a => [a.name, a.format])),
    flaggedPII: flagged.map(a => a.name),
    primaryAttributeKey: overlay === null || overlay === void 0 || (_brandingOverlay = overlay.brandingOverlay) === null || _brandingOverlay === void 0 ? void 0 : _brandingOverlay.primaryAttribute,
    secondaryAttributeKey: overlay === null || overlay === void 0 || (_brandingOverlay2 = overlay.brandingOverlay) === null || _brandingOverlay2 === void 0 ? void 0 : _brandingOverlay2.secondaryAttribute,
    issuer: overlay === null || overlay === void 0 || (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer,
    name: overlay === null || overlay === void 0 || (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name,
    watermark: overlay === null || overlay === void 0 || (_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.watermark,
    helpActionUrl: (overlay === null || overlay === void 0 || (_bundle5 = overlay.bundle) === null || _bundle5 === void 0 || (_bundle5 = _bundle5.bundle) === null || _bundle5 === void 0 || (_bundle5 = _bundle5.metadata) === null || _bundle5 === void 0 || (_bundle5 = _bundle5.issuerUrl) === null || _bundle5 === void 0 ? void 0 : _bundle5.en) ?? ((_Object$values = Object.values((overlay === null || overlay === void 0 || (_bundle6 = overlay.bundle) === null || _bundle6 === void 0 || (_bundle6 = _bundle6.bundle) === null || _bundle6 === void 0 || (_bundle6 = _bundle6.metadata) === null || _bundle6 === void 0 ? void 0 : _bundle6.issuerUrl) ?? {})) === null || _Object$values === void 0 ? void 0 : _Object$values[0]),
    branding: {
      type: brandingTypeString,
      primaryBg: (overlay === null || overlay === void 0 || (_brandingOverlay3 = overlay.brandingOverlay) === null || _brandingOverlay3 === void 0 ? void 0 : _brandingOverlay3.primaryBackgroundColor) ?? colorPalette.grayscale.lightGrey,
      secondaryBg: overlay === null || overlay === void 0 || (_brandingOverlay4 = overlay.brandingOverlay) === null || _brandingOverlay4 === void 0 ? void 0 : _brandingOverlay4.secondaryBackgroundColor,
      logo1x1Uri: overlay === null || overlay === void 0 || (_brandingOverlay5 = overlay.brandingOverlay) === null || _brandingOverlay5 === void 0 ? void 0 : _brandingOverlay5.logo,
      logoText: (_overlay$metaOverlay4 = overlay.metaOverlay) !== null && _overlay$metaOverlay4 !== void 0 && _overlay$metaOverlay4.issuer && ((_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.issuer) !== 'Unknown Contact' ? (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.issuer : unknownIssuerName,
      backgroundSliceUri: overlay === null || overlay === void 0 || (_brandingOverlay6 = overlay.brandingOverlay) === null || _brandingOverlay6 === void 0 ? void 0 : _brandingOverlay6.backgroundImageSlice,
      backgroundFullUri: overlay === null || overlay === void 0 || (_brandingOverlay7 = overlay.brandingOverlay) === null || _brandingOverlay7 === void 0 ? void 0 : _brandingOverlay7.backgroundImage,
      preferredTextColor: undefined
    }
  };
  return mapAnonCredsToCard(rec, bundleLite, {
    proofContext: !!proof,
    revoked: isRevoked,
    notInWallet,
    connectionLabel: credentialConnectionLabel,
    displayItems: proof ? displayItems : undefined
  });
}
//# sourceMappingURL=map-to-card.js.map