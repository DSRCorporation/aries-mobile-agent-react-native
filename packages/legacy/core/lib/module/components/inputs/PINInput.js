function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop, minPINLength } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const PINInputComponent = ({
  label,
  onPINChanged,
  testID,
  accessibilityLabel,
  autoFocus = false
}, ref) => {
  // const accessible = accessibilityLabel && accessibilityLabel !== '' ? true : false
  const [PIN, setPIN] = useState('');
  const [showPIN, setShowPIN] = useState(false);
  const {
    t
  } = useTranslation();
  const {
    TextTheme,
    PINInputTheme
  } = useTheme();
  const cellHeight = 48;
  const onChangeText = value => {
    onPINChanged && onPINChanged(value);
    setPIN(value);
  };
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: PIN,
    setValue: onChangeText
  });
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      flex: 1,
      marginBottom: 24
    },
    labelAndFieldContainer: {
      flexGrow: 1
    },
    codeFieldRoot: {
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 4,
      justifyContent: 'flex-start',
      ...PINInputTheme.cell
    },
    cell: {
      height: cellHeight,
      paddingHorizontal: 2,
      backgroundColor: PINInputTheme.cell.backgroundColor
    },
    cellText: {
      ...TextTheme.headingThree,
      color: PINInputTheme.cellText.color,
      textAlign: 'center',
      lineHeight: cellHeight
    },
    hideIcon: {
      flexShrink: 1,
      marginVertical: 10,
      paddingHorizontal: 10
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: style.labelAndFieldContainer
  }, label && /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.label, {
      marginBottom: 8
    }]
  }, label), /*#__PURE__*/React.createElement(CodeField, _extends({}, props, {
    testID: testID,
    accessibilityLabel: accessibilityLabel,
    accessible: true,
    value: PIN,
    rootStyle: style.codeFieldRoot,
    onChangeText: onChangeText,
    cellCount: minPINLength,
    keyboardType: "numeric",
    textContentType: "password",
    renderCell: ({
      index,
      symbol,
      isFocused
    }) => {
      let child = '';
      if (symbol) {
        child = showPIN ? symbol : '●';
      } else if (isFocused) {
        child = /*#__PURE__*/React.createElement(Cursor, null);
      }
      return /*#__PURE__*/React.createElement(View, {
        key: index,
        style: style.cell,
        onLayout: getCellOnLayoutHandler(index)
      }, /*#__PURE__*/React.createElement(Text, {
        style: style.cellText,
        maxFontSizeMultiplier: 1
      }, child));
    },
    autoFocus: autoFocus,
    ref: ref
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.hideIcon
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: showPIN ? t('PINCreate.Hide') : t('PINCreate.Show'),
    accessibilityRole: 'button',
    testID: showPIN ? testIdWithKey('Hide') : testIdWithKey('Show'),
    onPress: () => setShowPIN(!showPIN),
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    color: PINInputTheme.icon.color,
    name: showPIN ? 'visibility-off' : 'visibility',
    size: 30
  }))));
};
const PINInput = /*#__PURE__*/forwardRef(PINInputComponent);
export default PINInput;
//# sourceMappingURL=PINInput.js.map