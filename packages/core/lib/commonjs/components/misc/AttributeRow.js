"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CredentialAttributeRow = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isDataImage(value) {
  return typeof value === 'string' && /^data:image\//.test(value);
}
const CredentialAttributeRow = ({
  item,
  textColor,
  showPiiWarning,
  isNotInWallet,
  styles
}) => {
  var _item$predicate, _item$predicate2;
  const warn = showPiiWarning && (item.isPII ?? false) && !((_item$predicate = item.predicate) !== null && _item$predicate !== void 0 && _item$predicate.present);
  const predicateFailed = ((_item$predicate2 = item.predicate) === null || _item$predicate2 === void 0 ? void 0 : _item$predicate2.present) && item.predicate.satisfied === false;
  const hasError = Boolean(isNotInWallet || item.hasError || predicateFailed);
  if (hasError) {
    const errorText = isNotInWallet ? 'Not available in your wallet' : predicateFailed ? 'Predicate not satisfied' : 'Missing attribute';
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardAttributeContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: {
        paddingTop: 2,
        paddingHorizontal: 2
      },
      name: "close",
      size: styles.recordAttributeText.fontSize
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        opacity: 0.8
      }]
    }, item.label)), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        opacity: 0.8
      }]
    }, errorText));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cardAttributeContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, warn && /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: {
      paddingTop: 2,
      paddingHorizontal: 2
    },
    name: "warning",
    size: styles.recordAttributeText.fontSize
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "labelSubtitle",
    style: [styles.textContainer, {
      lineHeight: 19,
      opacity: 0.8
    }]
  }, item.label)), isDataImage(item.value) ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.imageAttr,
    source: {
      uri: item.value
    }
  }) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: [styles.textContainer, {
      color: textColor
    }]
  }, String(item.value ?? '')));
};
exports.CredentialAttributeRow = CredentialAttributeRow;
//# sourceMappingURL=AttributeRow.js.map