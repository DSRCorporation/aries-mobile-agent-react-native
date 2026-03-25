import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const fadeTiming = {
  toValue: 0.4,
  duration: 1100,
  useNativeDriver: true
};
const borderRadius = 10;
const RecordLoading = ({
  style
}) => {
  const {
    width
  } = useWindowDimensions();
  const padding = width * 0.05;
  const logoHeight = width * 0.12;
  const {
    ColorPalette
  } = useTheme();
  const rowFadeAnim = useRef(new Animated.Value(1));
  const myStyle = StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    rectangle: {
      backgroundColor: ColorPalette.grayscale.lightGrey,
      height: 30,
      marginVertical: 5,
      borderRadius
    },
    margin: {
      backgroundColor: ColorPalette.grayscale.lightGrey,
      width: 40,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    },
    logo: {
      marginLeft: -1 * logoHeight + padding,
      marginTop: padding,
      backgroundColor: ColorPalette.grayscale.lightGrey,
      height: logoHeight,
      width: logoHeight,
      borderRadius
    }
  });
  useEffect(() => {
    Animated.loop(Animated.timing(rowFadeAnim.current, fadeTiming)).start();
  }, []);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      opacity: rowFadeAnim.current,
      backgroundColor: ColorPalette.grayscale.white,
      borderRadius: 15
    }, style]
  }, /*#__PURE__*/React.createElement(View, {
    style: myStyle.container,
    testID: testIdWithKey('RecordLoading')
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: myStyle.margin
  }), /*#__PURE__*/React.createElement(View, {
    style: myStyle.logo
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1,
      marginLeft: 15,
      marginTop: 15,
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [myStyle.rectangle, {
      width: '100%',
      height: 20
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [myStyle.rectangle, {
      width: '75%',
      height: 25
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [myStyle.rectangle, {
      width: '35%',
      height: 20,
      marginTop: 20
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [myStyle.rectangle, {
      width: '90%',
      height: 25
    }]
  })))));
};
export default RecordLoading;
//# sourceMappingURL=RecordLoading.js.map