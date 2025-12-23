"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@hyperledger/aries-oca/build/legacy");
var _react = _interopRequireDefault(require("react"));
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _CredentialCard = _interopRequireDefault(require("./CredentialCard10"));
var _CredentialCard2 = _interopRequireDefault(require("./CredentialCard11"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CredentialCard = ({
  credential,
  credDefId,
  schemaId,
  proof,
  displayItems,
  credName,
  existsInWallet,
  satisfiedPredicates,
  hasAltCredentials,
  handleAltCredChange,
  style = {},
  onPress = undefined
}) => {
  // add ability to reference credential by ID, allows us to get past react hook restrictions
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const getCredOverlayType = type => {
    if (proof) {
      return /*#__PURE__*/_react.default.createElement(_CredentialCard2.default, {
        displayItems: displayItems,
        style: {
          backgroundColor: ColorPallet.brand.secondaryBackground
        },
        error: !existsInWallet,
        predicateError: !satisfiedPredicates,
        credName: credName,
        credDefId: credDefId,
        schemaId: schemaId,
        credential: credential,
        handleAltCredChange: handleAltCredChange,
        hasAltCredentials: hasAltCredentials,
        proof: true,
        elevated: true
      });
    }
    if (credential) {
      if (type === _legacy.BrandingOverlayType.Branding01) {
        return /*#__PURE__*/_react.default.createElement(_CredentialCard.default, {
          credential: credential,
          style: style,
          onPress: onPress
        });
      } else {
        return /*#__PURE__*/_react.default.createElement(_CredentialCard2.default, {
          credential: credential,
          style: style,
          onPress: onPress
        });
      }
    } else {
      return /*#__PURE__*/_react.default.createElement(_CredentialCard2.default, {
        credDefId: credDefId,
        schemaId: schemaId,
        credName: credName,
        displayItems: displayItems,
        style: style,
        onPress: onPress
      });
    }
  };
  return getCredOverlayType(bundleResolver.getBrandingOverlayType());
};
var _default = exports.default = CredentialCard;
//# sourceMappingURL=CredentialCard.js.map