import { CaptureBaseAttributeType } from '@hyperledger/aries-oca';
import startCase from 'lodash.startcase';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hiddenFieldValue } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { isDataUrl } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import RecordBinaryField from './RecordBinaryField';
import RecordDateIntField from './RecordDateIntField';
export const validEncoding = 'base64';
export const validFormat = new RegExp('^image/(jpeg|png|jpg)');
export const AttributeValue = ({
  field,
  style,
  shown
}) => {
  const {
    ListItems
  } = useTheme();
  const styles = StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText
    }
  });
  if (field.encoding == validEncoding && field.format && validFormat.test(field.format) && field.value || isDataUrl(field.value)) {
    return /*#__PURE__*/React.createElement(RecordBinaryField, {
      attributeValue: field.value,
      style: style,
      shown: shown
    });
  }
  if (field.type == CaptureBaseAttributeType.DateInt || field.type == CaptureBaseAttributeType.DateTime) {
    return /*#__PURE__*/React.createElement(RecordDateIntField, {
      field: field,
      style: style,
      shown: shown
    });
  }
  return /*#__PURE__*/React.createElement(Text, {
    style: style || styles.text,
    testID: testIdWithKey('AttributeValue')
  }, shown ? field.value : hiddenFieldValue);
};
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
  } = useTranslation();
  const {
    ListItems
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      ...ListItems.recordContainer,
      paddingHorizontal: 25,
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
    valueText: {
      ...ListItems.recordAttributeText,
      paddingVertical: 4
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.valueContainer
  }, fieldLabel ? fieldLabel(field) : /*#__PURE__*/React.createElement(Text, {
    style: ListItems.recordAttributeLabel,
    testID: testIdWithKey('AttributeName')
  }, field.label ?? startCase(field.name || '')), hideFieldValue ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: shown ? t('Record.Hide') : t('Record.Show'),
    testID: testIdWithKey('ShowHide'),
    activeOpacity: 1,
    onPress: onToggleViewPressed,
    style: styles.link
  }, /*#__PURE__*/React.createElement(Text, {
    style: ListItems.recordLink
  }, shown ? t('Record.Hide') : t('Record.Show'))) : null), /*#__PURE__*/React.createElement(View, {
    style: styles.valueContainer
  }, fieldValue ? fieldValue(field) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.valueText
  }, /*#__PURE__*/React.createElement(AttributeValue, {
    field: field,
    shown: shown
  })))), /*#__PURE__*/React.createElement(View, {
    style: [styles.border, hideBottomBorder && {
      borderBottomWidth: 0
    }]
  }));
};
export default RecordField;
//# sourceMappingURL=RecordField.js.map