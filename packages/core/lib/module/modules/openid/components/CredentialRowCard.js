import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../../contexts/theme';
export function OpenIDCredentialRowCard({
  name,
  issuer,
  bgColor,
  bgImage,
  txtColor,
  onPress
}) {
  const {
    TextTheme
  } = useTheme();
  const {
    width
  } = useWindowDimensions();
  const badgeWidth = 0.25 * width;
  const badgeHeight = 0.6 * badgeWidth;
  const style = StyleSheet.create({
    container: {},
    rowContainer: {
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: '#202020',
      padding: 5,
      minHeight: 0.2 * width
    },
    issuerBadge: {
      borderRadius: 8,
      width: badgeHeight,
      height: badgeHeight,
      backgroundColor: 'red',
      marginRight: 10,
      overflow: 'hidden'
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'space-between'
    },
    imageStyle: {
      width: badgeWidth,
      height: badgeHeight,
      borderRadius: 8
    }
  });
  //
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: style.rowContainer,
    accessibilityLabel: name,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(View, {
    style: [style.issuerBadge, bgColor ? {
      backgroundColor: bgColor
    } : {}]
  }, bgImage ? /*#__PURE__*/React.createElement(Image, {
    style: style.imageStyle,
    source: {
      uri: bgImage
    },
    resizeMode: "cover"
  }) : null), /*#__PURE__*/React.createElement(View, {
    style: [style.infoContainer, issuer ? {
      justifyContent: 'center'
    } : {}]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.title, txtColor ? {
      color: txtColor
    } : {}]
  }, name), issuer && /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.labelSubtitle, txtColor ? {
      color: txtColor
    } : {}]
  }, issuer))));
}
//# sourceMappingURL=CredentialRowCard.js.map