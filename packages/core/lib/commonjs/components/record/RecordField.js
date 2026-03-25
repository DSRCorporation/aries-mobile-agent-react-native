"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validFormat = exports.validEncoding = exports.default = exports.AttributeValue = void 0;
var _oca = require("@bifold/oca");
var _legacy = require("@bifold/oca/build/legacy");
var _lodash = _interopRequireDefault(require("lodash.startcase"));
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _RecordBinaryField = _interopRequireDefault(require("./RecordBinaryField"));
var _RecordDateIntField = _interopRequireDefault(require("./RecordDateIntField"));
var _containerApi = require("../../container-api");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validEncoding = exports.validEncoding = 'base64';
const validFormat = exports.validFormat = new RegExp('^image/(jpeg|png|jpg)');
const AttributeValue = ({
  field,
  style,
  shown
}) => {
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText
    }
  });
  if (field.encoding == validEncoding && field.format && validFormat.test(field.format) && field.value || (0, _helpers.isDataUrl)(field.value)) {
    return /*#__PURE__*/_react.default.createElement(_RecordBinaryField.default, {
      attributeValue: field.value,
      style: style,
      shown: shown
    });
  }
  if (field.type == _oca.CaptureBaseAttributeType.DateInt || field.type == _oca.CaptureBaseAttributeType.DateTime) {
    return /*#__PURE__*/_react.default.createElement(_RecordDateIntField.default, {
      field: field,
      style: style,
      shown: shown
    });
  }
  return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style || styles.text,
    testID: (0, _testable.testIdWithKey)('AttributeValue')
  }, shown ? field.value : _constants.hiddenFieldValue);
};
exports.AttributeValue = AttributeValue;
const RecordField = ({
  field,
  hideFieldValue = false,
  hideBottomBorder = false,
  shown = !hideFieldValue,
  onToggleViewPressed = () => undefined,
  fieldLabel = null,
  fieldValue = null
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      ...ListItems.recordContainer,
      paddingHorizontal: bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10 ? 25 : 16,
      paddingTop: 16
    },
    border: {
      ...ListItems.recordBorder,
      borderBottomWidth: 2,
      paddingTop: 12
    },
    link: {
      ...ListItems.recordLink,
      paddingVertical: 2
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5
    },
    fieldLabel: {
      flex: 3
    },
    fieldValue: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    valueText: {
      ...ListItems.recordAttributeText,
      paddingVertical: 4
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.valueContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.fieldLabel
  }, fieldLabel ? fieldLabel(field) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: ListItems.recordAttributeLabel,
    testID: (0, _testable.testIdWithKey)('AttributeName')
  }, field.label ?? (0, _lodash.default)(field.name || ''))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.fieldValue
  }, hideFieldValue ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: shown ? t('Record.Hide') : t('Record.Show'),
    accessibilityRole: "button",
    testID: (0, _testable.testIdWithKey)('ShowHide'),
    activeOpacity: 1,
    onPress: onToggleViewPressed,
    style: styles.link
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    maxFontSizeMultiplier: 1.2,
    style: ListItems.recordLink
  }, shown ? t('Record.Hide') : t('Record.Show'))) : null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.valueContainer
  }, fieldValue ? fieldValue(field) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.valueText
  }, /*#__PURE__*/_react.default.createElement(AttributeValue, {
    field: field,
    shown: shown
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.border, hideBottomBorder && {
      borderBottomWidth: 0
    }]
  }));
};
var _default = exports.default = RecordField;
//# sourceMappingURL=RecordField.js.map