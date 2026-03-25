import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemedText } from '../texts/ThemedText';
function isDataImage(value) {
  return typeof value === 'string' && /^data:image\//.test(value);
}
export const CredentialAttributeRow = ({
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.cardAttributeContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      style: {
        paddingTop: 2,
        paddingHorizontal: 2
      },
      name: "close",
      size: styles.recordAttributeText.fontSize
    }), /*#__PURE__*/React.createElement(ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        opacity: 0.8
      }]
    }, item.label)), /*#__PURE__*/React.createElement(ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        opacity: 0.8
      }]
    }, errorText));
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.cardAttributeContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, warn && /*#__PURE__*/React.createElement(Icon, {
    style: {
      paddingTop: 2,
      paddingHorizontal: 2
    },
    name: "warning",
    size: styles.recordAttributeText.fontSize
  }), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "labelSubtitle",
    style: [styles.textContainer, {
      lineHeight: 19,
      opacity: 0.8
    }]
  }, item.label)), isDataImage(item.value) ? /*#__PURE__*/React.createElement(Image, {
    style: styles.imageAttr,
    source: {
      uri: item.value
    }
  }) : /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: [styles.textContainer, {
      color: textColor
    }]
  }, String(item.value ?? '')));
};
//# sourceMappingURL=AttributeRow.js.map