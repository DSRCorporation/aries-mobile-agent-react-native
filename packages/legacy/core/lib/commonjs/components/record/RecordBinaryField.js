"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ImageModal = _interopRequireDefault(require("../../components/modals/ImageModal"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    onPress: () => setShowImageModal(true)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.image,
    source: {
      uri: attributeValue
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style || styles.text,
    testID: (0, _testable.testIdWithKey)('AttributeValue')
  }, _constants.hiddenFieldValue), showImageModal && /*#__PURE__*/_react.default.createElement(_ImageModal.default, {
    uri: attributeValue,
    onDismissPressed: () => setShowImageModal(false)
  }));
};
var _default = exports.default = RecordBinaryField;
//# sourceMappingURL=RecordBinaryField.js.map