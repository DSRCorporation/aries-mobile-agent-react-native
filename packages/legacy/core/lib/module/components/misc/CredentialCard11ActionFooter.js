import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const CredentialActionFooter = ({
  onPress,
  text,
  testID
}) => {
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    seperator: {
      width: '100%',
      height: 2,
      marginVertical: 10,
      backgroundColor: ColorPallet.grayscale.lightGrey
    },
    touchable: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    credActionText: {
      fontSize: 20,
      fontWeight: TextTheme.bold.fontWeight,
      color: ColorPallet.brand.link
    }
  });
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.seperator
  }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    testID: testIdWithKey(testID),
    style: styles.touchable
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.credActionText
  }, text), /*#__PURE__*/React.createElement(Icon, {
    style: [styles.credActionText, {
      fontSize: styles.credActionText.fontSize + 5
    }],
    name: "chevron-right"
  }))));
};
export default CredentialActionFooter;
//# sourceMappingURL=CredentialCard11ActionFooter.js.map