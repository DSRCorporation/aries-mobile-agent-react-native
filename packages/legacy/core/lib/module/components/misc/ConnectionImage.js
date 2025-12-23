import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { toImageSource } from '../../utils/credential';
import { useConnectionImageUrl } from '../../utils/helpers';
const ConnectionImage = ({
  connectionId
}) => {
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    connectionImageContainer: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      width: 90,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 45,
      marginTop: 15,
      borderColor: ColorPallet.grayscale.lightGrey,
      borderWidth: 3,
      alignSelf: 'center'
    },
    connectionImage: {
      width: 55,
      height: 55
    }
  });
  const connectionImage = useConnectionImageUrl(connectionId ?? '');
  return connectionImage ? /*#__PURE__*/React.createElement(View, {
    style: styles.connectionImageContainer
  }, /*#__PURE__*/React.createElement(Image, {
    style: styles.connectionImage,
    source: toImageSource(connectionImage)
  })) : null;
};
export default ConnectionImage;
//# sourceMappingURL=ConnectionImage.js.map