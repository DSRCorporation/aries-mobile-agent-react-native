import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { Screens, Stacks } from '../../types/navigators';
import PopupModal from '../modals/PopupModal';
import Link from '../texts/Link';
import { InfoBoxType } from './InfoBox';
import UnorderedList from './UnorderedList';
const ConnectionAlert = ({
  connectionID
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [infoCardVisible, setInfoCardVisible] = useState(false);
  const settingsNavigation = useNavigation();
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20
    },
    notifyTextContainer: {
      borderLeftColor: ColorPallet.brand.highlight,
      backgroundColor: ColorPallet.brand.secondaryBackground,
      borderLeftWidth: 10,
      flex: 1,
      paddingLeft: 10,
      paddingVertical: 15,
      marginVertical: 15
    },
    row: {
      flexDirection: 'row'
    },
    notifyTitle: {
      ...TextTheme.title,
      marginBottom: 5
    },
    notifyText: {
      ...TextTheme.normal,
      marginVertical: 5
    },
    modalText: {
      ...TextTheme.popupModalText
    },
    notifyTextList: {
      marginVertical: 6
    },
    informationIcon: {
      color: ColorPallet.notification.infoIcon,
      marginLeft: 10
    }
  });
  const toggleInfoCard = () => setInfoCardVisible(!infoCardVisible);
  const navigateToSettings = () => {
    toggleInfoCard();
    settingsNavigation.navigate(Stacks.SettingStack, {
      screen: Screens.Settings
    });
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.notifyTextContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.notifyTitle
  }, t('ConnectionAlert.AddedContacts')), /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: t('Global.Info'),
    accessibilityLabel: t('ConnectionAlert.WhatAreContacts'),
    accessibilityRole: 'button',
    onPress: toggleInfoCard,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'information-outline',
    size: 30,
    style: styles.informationIcon
  }))), infoCardVisible && /*#__PURE__*/React.createElement(PopupModal, {
    notificationType: InfoBoxType.Info,
    title: t('ConnectionAlert.WhatAreContacts'),
    bodyContent: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: styles.modalText
    }, t('ConnectionAlert.PopupIntro')), /*#__PURE__*/React.createElement(UnorderedList, {
      unorderedListItems: [t('ConnectionAlert.PopupPoint1'), t('ConnectionAlert.PopupPoint2'), t('ConnectionAlert.PopupPoint3')]
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.modalText
    }, t('ConnectionAlert.SettingsInstruction')), /*#__PURE__*/React.createElement(Link, {
      style: {
        marginBottom: 8
      },
      onPress: navigateToSettings,
      linkText: t('ConnectionAlert.SettingsLink')
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.modalText
    }, t('ConnectionAlert.PrivacyMessage'))),
    onCallToActionLabel: t('ConnectionAlert.PopupExit'),
    onCallToActionPressed: toggleInfoCard
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.notifyText
  }, t('ConnectionAlert.NotificationBodyUpper') + (connectionID || t('ContactDetails.AContact').toLowerCase()) + t('ConnectionAlert.NotificationBodyLower')));
};
export default ConnectionAlert;
//# sourceMappingURL=ConnectionAlert.js.map