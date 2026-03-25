"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _legacy = require("@bifold/oca/build/legacy");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _CardPresenter = _interopRequireDefault(require("../../wallet/CardPresenter"));
var _mapToCard = require("../../wallet/map-to-card");
var _reactI18next = require("react-i18next");
var _helpers = require("../../utils/helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// packages/core/src/components/misc/CredentialCard.tsx

// unified wallet-model imports

const CredentialCardGen = ({
  credential,
  proof,
  credName,
  hasAltCredentials,
  handleAltCredChange,
  onPress = undefined,
  credentialErrors,
  brandingOverlay,
  displayItems
}) => {
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);

  // unified card data
  const [cardData, setCardData] = (0, _react.useState)(undefined);

  //Generic Mapping
  (0, _react.useEffect)(() => {
    const resolveOverlay = async cred => {
      const cardData = await (0, _mapToCard.mapCredentialTypeToCard)({
        credential: cred,
        bundleResolver,
        colorPalette: ColorPalette,
        unknownIssuerName: t('Contacts.UnknownContact'),
        brandingOverlay,
        proof,
        credentialErrors,
        credName,
        credentialConnectionLabel,
        displayItems
      });
      setCardData(cardData);
    };
    if (credential) {
      resolveOverlay(credential);
    }
  }, [credential, bundleResolver, ColorPalette, brandingOverlay, proof, credentialErrors, t, credName, credentialConnectionLabel, displayItems]);

  // ---- Fallback while mapping is in-flight ----
  if (!cardData) {
    const isBranding10 = bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10;
    return /*#__PURE__*/_react.default.createElement(_CardPresenter.default, {
      data: {
        id: 'loading',
        issuerName: '',
        credentialName: credName ?? 'Credential',
        branding: {
          primaryBg: isBranding10 ? ColorPalette.brand.secondaryBackground : undefined,
          secondaryBg: undefined
        },
        items: [],
        brandingType: (0, _mapToCard.brandingOverlayTypeString)(bundleResolver.getBrandingOverlayType())
      },
      onPress: onPress,
      hasAltCredentials: hasAltCredentials,
      onChangeAlt: handleAltCredChange,
      elevated: !!proof
    });
  }
  return /*#__PURE__*/_react.default.createElement(_CardPresenter.default, {
    data: cardData,
    onPress: onPress,
    hasAltCredentials: hasAltCredentials,
    onChangeAlt: handleAltCredChange,
    elevated: cardData.brandingType === 'Branding10' || !!proof
  });
};
var _default = exports.default = CredentialCardGen;
//# sourceMappingURL=CredentialCardGen.js.map