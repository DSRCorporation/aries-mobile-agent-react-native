"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ImageModal = _interopRequireDefault(require("../modals/ImageModal"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const RecordBinaryField = ({
  attributeValue,
  shown,
  style
}) => {
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [showImageModal, setShowImageModal] = (0, _react.useState)(false);
  const styles = _reactNative.StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText
    },
    image: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 10
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, shown ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Record.Zoom'),
    testID: (0, _testable.testIdWithKey)('zoom'),
    onPress: () => setShowImageModal(true),
    accessibilityRole: "imagebutton"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.image,
    source: {
      uri: attributeValue
    }
  })) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style || styles.text,
    testID: (0, _testable.testIdWithKey)('AttributeValue')
  }, _constants.hiddenFieldValue), showImageModal && /*#__PURE__*/_react.default.createElement(_ImageModal.default, {
    uri: attributeValue,
    onDismissPressed: () => setShowImageModal(false)
  }));
};
var _default = exports.default = RecordBinaryField;
//# sourceMappingURL=RecordBinaryField.js.map