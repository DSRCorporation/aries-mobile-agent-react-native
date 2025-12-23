import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const ActionSlider = ({
  actions,
  onDismiss
}) => {
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    centeredView: {
      marginTop: 'auto',
      justifyContent: 'flex-end'
    },
    outsideListener: {
      height: '100%'
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.white,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    drawerTitleText: {
      ...TextTheme.bold,
      textAlign: 'center',
      marginVertical: 10
    },
    drawerContentText: {
      ...TextTheme.normal
    },
    drawerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 12
    },
    drawerRowItem: {
      color: ColorPallet.grayscale.black
    }
  });
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: "slide",
    transparent: true,
    onRequestClose: onDismiss
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.outsideListener,
    onPress: onDismiss
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.centeredView
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalView
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: testIdWithKey('Close'),
    accessibilityLabel: t('Global.Close'),
    accessibilityRole: 'button',
    onPress: onDismiss,
    hitSlop: hitSlop,
    style: {
      alignSelf: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "window-close",
    size: 35,
    style: styles.drawerRowItem
  })), actions && actions.map(action => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: action.text,
      testID: testIdWithKey(action.text),
      accessibilityLabel: testIdWithKey(action.text),
      style: styles.drawerRow,
      onPress: action.onPress
    }, /*#__PURE__*/React.createElement(action.icon, null), /*#__PURE__*/React.createElement(Text, {
      style: {
        ...styles.drawerRowItem,
        marginLeft: 5
      }
    }, action.text));
  }))));
};
export default ActionSlider;
//# sourceMappingURL=ActionSlider.js.map