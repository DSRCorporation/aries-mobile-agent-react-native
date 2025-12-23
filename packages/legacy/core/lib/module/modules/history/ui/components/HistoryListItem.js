import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../contexts/theme';
import { HistoryCardType } from '../../types';
import HistoryCardAcceptedIcon from '../assets/img/HistoryCardAcceptedIcon.svg';
import HistoryCardExpiredIcon from '../assets/img/HistoryCardExpiredIcon.svg';
import HistoryCardRevokedIcon from '../assets/img/HistoryCardRevokedIcon.svg';
import HistoryInformationSentIcon from '../assets/img/HistoryInformationSentIcon.svg';
import HistoryPinUpdatedIcon from '../assets/img/HistoryPinUpdatedIcon.svg';
import IconChevronRight from '../assets/img/IconChevronRight.svg';
const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection: 'row'
  },
  cardContent: {
    flexDirection: 'column',
    marginHorizontal: 12,
    maxWidth: 200
  },
  cardDescriptionContent: {
    marginTop: 5,
    marginBottom: 10
  },
  cardDate: {
    color: '#666666'
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardBottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#A0A4AB'
  },
  historyCardRevoked: {
    color: '#D81A21'
  },
  successColor: {
    color: '#118847'
  },
  infoBox: {
    color: '#1080A6'
  }
});
const HistoryListItem = ({
  item
}) => {
  const {
    t
  } = useTranslation();
  const {
    TextTheme
  } = useTheme();
  //TODO: navigate to history details
  //   const navigation = useNavigation<StackNavigationProp<RootStackParams, 'HistoryDetails'>>()

  //TODO: render icon
  const renderCardIcon = item => {
    switch (item.content.type) {
      case HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/React.createElement(HistoryCardAcceptedIcon, null);
        }
      case HistoryCardType.CardDeclined:
        {
          //TODO: return different icon
          return /*#__PURE__*/React.createElement(HistoryCardRevokedIcon, null);
        }
      case HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/React.createElement(HistoryCardExpiredIcon, null);
        }
      case HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/React.createElement(HistoryCardRevokedIcon, null);
        }
      case HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/React.createElement(HistoryInformationSentIcon, null);
        }
      case HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/React.createElement(HistoryPinUpdatedIcon, null);
        }
      default:
        return null;
    }
  };
  const renderCardTitle = item => {
    switch (item.content.type) {
      case HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.headingThree
          }, t('History.CardTitle.CardAccepted'));
        }
      case HistoryCardType.CardDeclined:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: [TextTheme.headerTitle, {
              color: styles.historyCardRevoked.color
            }]
          }, t('History.CardTitle.CardDeclined'));
        }
      case HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.headerTitle
          }, t('History.CardTitle.CardExpired'));
        }
      case HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: [TextTheme.headerTitle, {
              color: styles.historyCardRevoked.color
            }]
          }, t('History.CardTitle.CardRevoked'));
        }
      case HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: [TextTheme.headerTitle, {
              color: styles.successColor.color
            }]
          }, t('History.CardTitle.InformationSent'));
        }
      case HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: [TextTheme.headerTitle, {
              color: styles.infoBox.color
            }]
          }, t('History.CardTitle.WalletPinUpdated'));
        }
      default:
        return null;
    }
  };
  const renderCardDescription = item => {
    switch (item.content.type) {
      case HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case HistoryCardType.CardDeclined:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, t('History.CardDescription.CardExpired', {
            cardName: item.content.correspondenceName
          }));
        }
      case HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, t('History.CardDescription.CardRevoked', {
            cardName: item.content.correspondenceName
          }));
        }
      case HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/React.createElement(Text, {
            style: TextTheme.normal
          }, t('History.CardDescription.WalletPinUpdated'));
        }
      default:
        return null;
    }
  };

  //TODO: move to helpers
  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  const renderCardDate = date => {
    if (!date) return null;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const isDateToday = isToday(date);
    return /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, styles.cardDate]
    }, isDateToday ? t('History.Today') : date.toLocaleDateString('en-US', options));
  };
  const renderCard = item => {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
      style: styles.card
    }, renderCardIcon(item), /*#__PURE__*/React.createElement(View, {
      style: styles.cardContent
    }, renderCardTitle(item), /*#__PURE__*/React.createElement(View, {
      style: styles.cardDescriptionContent
    }, renderCardDescription(item)), renderCardDate(item.content.createdAt)), /*#__PURE__*/React.createElement(View, {
      style: styles.arrowContainer
    }, /*#__PURE__*/React.createElement(IconChevronRight, null))), /*#__PURE__*/React.createElement(View, {
      style: styles.cardBottomBorder
    }));
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      //TODO: navigate to history details
    }
  }, renderCard(item));
};
export default HistoryListItem;
//# sourceMappingURL=HistoryListItem.js.map