import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useStore } from '../../contexts/store';
import { useTheme } from '../../contexts/theme';
import { useChatMessagesByConnection } from '../../hooks/chat-messages';
import { Screens, Stacks } from '../../types/navigators';
import { formatTime, getConnectionName } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import { TOKENS, useServices } from '../../container-api';
import { ThemedText } from '../texts/ThemedText';
const ContactListItem = ({
  contact,
  navigation
}) => {
  const {
    ColorPalette,
    ListItems
  } = useTheme();
  const messages = useChatMessagesByConnection(contact);
  const message = messages[0];
  const hasOnlyInitialMessage = messages.length < 2;
  const [store] = useStore();
  const [{
    enableChat
  }] = useServices([TOKENS.CONFIG]);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground
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
    timeContainer: {
      paddingVertical: 4,
      alignSelf: 'center'
    }
  });
  const navigateToContact = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ContactStack, {
      screen: enableChat ? Screens.Chat : Screens.ContactDetails,
      params: {
        connectionId: contact.id
      }
    });
  }, [navigation, contact, enableChat]);
  const contactLabel = useMemo(() => getConnectionName(contact, store.preferences.alternateContactNames), [contact, store.preferences.alternateContactNames]);
  const contactLabelAbbr = useMemo(() => contactLabel === null || contactLabel === void 0 ? void 0 : contactLabel.charAt(0).toUpperCase(), [contactLabel]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: navigateToContact,
    testID: testIdWithKey('Contact'),
    accessibilityLabel: contactLabel,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatarContainer
  }, contact.imageUrl ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Image, {
    style: styles.avatarImage,
    source: {
      uri: contact.imageUrl
    }
  })) : /*#__PURE__*/React.createElement(ThemedText, {
    allowFontScaling: false,
    variant: "headingFour",
    style: styles.avatarPlaceholder
  }, contactLabelAbbr)), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.nameAndTimeContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contactNameContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "labelTitle"
  }, contactLabel)), /*#__PURE__*/React.createElement(View, {
    style: styles.timeContainer
  }, message && /*#__PURE__*/React.createElement(ThemedText, null, formatTime(message.createdAt, {
    shortMonth: true,
    trim: true
  })))), /*#__PURE__*/React.createElement(View, null, message && !hasOnlyInitialMessage && /*#__PURE__*/React.createElement(ThemedText, {
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  }, message.text)))));
};
export default ContactListItem;
//# sourceMappingURL=ContactListItem.js.map