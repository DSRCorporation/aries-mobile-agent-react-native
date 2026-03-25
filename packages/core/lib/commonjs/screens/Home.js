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
var _types = require("../modules/openid/refresh/types");
var _constants = require("../constants");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _BaseToast = require("../components/toast/BaseToast");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Home = () => {
  const [HomeHeaderView, NoNewUpdates, HomeFooterView, {
    enableTours: enableToursConfig
  }, {
    customNotificationConfig: customNotification,
    useNotifications
  }, NotificationListItem, orchestrator] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_HOME_HEADER, _containerApi.TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, _containerApi.TOKENS.COMPONENT_HOME_FOOTER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.NOTIFICATIONS_LIST_ITEM, _containerApi.TOKENS.UTIL_REFRESH_ORCHESTRATOR]);
  const notifications = useNotifications({});
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    start,
    stop
  } = (0, _tourContext.useTour)();
  const [showTourPopup, setShowTourPopup] = (0, _react.useState)(false);
  const screenIsFocused = (0, _native.useIsFocused)();
  const refreshTimerRef = (0, _react.useRef)(null);
  const styles = _reactNative.StyleSheet.create({
    flatlist: {
      marginBottom: 35
    }
  });
  const DisplayListItemType = (0, _react.useCallback)(item => {
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
    } else if (item.type === _types.OpenIDCustomNotificationType.CredentialExpired) {
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: _NotificationListItem.NotificationType.Custom,
        notification: item,
        customNotification: item
      });
    } else {
      component = /*#__PURE__*/_react.default.createElement(NotificationListItem, {
        notificationType: _NotificationListItem.NotificationType.ProofRequest,
        notification: item
      });
    }
    return component;
  }, [customNotification, NotificationListItem]);
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenHomeTour;
    if (shouldShowTour && screenIsFocused) {
      if (store.tours.seenToursPrompt) {
        dispatch({
          type: _store.DispatchAction.UPDATE_SEEN_HOME_TOUR,
          payload: [true]
        });
        start(_tour.BaseTourID.HomeTour);
      } else {
        setShowTourPopup(true);
      }
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenHomeTour, screenIsFocused, store.tours.seenToursPrompt, dispatch, start]);
  const onCTAPressed = (0, _react.useCallback)(() => {
    setShowTourPopup(false);
    dispatch({
      type: _store.DispatchAction.UPDATE_SEEN_HOME_TOUR,
      payload: [true]
    });
    dispatch({
      type: _store.DispatchAction.ENABLE_TOURS,
      payload: [true]
    });
    dispatch({
      type: _store.DispatchAction.UPDATE_SEEN_TOUR_PROMPT,
      payload: [true]
    });
    start(_tour.BaseTourID.HomeTour);
  }, [dispatch, start]);
  const onDismissPressed = (0, _react.useCallback)(() => {
    setShowTourPopup(false);
    dispatch({
      type: _store.DispatchAction.ENABLE_TOURS,
      payload: [false]
    });
    dispatch({
      type: _store.DispatchAction.UPDATE_SEEN_TOUR_PROMPT,
      payload: [true]
    });
  }, [dispatch]);

  // stop the tour when the screen unmounts
  (0, _react.useEffect)(() => {
    return stop;
  }, [stop]);

  //Run OpenID refresh when requested via DeviceEventEmitter
  (0, _react.useEffect)(() => {
    const sub = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.OPENID_REFRESH_REQUEST, () => {
      // Optional: only refresh when Home is actually visible
      if (!screenIsFocused) return;

      // Clear any pending timer to avoid stacking
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Info,
        text1: t('Toast.OpenIDCredRefreshing.Title'),
        text2: t('Toast.OpenIDCredRefreshing.Message'),
        visibilityTime: 4000,
        position: 'bottom'
      });

      // Run once after 4 seconds
      refreshTimerRef.current = setTimeout(() => {
        orchestrator.runOnce('developer-menu');
      }, 4000);
    });
    return () => {
      sub.remove();
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [screenIsFocused, orchestrator, t]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: styles.flatlist,
    showsVerticalScrollIndicator: false,
    scrollEnabled: (notifications === null || notifications === void 0 ? void 0 : notifications.length) > 0 ? true : false,
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
        backgroundColor: ColorPalette.brand.secondaryBackground
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