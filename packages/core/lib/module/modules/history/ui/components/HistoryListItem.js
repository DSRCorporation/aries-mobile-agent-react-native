import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../contexts/theme';
import { HistoryCardType } from '../../types';
import { ThemedText } from '../../../../components/texts/ThemedText';
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
    Assets,
    ColorPalette
  } = useTheme();
  //TODO: navigate to history details
  //   const navigation = useNavigation<StackNavigationProp<RootStackParams, 'HistoryDetails'>>()

  const renderCardSections = item => {
    switch (item.content.type) {
      case HistoryCardType.CardAccepted:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardAcceptedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree"
            }, t('History.CardTitle.CardAccepted')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.CardDeclined:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardDeclinedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.CardDeclined')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.CardExpired:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardExpiredIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle"
            }, t('History.CardTitle.CardExpired')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, t('History.CardDescription.CardExpired', {
              cardName: item.content.correspondenceName
            }))
          };
        }
      case HistoryCardType.CardRemoved:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardRemovedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.CardRemoved')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.CardRevoked:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardRevokedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.CardRevoked')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, t('History.CardDescription.CardRevoked', {
              cardName: item.content.correspondenceName
            }))
          };
        }
      case HistoryCardType.CardUpdates:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyCardUpdatesIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree"
            }, t('History.CardTitle.CardUpdates')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.PinChanged:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyPinUpdatedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.infoBox.color
              }
            }, t('History.CardTitle.WalletPinUpdated')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, t('History.CardDescription.WalletPinUpdated'))
          };
        }
      case HistoryCardType.InformationSent:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyInformationSentIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.successColor.color
              }
            }, t('History.CardTitle.InformationSent')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.InformationNotSent:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyInformationNotSentIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.InformationNotSent')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.Connection:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyConnectionIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree"
            }, t('History.CardTitle.Connection')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.ConnectionRemoved:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyConnectionRemovedIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.ConnectionRemoved')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.ActivateBiometry:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyActivateBiometryIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree"
            }, t('History.CardTitle.ActivateBiometry')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      case HistoryCardType.DeactivateBiometry:
        {
          return {
            icon: /*#__PURE__*/React.createElement(Assets.svg.historyDeactivateBiometryIcon, null),
            title: /*#__PURE__*/React.createElement(ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t('History.CardTitle.DeactivateBiometry')),
            description: /*#__PURE__*/React.createElement(ThemedText, null, item.content.correspondenceName)
          };
        }
      default:
        return {
          icon: null,
          title: null,
          description: null
        };
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
    return /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.cardDate
    }, isDateToday ? t('History.Today') : date.toLocaleDateString('en-US', options));
  };
  const renderCard = item => {
    const {
      icon,
      title,
      description
    } = renderCardSections(item);
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
      style: styles.card
    }, icon, /*#__PURE__*/React.createElement(View, {
      style: styles.cardContent
    }, title, /*#__PURE__*/React.createElement(View, {
      style: styles.cardDescriptionContent
    }, description), renderCardDate(item.content.createdAt)), /*#__PURE__*/React.createElement(View, {
      style: styles.arrowContainer
    }, /*#__PURE__*/React.createElement(Assets.svg.iconChevronRight, {
      color: ColorPalette.brand.primary
    }))), /*#__PURE__*/React.createElement(View, {
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