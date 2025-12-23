import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import CredentialList from '../assets/img/credential-list.svg';
import ScanShare from '../assets/img/scan-share.svg';
import SecureImage from '../assets/img/secure-image.svg';
import Button, { ButtonType } from '../components/buttons/Button';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
export const createCarouselStyle = OnboardingTheme => {
  return StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center'
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column'
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive
    },
    pagerPosition: {
      position: 'relative',
      top: 0
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton
    }
  });
};
export const createStyles = OnboardingTheme => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10
    },
    icon: {
      marginRight: 10
    }
  });
};
const createImageDisplayOptions = OnboardingTheme => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180
  };
};
const CustomPages = (onTutorialCompleted, OnboardingTheme) => {
  const {
    t
  } = useTranslation();
  const styles = createStyles(OnboardingTheme);
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollView, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SecureImage, imageDisplayOptions)), /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText,
    testID: testIdWithKey('HeaderText')
  }, "Ornare suspendisse sed nisi lacus"), /*#__PURE__*/React.createElement(Text, {
    style: [styles.bodyText, {
      marginTop: 25
    }],
    testID: testIdWithKey('BodyText')
  }, "Enim facilisis gravida neque convallis a cras semper. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed."))), /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 'auto',
      margin: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.GetStarted'),
    accessibilityLabel: t('Global.GetStarted'),
    testID: testIdWithKey('GetStarted'),
    onPress: onTutorialCompleted,
    buttonType: ButtonType.Primary
  })));
};
const guides = [{
  image: CredentialList,
  title: 'Lorem ipsum dolor sit amet',
  body: 'Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.',
  devModeListener: true
}, {
  image: ScanShare,
  title: 'Excepteur sint occaecat ',
  body: 'Mollis aliquam ut porttitor leo a diam sollicitudin tempor.'
}];
export const createPageWith = (PageImage, title, body, OnboardingTheme, devModeListener, onDevModeTouched) => {
  const styles = createStyles(OnboardingTheme);
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme);
  const titleElement = /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText,
    testID: testIdWithKey('HeaderText')
  }, title);
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PageImage, {
    style: imageDisplayOptions
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 20
    }
  }, devModeListener ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    testID: testIdWithKey('DeveloperModeTouch'),
    onPress: onDevModeTouched
  }, titleElement) : titleElement, /*#__PURE__*/React.createElement(Text, {
    style: [styles.bodyText, {
      marginTop: 25
    }],
    testID: testIdWithKey('BodyText')
  }, body)));
};
const OnboardingPages = (onTutorialCompleted, OnboardingTheme) => {
  const navigation = useNavigation();
  const [, dispatch] = useStore();
  const onDevModeEnabled = () => {
    var _navigation$getParent;
    dispatch({
      type: DispatchAction.ENABLE_DEVELOPER_MODE,
      payload: [true]
    });
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Screens.Developer);
  };
  const developerOptionCount = useRef(0);
  const touchCountToEnableBiometrics = 9;
  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0;
      if (onDevModeEnabled) {
        onDevModeEnabled();
      }
      return;
    }
    developerOptionCount.current = developerOptionCount.current + 1;
  };
  return [...guides.map(g => createPageWith(g.image, g.title, g.body, OnboardingTheme, g.devModeListener, g.devModeListener ? incrementDeveloperMenuCounter : undefined)), CustomPages(onTutorialCompleted, OnboardingTheme)];
};
export default OnboardingPages;
//# sourceMappingURL=OnboardingPages.js.map