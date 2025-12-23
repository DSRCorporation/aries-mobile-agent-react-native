import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import RecordField from './RecordField';
import RecordFooter from './RecordFooter';
import RecordHeader from './RecordHeader';
const Record = ({
  header,
  footer,
  fields,
  hideFieldValues = false,
  field = null
}) => {
  const {
    t
  } = useTranslation();
  const [shown, setShown] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const {
    ListItems,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    linkContainer: {
      ...ListItems.recordContainer,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    link: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    }
  });
  const resetShown = () => {
    setShown(fields.map(() => showAll));
    setShowAll(!showAll);
  };
  const toggleShownState = newShowStates => {
    if (newShowStates.filter(shownState => shownState === showAll).length > Math.floor(fields.length / 2)) {
      setShowAll(!showAll);
    }
  };
  useEffect(() => {
    resetShown();
  }, []);
  return /*#__PURE__*/React.createElement(FlatList, {
    data: fields,
    keyExtractor: ({
      name
    }, index) => name || index.toString(),
    renderItem: ({
      item: attr,
      index
    }) => field ? field(attr, index, fields) : /*#__PURE__*/React.createElement(RecordField, {
      field: attr,
      hideFieldValue: hideFieldValues,
      onToggleViewPressed: () => {
        const newShowState = [...shown];
        newShowState[index] = !shown[index];
        setShown(newShowState);
        toggleShownState(newShowState);
      },
      shown: hideFieldValues ? !!shown[index] : true,
      hideBottomBorder: index === fields.length - 1
    }),
    ListHeaderComponent: header ? /*#__PURE__*/React.createElement(RecordHeader, null, header(), hideFieldValues ? /*#__PURE__*/React.createElement(View, {
      style: styles.linkContainer
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.link,
      activeOpacity: 1,
      onPress: () => resetShown(),
      testID: testIdWithKey('HideAll'),
      accessible: true,
      accessibilityLabel: showAll ? t('Record.ShowAll') : t('Record.HideAll')
    }, /*#__PURE__*/React.createElement(Text, {
      style: ListItems.recordLink
    }, showAll ? t('Record.ShowAll') : t('Record.HideAll')))) : null) : null,
    ListFooterComponent: footer ? /*#__PURE__*/React.createElement(RecordFooter, null, footer()) : null
  });
};
export default Record;
//# sourceMappingURL=Record.js.map