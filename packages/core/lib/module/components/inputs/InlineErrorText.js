import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import { ThemedText } from '../texts/ThemedText';
export let InlineErrorType = /*#__PURE__*/function (InlineErrorType) {
  InlineErrorType[InlineErrorType["error"] = 0] = "error";
  InlineErrorType[InlineErrorType["warning"] = 1] = "warning";
  return InlineErrorType;
}({});
const InlineErrorText = ({
  message,
  inlineType,
  config
}) => {
  const {
    InputInlineMessage
  } = useTheme();
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignContent: 'center',
      marginVertical: 5,
      paddingRight: 20
    },
    icon: {
      marginRight: 4
    }
  });
  const color = inlineType === InlineErrorType.warning ? InputInlineMessage.inlineWarningText.color : InputInlineMessage.inlineErrorText.color;
  const props = {
    height: 24,
    width: 24,
    color: color,
    style: style.icon
  };
  const getInlineErrorIcon = () => {
    if (!config.hasErrorIcon) return null;
    if (inlineType === InlineErrorType.warning) {
      return /*#__PURE__*/React.createElement(InputInlineMessage.InlineWarningIcon, props);
    } else {
      return /*#__PURE__*/React.createElement(InputInlineMessage.InlineErrorIcon, props);
    }
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [style.container, config.style]
  }, getInlineErrorIcon(), /*#__PURE__*/React.createElement(ThemedText, {
    style: [InputInlineMessage.inlineErrorText],
    testID: testIdWithKey('InlineErrorText')
  }, message));
};
export default InlineErrorText;
//# sourceMappingURL=InlineErrorText.js.map