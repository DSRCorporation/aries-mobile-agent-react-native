import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextTheme } from '../../../../theme';
const styles = StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: 24,
    minHeight: 48
  },
  languageText: {
    marginLeft: 8
  }
});
const SingleSelectBlock = ({
  selection,
  onSelect,
  initialSelect,
  color = TextTheme.normal.color
}) => {
  const {
    t
  } = useTranslation();
  const [selected, setSelected] = useState();
  const handleSelect = selected => {
    setSelected(selected);
    onSelect(selected);
  };
  useEffect(() => {
    if (initialSelect) {
      setSelected(initialSelect);
    }
  }, [initialSelect]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, selection === null || selection === void 0 ? void 0 : selection.map(item => /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: (item.id === (selected === null || selected === void 0 ? void 0 : selected.id) ? t('SelectionAxs.RadioChecked') : t('SelectionAxs.RadioUnchecked')) + item.value,
    accessibilityRole: "radio",
    accessibilityState: {
      selected: item.id === (selected === null || selected === void 0 ? void 0 : selected.id)
    },
    key: item.id,
    style: styles.flexView,
    onPress: () => handleSelect(item)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.id === (selected === null || selected === void 0 ? void 0 : selected.id) ? 'radio-button-checked' : 'radio-button-unchecked',
    size: 36,
    color: color
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.languageText, TextTheme.normal]
  }, item.value))));
};
export default SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map