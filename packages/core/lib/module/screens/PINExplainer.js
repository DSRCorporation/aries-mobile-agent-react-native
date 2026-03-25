import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import BulletPoint from '../components/inputs/BulletPoint';
import { useTheme } from '../contexts/theme';
import { testIdWithKey } from '../utils/testable';
import { ThemedText } from '../components/texts/ThemedText';
const PINExplainer = ({
  continueCreatePIN
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme,
    Assets
  } = useTheme();
  const style = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    scrollViewContentContainer: {
      padding: 20,
      flexGrow: 1
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 30
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 10
    }
  });
  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 150,
    width: 150
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.safeAreaView,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: style.scrollViewContentContainer
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingTwo"
  }, t('PINCreate.Explainer.PrimaryHeading')), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      marginTop: 30,
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(Trans, {
    i18nKey: "PINCreate.Explainer.PINReminder",
    components: {
      b: /*#__PURE__*/React.createElement(ThemedText, {
        variant: "bold"
      })
    },
    t: t
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.imageContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.secureCheck, imageDisplayOptions)), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingFour"
  }, t('PINCreate.Explainer.WhyNeedPin.Header')), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      marginTop: 20,
      marginBottom: 20
    }
  }, t('PINCreate.Explainer.WhyNeedPin.Paragraph')), /*#__PURE__*/React.createElement(BulletPoint, {
    text: t('PINCreate.Explainer.WhyNeedPin.ParagraphList1'),
    textStyle: TextTheme.normal
  }), /*#__PURE__*/React.createElement(BulletPoint, {
    text: t('PINCreate.Explainer.WhyNeedPin.ParagraphList2'),
    textStyle: TextTheme.normal
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.footer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: testIdWithKey('ContinueCreatePIN'),
    onPress: continueCreatePIN,
    buttonType: ButtonType.Primary
  })));
};
export default PINExplainer;
//# sourceMappingURL=PINExplainer.js.map