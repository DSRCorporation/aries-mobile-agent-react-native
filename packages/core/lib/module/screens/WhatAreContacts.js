import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Link from '../components/texts/Link';
import { ThemedText } from '../components/texts/ThemedText';
import { useTheme } from '../contexts/theme';
import { Screens, Stacks } from '../types/navigators';
const WhatAreContacts = ({
  navigation
}) => {
  const {
    ColorPalette
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    pageContent: {
      marginTop: 30,
      paddingLeft: 25,
      paddingRight: 25
    }
  });
  const goToContactList = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ContactStack, {
      screen: Screens.Contacts
    });
  };
  const bulletPoints = [t('WhatAreContacts.ListItemDirectMessage'), t('WhatAreContacts.ListItemNewCredentials'), t('WhatAreContacts.ListItemNotifiedOfUpdates'), t('WhatAreContacts.ListItemRequest')].map((text, index) => {
    return /*#__PURE__*/React.createElement(View, {
      key: index,
      style: {
        marginBottom: 10,
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        paddingRight: 5
      }
    }, '\u2022'), /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        flexShrink: 1
      }
    }, text));
  });
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.pageContent,
    directionalLockEnabled: true,
    automaticallyAdjustContentInsets: false,
    showsHorizontalScrollIndicator: false
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingTwo",
    style: {
      marginBottom: 15
    },
    accessibilityRole: "header"
  }, t('WhatAreContacts.Title')), /*#__PURE__*/React.createElement(ThemedText, null, t('WhatAreContacts.Preamble')), bulletPoints, /*#__PURE__*/React.createElement(ThemedText, null, `${t('WhatAreContacts.RemoveContacts')} `, /*#__PURE__*/React.createElement(Link, {
    linkText: t('WhatAreContacts.ContactsLink'),
    onPress: goToContactList
  }))));
};
export default WhatAreContacts;
//# sourceMappingURL=WhatAreContacts.js.map