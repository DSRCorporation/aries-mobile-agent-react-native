"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _NotificationListItem = require("../components/listItems/NotificationListItem");
var _AppGuideModal = _interopRequireDefault(require("../components/modals/AppGuideModal"));
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _tourContext = require("../contexts/tour/tour-context");
var _tour = require("../types/tour");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Home = () => {
  const [HomeHeaderView, NoNewUpdates, HomeFooterView, {
    enableTours: enableToursConfig
  }, {
    customNotificationConfig: customNotification,
    useNotifications
  }, NotificationListItem] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_HOME_HEADER, _containerApi.TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, _containerApi.TOKENS.COMPONENT_HOME_FOOTER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.NOTIFICATIONS_LIST_ITEM]);
  const notifications = useNotifications();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    start
  } = (0, _tourContext.useTour)();
  const [showTourPopup, setShowTourPopup] = (0, _react.useState)(false);
  const screenIsFocused = (0, _native.useIsFocused)();
  const styles = _reactNative.StyleSheet.create({
    flatlist: {
      marginBottom: 35
    },
    noNewUpdatesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      // TODO: Double check if 'primaryBackground' here works fine for Bifold in general, not only for DSR branding
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  });
  const DisplayListItemType = item => {
    let component;
    if (item.type === 'BasicMessageRecord') {
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: _NotificationListItem.NotificationType.BasicMessage,
        notification: item
      });
    } else if (item.type === 'CredentialRecord') {
      let notificationType = _NotificationListItem.NotificationType.CredentialOffer;
      if (item.revocationNotification) {
        notificationType = _NotificationListItem.NotificationType.Revocation;
      }
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: notificationType,
        notification: item
      });
    } else if (item.type === 'CustomNotification' && customNotification) {
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: _NotificationListItem.NotificationType.Custom,
        notification: item,
        customNotification: customNotification
      });
    } else {
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: _NotificationListItem.NotificationType.ProofRequest,
        notification: item
      });
    }
    return component;
  };
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenHomeTour;
    if (shouldShowTour && screenIsFocused) {
      if (store.tours.seenToursPrompt) {
        dispatch({
          type: _store.DispatchAction.UPDATE_SEEN_HOME_TOUR,
          payload: [true]
        });
        start(_tour.TourID.HomeTour);
      } else {
        dispatch({
          type: _store.DispatchAction.UPDATE_SEEN_TOUR_PROMPT,
          payload: [true]
        });
        setShowTourPopup(true);
      }
    }
  }, [screenIsFocused]);
  const onCTAPressed = () => {
    setShowTourPopup(false);
    dispatch({
      type: _store.DispatchAction.ENABLE_TOURS,
      payload: [true]
    });
    dispatch({
      type: _store.DispatchAction.UPDATE_SEEN_HOME_TOUR,
      payload: [true]
    });
    start(_tour.TourID.HomeTour);
  };
  const onDismissPressed = () => {
    setShowTourPopup(false);
    dispatch({
      type: _store.DispatchAction.ENABLE_TOURS,
      payload: [false]
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: styles.flatlist,
    showsVerticalScrollIndicator: false,
    scrollEnabled: (notifications === null || notifications === void 0 ? void 0 : notifications.length) > 0,
    decelerationRate: "fast",
    ListEmptyComponent: NoNewUpdates,
    ListHeaderComponent: () => /*#__PURE__*/_react.default.createElement(HomeHeaderView, null),
    ListFooterComponent: () => /*#__PURE__*/_react.default.createElement(HomeFooterView, null),
    data: notifications,
    keyExtractor: (_, i) => i.toString(),
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: 20,
        paddingTop: index === 0 ? 20 : 0,
        paddingBottom: index === notifications.length - 1 ? 20 : 10,
        backgroundColor: ColorPallet.brand.secondaryBackground
      }
    }, DisplayListItemType(item))
  }), showTourPopup && /*#__PURE__*/_react.default.createElement(_AppGuideModal.default, {
    title: t('Tour.GuideTitle'),
    description: t('Tour.WouldYouLike'),
    onCallToActionPressed: onCTAPressed,
    onCallToActionLabel: t('Tour.UseAppGuides'),
    onSecondCallToActionPressed: onDismissPressed,
    onSecondCallToActionLabel: t('Tour.DoNotUseAppGuides'),
    onDismissPressed: onDismissPressed
  }));
};
var _default = exports.default = Home;
//# sourceMappingURL=Home.js.map