function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell, MaskSymbol, isLastFilledCell } from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop, minPINLength } from '../../constants';
import { useServices, TOKENS } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import { InlineErrorPosition } from '../../types/error';
import { testIdWithKey } from '../../utils/testable';
import { ThemedText } from '../texts/ThemedText';
import InlineErrorText from './InlineErrorText';

// adjusting for the spaces between numbers
const cellCount = minPINLength * 2 - 1;
const separatedPINCellCount = 6;
const PINInput = ({
  label,
  onPINChanged,
  testID,
  accessibilityLabel,
  autoFocus = false,
  inlineMessage,
  onSubmitEditing = () => {},
  ref
}) => {
  const [{
    PINScreensConfig
  }] = useServices([TOKENS.CONFIG]);
  const {
    PINInputTheme,
    SeparatedPINInputTheme,
    ColorPalette
  } = useTheme();
  const theme = PINScreensConfig.useNewPINDesign ? SeparatedPINInputTheme : PINInputTheme;
  const [PIN, setPIN] = useState('');
  const [showPIN, setShowPIN] = useState(false);
  const {
    t
  } = useTranslation();
  const cellHeight = 48;

  // including spaces to prevent screen reader from reading the PIN as a single number
  // filling with bullets when masked to prevent screen reader from reading the actual PIN
  // and to have the proper appearance when the PIN is masked
  const displayValue = useMemo(() => {
    if (showPIN) {
      return PIN.split('').join(' ');
    } else {
      return '●'.repeat(PIN.length).split('').join(' ');
    }
  }, [PIN, showPIN]);
  const onChangeText = useCallback(value => {
    const cleanValue = value.replaceAll(' ', '');
    // typed new characters
    if (cleanValue.length > PIN.length) {
      // add new characters to the actual PIN
      // only allow numbers
      const newChars = cleanValue.slice(PIN.length);
      const newPIN = PIN + newChars.replace(/●/g, '').replace(/\D/g, '');
      setPIN(newPIN);
      onPINChanged && onPINChanged(newPIN);
      // characters were removed
    } else if (cleanValue.length < displayValue.replaceAll(' ', '').length) {
      // remove same number of characters from actual PIN
      const newPIN = PIN.slice(0, cleanValue.length);
      setPIN(newPIN);
      onPINChanged && onPINChanged(newPIN);
    }
  }, [PIN, displayValue, onPINChanged]);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: PINScreensConfig.useNewPINDesign ? PIN : displayValue,
    setValue: onChangeText
  });
  const allyLabel = useMemo(() => {
    return showPIN ? accessibilityLabel : t('PINCreate.Masked');
  }, [accessibilityLabel, showPIN, t]);
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginBottom: 24
    },
    codeFieldContainer: {
      flex: 1
    },
    cell: {
      ...theme.cell,
      borderColor: inlineMessage && PINScreensConfig.useNewPINDesign ? ColorPalette.semantic.error : theme.cell.borderColor
    },
    cellText: {
      color: theme.cellText.color,
      textAlign: 'center',
      lineHeight: cellHeight
    },
    hideIcon: {
      paddingLeft: PINScreensConfig.useNewPINDesign ? 2 : 10
    }
  });
  const content = () => /*#__PURE__*/React.createElement(View, {
    style: theme.labelAndFieldContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.codeFieldContainer
  }, /*#__PURE__*/React.createElement(CodeField, _extends({}, props, {
    testID: testID,
    accessibilityLabel: allyLabel,
    accessibilityRole: 'text',
    accessible: true,
    value: PINScreensConfig.useNewPINDesign ? PIN : displayValue,
    rootStyle: theme.codeFieldRoot,
    onChangeText: onChangeText,
    cellCount: PINScreensConfig.useNewPINDesign ? separatedPINCellCount : cellCount,
    keyboardType: "number-pad",
    textContentType: "password",
    renderCell: ({
      index,
      symbol,
      isFocused
    }) => {
      let child = '';
      // skip spaces
      if (symbol && symbol !== ' ') {
        if (PINScreensConfig.useNewPINDesign) {
          child = showPIN ? symbol : /*#__PURE__*/React.createElement(MaskSymbol, {
            maskSymbol: "\u25CF",
            isLastFilledCell: isLastFilledCell({
              index,
              value: PINScreensConfig.useNewPINDesign ? PIN : displayValue
            })
          }, symbol);
        } else {
          child = symbol;
        }
      } else if (isFocused) {
        child = /*#__PURE__*/React.createElement(Cursor, null);
      }
      return /*#__PURE__*/React.createElement(View, {
        key: index,
        style: style.cell,
        onLayout: getCellOnLayoutHandler(index)
      }, /*#__PURE__*/React.createElement(ThemedText, {
        variant: "headingThree",
        style: style.cellText,
        maxFontSizeMultiplier: 1
      }, child));
    },
    autoFocus: autoFocus,
    ref: ref,
    onSubmitEditing: e => {
      var _e$nativeEvent;
      onSubmitEditing((e === null || e === void 0 || (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.text) ?? '');
    }
  }))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: style.hideIcon,
    accessibilityLabel: showPIN ? t('PINCreate.Hide') : t('PINCreate.Show'),
    accessibilityRole: 'button',
    testID: showPIN ? testIdWithKey('Hide') : testIdWithKey('Show'),
    onPress: () => setShowPIN(!showPIN),
    hitSlop: PINScreensConfig.useNewPINDesign ? {
      ...hitSlop,
      left: 10
    } : hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    color: PINInputTheme.icon.color,
    name: showPIN ? 'visibility-off' : 'visibility',
    size: 30
  })));
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, label && /*#__PURE__*/React.createElement(ThemedText, {
    variant: PINScreensConfig.useNewPINDesign ? 'labelTitle' : 'label',
    style: {
      marginBottom: 8
    }
  }, label), (inlineMessage === null || inlineMessage === void 0 ? void 0 : inlineMessage.config.position) === InlineErrorPosition.Above ? /*#__PURE__*/React.createElement(InlineErrorText, {
    message: inlineMessage.message,
    inlineType: inlineMessage.inlineType,
    config: inlineMessage.config
  }) : null, content(), (inlineMessage === null || inlineMessage === void 0 ? void 0 : inlineMessage.config.position) === InlineErrorPosition.Below ? /*#__PURE__*/React.createElement(InlineErrorText, {
    message: inlineMessage.message,
    inlineType: inlineMessage.inlineType,
    config: inlineMessage.config
  }) : null);
};
export default PINInput;
//# sourceMappingURL=PINInput.js.map