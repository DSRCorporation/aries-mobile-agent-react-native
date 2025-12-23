import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import Text from '../texts/Text';
const SingleSelectBlock = ({
  selection,
  onSelect,
  initialSelect
}) => {
  const [selected, setSelected] = useState(initialSelect ?? selection[0]);
  const {
    Inputs
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 20
    },
    row: {
      ...Inputs.singleSelect,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  });
  const handleSelect = selected => {
    setSelected(selected);
    onSelect(selected);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, selection.map(item => /*#__PURE__*/React.createElement(TouchableOpacity, {
    key: item.id,
    style: styles.row,
    onPress: () => handleSelect(item),
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Text, {
    style: Inputs.singleSelectText
  }, item.value), item.id === selected.id ? /*#__PURE__*/React.createElement(Icon, {
    name: 'check',
    size: 25,
    color: Inputs.singleSelectIcon.color
  }) : null)));
};
export default SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map