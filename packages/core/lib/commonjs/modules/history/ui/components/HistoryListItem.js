"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../../../contexts/theme");
var _testable = require("../../../../utils/testable");
var _types = require("../../types");
var _ThemedText = require("../../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const cardTitleKeys = {
  [_types.HistoryCardType.CardAccepted]: 'History.CardTitle.CardAccepted',
  [_types.HistoryCardType.CardDeclined]: 'History.CardTitle.CardDeclined',
  [_types.HistoryCardType.CardExpired]: 'History.CardTitle.CardExpired',
  [_types.HistoryCardType.CardRemoved]: 'History.CardTitle.CardRemoved',
  [_types.HistoryCardType.CardRevoked]: 'History.CardTitle.CardRevoked',
  [_types.HistoryCardType.CardUpdates]: 'History.CardTitle.CardUpdates',
  [_types.HistoryCardType.PinChanged]: 'History.CardTitle.WalletPinUpdated',
  [_types.HistoryCardType.InformationSent]: 'History.CardTitle.InformationSent',
  [_types.HistoryCardType.InformationNotSent]: 'History.CardTitle.InformationNotSent',
  [_types.HistoryCardType.Connection]: 'History.CardTitle.Connection',
  [_types.HistoryCardType.ConnectionRemoved]: 'History.CardTitle.ConnectionRemoved',
  [_types.HistoryCardType.ActivateBiometry]: 'History.CardTitle.ActivateBiometry',
  [_types.HistoryCardType.DeactivateBiometry]: 'History.CardTitle.DeactivateBiometry'
};
const styles = _reactNative.StyleSheet.create({
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
  } = (0, _reactI18next.useTranslation)();
  const {
    Assets,
    ColorPalette
  } = (0, _theme.useTheme)();
  //TODO: navigate to history details
  //   const navigation = useNavigation<StackNavigationProp<RootStackParams, 'HistoryDetails'>>()

  const renderCardSections = item => {
    switch (item.content.type) {
      case _types.HistoryCardType.CardAccepted:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardAcceptedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree"
            }, t(cardTitleKeys[_types.HistoryCardType.CardAccepted])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.CardDeclined:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardDeclinedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.CardDeclined])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.CardExpired:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardExpiredIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle"
            }, t(cardTitleKeys[_types.HistoryCardType.CardExpired])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('History.CardDescription.CardExpired', {
              cardName: item.content.correspondenceName
            }))
          };
        }
      case _types.HistoryCardType.CardRemoved:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardRemovedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.CardRemoved])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.CardRevoked:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardRevokedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.CardRevoked])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('History.CardDescription.CardRevoked', {
              cardName: item.content.correspondenceName
            }))
          };
        }
      case _types.HistoryCardType.CardUpdates:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyCardUpdatesIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree"
            }, t(cardTitleKeys[_types.HistoryCardType.CardUpdates])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.PinChanged:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyPinUpdatedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.infoBox.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.PinChanged])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('History.CardDescription.WalletPinUpdated'))
          };
        }
      case _types.HistoryCardType.InformationSent:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyInformationSentIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.successColor.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.InformationSent])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.InformationNotSent:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyInformationNotSentIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headerTitle",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.InformationNotSent])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.Connection:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyConnectionIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree"
            }, t(cardTitleKeys[_types.HistoryCardType.Connection])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.ConnectionRemoved:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyConnectionRemovedIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.ConnectionRemoved])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.ActivateBiometry:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyActivateBiometryIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree"
            }, t(cardTitleKeys[_types.HistoryCardType.ActivateBiometry])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
          };
        }
      case _types.HistoryCardType.DeactivateBiometry:
        {
          return {
            icon: /*#__PURE__*/_react.default.createElement(Assets.svg.historyDeactivateBiometryIcon, null),
            title: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
              variant: "headingThree",
              style: {
                color: styles.historyCardRevoked.color
              }
            }, t(cardTitleKeys[_types.HistoryCardType.DeactivateBiometry])),
            description: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, item.content.correspondenceName)
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
    return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.cardDate
    }, isDateToday ? t('History.Today') : date.toLocaleDateString('en-US', options));
  };
  const renderCard = item => {
    const {
      icon,
      title,
      description
    } = renderCardSections(item);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.card
    }, icon, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContent
    }, title, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardDescriptionContent
    }, description), renderCardDate(item.content.createdAt)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.arrowContainer
    }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconChevronRight, {
      color: ColorPalette.brand.primary
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardBottomBorder
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      //TODO: navigate to history details
    },
    accessibilityLabel: `${item.content.type && item.content.type in cardTitleKeys ? t(cardTitleKeys[item.content.type]) : ''} ${'correspondenceName' in item.content ? item.content.correspondenceName ?? '' : ''}`.trim(),
    accessibilityRole: "button",
    testID: (0, _testable.testIdWithKey)('HistoryItem')
  }, renderCard(item));
};
var _default = exports.default = HistoryListItem;
//# sourceMappingURL=HistoryListItem.js.map