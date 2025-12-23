"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../../../contexts/theme");
var _types = require("../../types");
var _HistoryCardAcceptedIcon = _interopRequireDefault(require("../assets/img/HistoryCardAcceptedIcon.svg"));
var _HistoryCardExpiredIcon = _interopRequireDefault(require("../assets/img/HistoryCardExpiredIcon.svg"));
var _HistoryCardRevokedIcon = _interopRequireDefault(require("../assets/img/HistoryCardRevokedIcon.svg"));
var _HistoryInformationSentIcon = _interopRequireDefault(require("../assets/img/HistoryInformationSentIcon.svg"));
var _HistoryPinUpdatedIcon = _interopRequireDefault(require("../assets/img/HistoryPinUpdatedIcon.svg"));
var _IconChevronRight = _interopRequireDefault(require("../assets/img/IconChevronRight.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    TextTheme
  } = (0, _theme.useTheme)();
  //TODO: navigate to history details
  //   const navigation = useNavigation<StackNavigationProp<RootStackParams, 'HistoryDetails'>>()

  //TODO: render icon
  const renderCardIcon = item => {
    switch (item.content.type) {
      case _types.HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/_react.default.createElement(_HistoryCardAcceptedIcon.default, null);
        }
      case _types.HistoryCardType.CardDeclined:
        {
          //TODO: return different icon
          return /*#__PURE__*/_react.default.createElement(_HistoryCardRevokedIcon.default, null);
        }
      case _types.HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/_react.default.createElement(_HistoryCardExpiredIcon.default, null);
        }
      case _types.HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/_react.default.createElement(_HistoryCardRevokedIcon.default, null);
        }
      case _types.HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/_react.default.createElement(_HistoryInformationSentIcon.default, null);
        }
      case _types.HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/_react.default.createElement(_HistoryPinUpdatedIcon.default, null);
        }
      default:
        return null;
    }
  };
  const renderCardTitle = item => {
    switch (item.content.type) {
      case _types.HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.headingThree
          }, t('History.CardTitle.CardAccepted'));
        }
      case _types.HistoryCardType.CardDeclined:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: [TextTheme.headerTitle, {
              color: styles.historyCardRevoked.color
            }]
          }, t('History.CardTitle.CardDeclined'));
        }
      case _types.HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.headerTitle
          }, t('History.CardTitle.CardExpired'));
        }
      case _types.HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: [TextTheme.headerTitle, {
              color: styles.historyCardRevoked.color
            }]
          }, t('History.CardTitle.CardRevoked'));
        }
      case _types.HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: [TextTheme.headerTitle, {
              color: styles.successColor.color
            }]
          }, t('History.CardTitle.InformationSent'));
        }
      case _types.HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
      case _types.HistoryCardType.CardAccepted:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case _types.HistoryCardType.CardDeclined:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case _types.HistoryCardType.CardExpired:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.normal
          }, t('History.CardDescription.CardExpired', {
            cardName: item.content.correspondenceName
          }));
        }
      case _types.HistoryCardType.CardRevoked:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.normal
          }, t('History.CardDescription.CardRevoked', {
            cardName: item.content.correspondenceName
          }));
        }
      case _types.HistoryCardType.InformationSent:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: TextTheme.normal
          }, item.content.correspondenceName);
        }
      case _types.HistoryCardType.PinChanged:
        {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, styles.cardDate]
    }, isDateToday ? t('History.Today') : date.toLocaleDateString('en-US', options));
  };
  const renderCard = item => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.card
    }, renderCardIcon(item), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContent
    }, renderCardTitle(item), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardDescriptionContent
    }, renderCardDescription(item)), renderCardDate(item.content.createdAt)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.arrowContainer
    }, /*#__PURE__*/_react.default.createElement(_IconChevronRight.default, null))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardBottomBorder
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      //TODO: navigate to history details
    }
  }, renderCard(item));
};
var _default = exports.default = HistoryListItem;
//# sourceMappingURL=HistoryListItem.js.map