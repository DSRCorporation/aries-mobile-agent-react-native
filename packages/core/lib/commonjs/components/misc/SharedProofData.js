"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _verifier = require("@bifold/verifier");
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _VerifierCredentialCard = _interopRequireDefault(require("./VerifierCredentialCard"));
var _animatedComponents = require("../../contexts/animated-components");
var _theme = require("../../contexts/theme");
var _oca = require("../../utils/oca");
var _containerApi = require("../../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SharedDataCard = ({
  sharedData
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [attributes, setAttributes] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const attributes = (0, _oca.buildFieldsFromSharedAnonCredsProof)(sharedData.data);
    setAttributes(attributes);
  }, [sharedData]);
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_VerifierCredentialCard.default, {
    displayItems: attributes,
    style: bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10 ? {
      backgroundColor: ColorPalette.brand.secondaryBackground
    } : undefined,
    credDefId: sharedData.identifiers.cred_def_id,
    schemaId: sharedData.identifiers.schema_id,
    elevated: true,
    brandingOverlayType: bundleResolver.getBrandingOverlayType()
  }));
};
const SharedProofData = ({
  recordId,
  onSharedProofDataLoad
}) => {
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    LoadingIndicator
  } = (0, _animatedComponents.useAnimatedComponents)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1
    },
    loaderContainer: {
      height: 200,
      marginTop: 80
    }
  });
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const [loading, setLoading] = (0, _react.useState)(true);
  const [sharedData, setSharedData] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    (0, _verifier.getProofData)(agent, recordId).then(data => {
      if (data) {
        const groupedSharedProofData = (0, _verifier.groupSharedProofDataByCredential)(data);
        const sharedData = Array.from(groupedSharedProofData.values());
        setSharedData(sharedData);
        if (!onSharedProofDataLoad) return;
        onSharedProofDataLoad(sharedData);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [agent, recordId, onSharedProofDataLoad]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, loading || !sharedData ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loaderContainer
  }, /*#__PURE__*/_react.default.createElement(LoadingIndicator, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, sharedData.map(item => /*#__PURE__*/_react.default.createElement(SharedDataCard, {
    key: item.identifiers.cred_def_id,
    sharedData: item
  }))));
};
var _default = exports.default = SharedProofData;
//# sourceMappingURL=SharedProofData.js.map