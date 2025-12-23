import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const KeyboardView = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: {
      flex: 1
    }
    // below property is the distance to account for between the top of the screen and the top of the view. It is at most 100 with max zoom + font settings
    ,
    keyboardVerticalOffset: 100,
    behavior: Platform.OS === 'ios' ? 'padding' : 'height'
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    keyboardShouldPersistTaps: 'handled'
  }, children)));
};
export default KeyboardView;
//# sourceMappingURL=KeyboardView.js.map