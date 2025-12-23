import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useStore } from '../../contexts/store';
import { useTheme } from '../../contexts/theme';
import { useChatMessagesByConnection } from '../../hooks/chat-messages';
import { Screens, Stacks } from '../../types/navigators';
import { formatTime, getConnectionName } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
const ContactListItem = ({
  contact,
  navigation
}) => {
  const {
    t
  } = useTranslation();
  const {
    TextTheme,
    ColorPallet,
    ListItems
  } = useTheme();
  const messages = useChatMessagesByConnection(contact);
  const message = messages[0];
  const hasOnlyInitialMessage = messages.length < 2;
  const [store] = useStore();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    avatarContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: ListItems.avatarCircle.borderColor,
      borderWidth: 1,
      marginRight: 16
    },
    avatarPlaceholder: {
      ...TextTheme.headingFour,
      textAlign: 'center'
    },
    avatarImage: {
      width: 30,
      height: 30
    },
    contactNameContainer: {
      flex: 1,
      paddingVertical: 4
    },
    nameAndTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1
    },
    contactNameText: {
      ...TextTheme.labelTitle
    },
    timeContainer: {
      paddingVertical: 4,
      alignSelf: 'center'
    },
    timeText: {
      color: TextTheme.normal.color
    }
  });
  const navigateToContact = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ContactStack, {
      screen: Screens.Chat,
      params: {
        connectionId: contact.id
      }
    });
  }, [contact]);
  const contactLabel = useMemo(() => getConnectionName(contact, store.preferences.alternateContactNames), [contact, store.preferences.alternateContactNames]);
  const contactLabelAbbr = useMemo(() => contactLabel === null || contactLabel === void 0 ? void 0 : contactLabel.charAt(0).toUpperCase(), [contact, store.preferences.alternateContactNames]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: navigateToContact,
    testID: testIdWithKey('Contact'),
    accessibilityLabel: t('ContactDetails.AContact')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatarContainer
  }, contact.imageUrl ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Image, {
    style: styles.avatarImage,
    source: {
      uri: contact.imageUrl
    }
  })) : /*#__PURE__*/React.createElement(Text, {
    style: styles.avatarPlaceholder
  }, contactLabelAbbr)), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.nameAndTimeContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contactNameContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.contactNameText
  }, contactLabel)), /*#__PURE__*/React.createElement(View, {
    style: styles.timeContainer
  }, message && /*#__PURE__*/React.createElement(Text, {
    style: styles.timeText
  }, formatTime(message.createdAt, {
    shortMonth: true,
    trim: true
  })))), /*#__PURE__*/React.createElement(View, null, message && !hasOnlyInitialMessage && /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal,
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  }, message.text)))));
};
export default ContactListItem;
//# sourceMappingURL=ContactListItem.js.map