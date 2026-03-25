import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import RecordField from './RecordField';
import RecordFooter from './RecordFooter';
import RecordHeader from './RecordHeader';
import { TOKENS, useServices } from '../../container-api';
import { ThemedText } from '../texts/ThemedText';
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
  const {
    ListItems,
    TextTheme
  } = useTheme();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const styles = StyleSheet.create({
    linkContainer: {
      ...ListItems.recordContainer,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding10 ? 25 : 16,
      paddingVertical: 16
    },
    link: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    }
  });
  const hideAll = useCallback(() => {
    setShown(fields.map(() => false));
  }, [fields]);
  useEffect(() => {
    hideAll();
  }, [hideAll]);
  return /*#__PURE__*/React.createElement(FlatList, {
    data: fields,
    keyExtractor: ({
      name
    }, index) => name || index.toString(),
    showsVerticalScrollIndicator: false,
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
      },
      shown: hideFieldValues ? !!shown[index] : true,
      hideBottomBorder: index === fields.length - 1
    }),
    ListHeaderComponent: header ? /*#__PURE__*/React.createElement(RecordHeader, null, header(), hideFieldValues ? /*#__PURE__*/React.createElement(View, {
      style: styles.linkContainer
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.link,
      activeOpacity: 1,
      onPress: hideAll,
      testID: testIdWithKey('HideAll'),
      accessible: true,
      accessibilityLabel: t('Record.HideAll'),
      accessibilityRole: "button"
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: ListItems.recordLink
    }, t('Record.HideAll')))) : null) : null,
    ListFooterComponent: footer ? /*#__PURE__*/React.createElement(RecordFooter, null, footer()) : null
  });
};
export default Record;
//# sourceMappingURL=Record.js.map