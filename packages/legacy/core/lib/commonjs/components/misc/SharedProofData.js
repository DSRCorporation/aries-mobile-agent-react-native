"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _VerifierCredentialCard = _interopRequireDefault(require("../../components/misc/VerifierCredentialCard"));
var _animatedComponents = require("../../contexts/animated-components");
var _theme = require("../../contexts/theme");
var _oca = require("../../utils/oca");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SharedDataCard = ({
  sharedData
}) => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const [attributes, setAttributes] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const attributes = (0, _oca.buildFieldsFromSharedAnonCredsProof)(sharedData.data);
    setAttributes(attributes);
  }, [sharedData]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_VerifierCredentialCard.default, {
    displayItems: attributes,
    style: {
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    credDefId: sharedData.identifiers.cred_def_id,
    schemaId: sharedData.identifiers.schema_id,
    elevated: true
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
    (0, _ariesBifoldVerifier.getProofData)(agent, recordId).then(data => {
      if (data) {
        const groupedSharedProofData = (0, _ariesBifoldVerifier.groupSharedProofDataByCredential)(data);
        const sharedData = Array.from(groupedSharedProofData.values());
        setSharedData(sharedData);
        if (!onSharedProofDataLoad) return;
        onSharedProofDataLoad(sharedData);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [recordId]);
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