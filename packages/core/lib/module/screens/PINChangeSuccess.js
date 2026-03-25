/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import InfoBox, { InfoBoxType } from '../components/misc/InfoBox';
import { ButtonType } from '../components/buttons/Button-api';
import usePreventScreenCapture from '../hooks/screen-capture';
import { useTheme } from '../contexts/theme';
import { TOKENS, useServices } from '../container-api';
import { testIdWithKey } from '../utils/testable';
import { Screens } from '../types/navigators';
import ScreenWrapper from '../components/views/ScreenWrapper';
const ChangePINSuccessScreen = ({
  navigation
}) => {
  const {
    ColorPalette,
    Spacing
  } = useTheme();
  const {
    t
  } = useTranslation();
  const [{
    preventScreenCapture
  }, Button] = useServices([TOKENS.CONFIG, TOKENS.COMPONENT_BUTTON]);
  usePreventScreenCapture(preventScreenCapture);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  const onPressContinue = useCallback(() => {
    navigation === null || navigation === void 0 || navigation.navigate(Screens.Settings);
  }, [navigation]);
  return /*#__PURE__*/React.createElement(ScreenWrapper, {
    keyboardActive: true,
    padded: false
  }, /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 10,
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(InfoBox, {
    notificationType: InfoBoxType.Success,
    title: t('PINChangeSuccess.InfoBox.Title'),
    message: t('PINChangeSuccess.InfoBox.Description'),
    renderShowDetails: true
  })), /*#__PURE__*/React.createElement(Button, {
    title: t('PINChangeSuccess.PrimaryButton'),
    testID: testIdWithKey('GoToSettings'),
    accessibilityLabel: t('PINChangeSuccess.PrimaryButton'),
    buttonType: ButtonType.Primary,
    onPress: onPressContinue
  })));
};
export default ChangePINSuccessScreen;
//# sourceMappingURL=PINChangeSuccess.js.map