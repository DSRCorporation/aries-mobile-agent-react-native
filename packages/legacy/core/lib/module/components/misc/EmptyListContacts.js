import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { Screens, Stacks } from '../../types/navigators';
import Link from '../texts/Link';
const EmptyListContacts = ({
  navigation
}) => {
  const {
    t
  } = useTranslation();
  const {
    ListItems,
    Assets,
    ColorPallet,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      paddingTop: 100,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    text: {
      textAlign: 'center',
      marginTop: 10
    },
    link: {
      textAlign: 'center',
      marginTop: 10,
      alignSelf: 'center'
    }
  });
  const navigateToWhatAreContacts = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ContactStack, {
      screen: Screens.WhatAreContacts
    });
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Assets.svg.contactBook, {
    fill: ListItems.emptyList.color,
    height: 120
  }), /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.headingThree, styles.text, {
      marginTop: 30
    }]
  }, t('Contacts.EmptyList')), /*#__PURE__*/React.createElement(Text, {
    style: [ListItems.emptyList, styles.text]
  }, t('Contacts.PeopleAndOrganizations')), /*#__PURE__*/React.createElement(Link, {
    style: styles.link,
    linkText: t('Contacts.WhatAreContacts'),
    onPress: navigateToWhatAreContacts
  }));
};
export default EmptyListContacts;
//# sourceMappingURL=EmptyListContacts.js.map