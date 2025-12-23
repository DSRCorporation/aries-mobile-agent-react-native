import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, StyleSheet } from 'react-native';
import { NotificationType } from '../components/listItems/NotificationListItem';
import AppGuideModal from '../components/modals/AppGuideModal';
import { TOKENS, useServices } from '../container-api';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTour } from '../contexts/tour/tour-context';
import { TourID } from '../types/tour';
const Home = () => {
  const [HomeHeaderView, NoNewUpdates, HomeFooterView, {
    enableTours: enableToursConfig
  }, {
    customNotificationConfig: customNotification,
    useNotifications
  }, NotificationListItem] = useServices([TOKENS.COMPONENT_HOME_HEADER, TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, TOKENS.COMPONENT_HOME_FOOTER, TOKENS.CONFIG, TOKENS.NOTIFICATIONS, TOKENS.NOTIFICATIONS_LIST_ITEM]);
  const notifications = useNotifications();
  const {
    t
  } = useTranslation();
  const {
    ColorPallet
  } = useTheme();
  const [store, dispatch] = useStore();
  const {
    start
  } = useTour();
  const [showTourPopup, setShowTourPopup] = useState(false);
  const screenIsFocused = useIsFocused();
  const styles = StyleSheet.create({
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
      component = /*#__PURE__*/React.createElement(NotificationListItem, {
        notificationType: NotificationType.BasicMessage,
        notification: item
      });
    } else if (item.type === 'CredentialRecord') {
      let notificationType = NotificationType.CredentialOffer;
      if (item.revocationNotification) {
        notificationType = NotificationType.Revocation;
      }
      component = /*#__PURE__*/React.createElement(NotificationListItem, {
        notificationType: notificationType,
        notification: item
      });
    } else if (item.type === 'CustomNotification' && customNotification) {
      component = /*#__PURE__*/React.createElement(NotificationListItem, {
        notificationType: NotificationType.Custom,
        notification: item,
        customNotification: customNotification
      });
    } else {
      component = /*#__PURE__*/React.createElement(NotificationListItem, {
        notificationType: NotificationType.ProofRequest,
        notification: item
      });
    }
    return component;
  };
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenHomeTour;
    if (shouldShowTour && screenIsFocused) {
      if (store.tours.seenToursPrompt) {
        dispatch({
          type: DispatchAction.UPDATE_SEEN_HOME_TOUR,
          payload: [true]
        });
        start(TourID.HomeTour);
      } else {
        dispatch({
          type: DispatchAction.UPDATE_SEEN_TOUR_PROMPT,
          payload: [true]
        });
        setShowTourPopup(true);
      }
    }
  }, [screenIsFocused]);
  const onCTAPressed = () => {
    setShowTourPopup(false);
    dispatch({
      type: DispatchAction.ENABLE_TOURS,
      payload: [true]
    });
    dispatch({
      type: DispatchAction.UPDATE_SEEN_HOME_TOUR,
      payload: [true]
    });
    start(TourID.HomeTour);
  };
  const onDismissPressed = () => {
    setShowTourPopup(false);
    dispatch({
      type: DispatchAction.ENABLE_TOURS,
      payload: [false]
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FlatList, {
    style: styles.flatlist,
    showsVerticalScrollIndicator: false,
    scrollEnabled: (notifications === null || notifications === void 0 ? void 0 : notifications.length) > 0,
    decelerationRate: "fast",
    ListEmptyComponent: NoNewUpdates,
    ListHeaderComponent: () => /*#__PURE__*/React.createElement(HomeHeaderView, null),
    ListFooterComponent: () => /*#__PURE__*/React.createElement(HomeFooterView, null),
    data: notifications,
    keyExtractor: (_, i) => i.toString(),
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/React.createElement(View, {
      style: {
        paddingHorizontal: 20,
        paddingTop: index === 0 ? 20 : 0,
        paddingBottom: index === notifications.length - 1 ? 20 : 10,
        backgroundColor: ColorPallet.brand.secondaryBackground
      }
    }, DisplayListItemType(item))
  }), showTourPopup && /*#__PURE__*/React.createElement(AppGuideModal, {
    title: t('Tour.GuideTitle'),
    description: t('Tour.WouldYouLike'),
    onCallToActionPressed: onCTAPressed,
    onCallToActionLabel: t('Tour.UseAppGuides'),
    onSecondCallToActionPressed: onDismissPressed,
    onSecondCallToActionLabel: t('Tour.DoNotUseAppGuides'),
    onDismissPressed: onDismissPressed
  }));
};
export default Home;
//# sourceMappingURL=Home.js.map