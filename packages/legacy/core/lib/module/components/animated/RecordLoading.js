import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const RecordLoading = () => {
  const {
    ColorPallet
  } = useTheme();
  const rowFadeAnim = useRef(new Animated.Value(1)).current;
  const fadeTiming = {
    toValue: 0.2,
    duration: 1100,
    useNativeDriver: true
  };
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    rectangle: {
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
      height: 30,
      marginVertical: 10
    },
    line: {
      backgroundColor: ColorPallet.grayscale.lightGrey,
      height: 1,
      marginVertical: 5
    }
  });
  useEffect(() => {
    Animated.loop(Animated.timing(rowFadeAnim, fadeTiming)).start();
  }, []);
  const makeARow = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: [style.rectangle, {
        width: '35%'
      }]
    }), /*#__PURE__*/React.createElement(View, {
      style: [style.rectangle, {
        width: '85%'
      }]
    }), /*#__PURE__*/React.createElement(View, {
      style: style.line
    }));
  };
  return /*#__PURE__*/React.createElement(View, {
    style: style.container,
    testID: testIdWithKey('RecordLoading')
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      opacity: rowFadeAnim
    }
  }, makeARow(), makeARow()));
};
export default RecordLoading;
//# sourceMappingURL=RecordLoading.js.map