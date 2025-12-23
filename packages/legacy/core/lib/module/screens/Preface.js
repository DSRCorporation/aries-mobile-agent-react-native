import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import CheckBoxRow from '../components/inputs/CheckBoxRow';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
const Preface = () => {
  const [, dispatch] = useStore();
  const [checked, setChecked] = useState(false);
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  const {
    Assets,
    OnboardingTheme,
    TextTheme
  } = useTheme();
  const onSubmitPressed = () => {
    dispatch({
      type: DispatchAction.DID_SEE_PREFACE
    });
    navigation.navigate(Screens.Onboarding);
  };
  const style = StyleSheet.create({
    screenContainer: {
      ...OnboardingTheme.container,
      height: '100%',
      padding: 20,
      justifyContent: 'space-between'
    },
    // No properties needed, just helpful labels
    contentContainer: {},
    controlsContainer: {}
  });
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.contentContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.preface, {
    style: {
      alignSelf: 'center',
      marginBottom: 20
    },
    height: 200
  }), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.headingTwo
  }, t('Preface.PrimaryHeading')), /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, {
      marginTop: 20,
      marginBottom: 20
    }]
  }, t('Preface.Paragraph1'))), /*#__PURE__*/React.createElement(View, {
    style: style.controlsContainer
  }, /*#__PURE__*/React.createElement(CheckBoxRow, {
    title: t('Preface.Confirmed'),
    accessibilityLabel: t('Terms.IAgree'),
    testID: testIdWithKey('IAgree'),
    checked: checked,
    onPress: () => setChecked(!checked),
    reverse: true,
    titleStyle: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: testIdWithKey('Continue'),
    disabled: !checked,
    onPress: onSubmitPressed,
    buttonType: ButtonType.Primary
  }))))));
};
export default Preface;
//# sourceMappingURL=Preface.js.map