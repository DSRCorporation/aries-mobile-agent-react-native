"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _theme = require("../../../../../contexts/theme");
var _oca = require("../../../../../utils/oca");
var _display = require("../../../display");
var _CredentialCardGen = _interopRequireDefault(require("../../../../../components/misc/CredentialCardGen"));
var _Record = _interopRequireDefault(require("../../../../../components/record/Record"));
var _OpenIDUnsatisfiedProofRequest = _interopRequireDefault(require("../../../components/OpenIDUnsatisfiedProofRequest"));
var _ThemedText = require("../../../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OpenIDProofRequestBody = ({
  credentialsRequested,
  onPressAltCredChange,
  selectedCredentialsSubmission,
  submission,
  verifierName
}) => {
  const {
    ColorPalette,
    Spacing,
    ListItems
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    cardContainer: {
      paddingHorizontal: 12,
      paddingBottom: 24
    },
    detailContainer: {
      paddingHorizontal: 8,
      paddingVertical: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground,
      marginBottom: 20
    },
    cardGroupHeader: {
      padding: 8,
      marginVertical: 8
    },
    credentialsList: {
      marginTop: 20,
      justifyContent: 'space-between'
    }
  });
  if (submission && !submission.areAllSatisfied) {
    return /*#__PURE__*/_react.default.createElement(_OpenIDUnsatisfiedProofRequest.default, {
      credentialName: submission === null || submission === void 0 ? void 0 : submission.name,
      requestPurpose: submission === null || submission === void 0 ? void 0 : submission.purpose,
      verifierName: verifierName
    });
  }
  if (!selectedCredentialsSubmission || !submission) return;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.credentialsList
  }, Object.entries(selectedCredentialsSubmission).map(([inputDescriptorId, credentialSimplified]) => {
    var _submission$entries;
    //TODO: Support multiple credentials
    const correspondingSubmission = (_submission$entries = submission.entries) === null || _submission$entries === void 0 ? void 0 : _submission$entries.find(s => s.inputDescriptorId === inputDescriptorId);
    const isSatisfied = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.isSatisfied;
    const credentialSubmission = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.credentials.find(s => s.id === credentialSimplified.id);
    const requestedAttributes = credentialSubmission === null || credentialSubmission === void 0 ? void 0 : credentialSubmission.requestedAttributes;
    const hasMultipleCreds = correspondingSubmission !== null && correspondingSubmission !== void 0 && correspondingSubmission.credentials ? correspondingSubmission.credentials.length > 1 : false;
    const credential = credentialsRequested.find(c => c.id === (credentialSubmission === null || credentialSubmission === void 0 ? void 0 : credentialSubmission.id));
    if (!credential || !correspondingSubmission) {
      return null;
    }
    const credentialDisplay = (0, _display.getCredentialForDisplay)(credential);
    const fields = (0, _oca.buildFieldsFromW3cCredsCredential)(credentialDisplay, requestedAttributes);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: credentialSimplified.id
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContainer
    }, isSatisfied && requestedAttributes && /*#__PURE__*/_react.default.createElement(_CredentialCardGen.default, {
      credential: credential,
      hasAltCredentials: hasMultipleCreds
    }), hasMultipleCreds && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingTop: Spacing.sm
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => onPressAltCredChange(correspondingSubmission.inputDescriptorId, credential.id)
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: ListItems.recordLink
    }, t('ProofRequest.UseDifferentCard'))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.detailContainer
    }, /*#__PURE__*/_react.default.createElement(_Record.default, {
      fields: fields,
      hideFieldValues: true,
      header: () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null),
      scrollEnabled: false,
      isProofRequest: true
    })));
  }));
};
var _default = exports.default = OpenIDProofRequestBody;
//# sourceMappingURL=OpenIDProofRequestBody.js.map