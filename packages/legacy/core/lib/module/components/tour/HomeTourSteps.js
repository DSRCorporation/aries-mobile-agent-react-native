import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { TourBox } from './TourBox';
export const homeTourSteps = [{
  Render: props => {
    const {
      currentTour,
      currentStep,
      next,
      stop,
      previous
    } = props;
    const {
      t
    } = useTranslation();
    const {
      ColorPallet,
      TextTheme
    } = useTheme();
    return /*#__PURE__*/React.createElement(TourBox, {
      title: t('Tour.AddAndShare'),
      leftText: t('Tour.Skip'),
      rightText: t('Tour.Next'),
      onLeft: stop,
      onRight: next,
      currentTour: currentTour,
      currentStep: currentStep,
      previous: previous,
      stop: stop,
      next: next
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        ...TextTheme.normal,
        color: ColorPallet.notification.infoText
      },
      allowFontScaling: false
    }, t('Tour.AddAndShareDescription')));
  }
}, {
  Render: props => {
    const {
      currentTour,
      currentStep,
      next,
      stop,
      previous
    } = props;
    const {
      t
    } = useTranslation();
    const {
      ColorPallet,
      TextTheme
    } = useTheme();
    return /*#__PURE__*/React.createElement(TourBox, {
      title: t('Tour.Notifications'),
      leftText: t('Tour.Back'),
      rightText: t('Tour.Next'),
      onLeft: previous,
      onRight: next,
      currentTour: currentTour,
      currentStep: currentStep,
      next: next,
      stop: stop,
      previous: previous
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        ...TextTheme.normal,
        color: ColorPallet.notification.infoText
      },
      allowFontScaling: false
    }, t('Tour.NotificationsDescription')));
  }
}, {
  Render: props => {
    const {
      currentTour,
      currentStep,
      next,
      stop,
      previous
    } = props;
    const {
      t
    } = useTranslation();
    const {
      ColorPallet,
      TextTheme
    } = useTheme();
    return /*#__PURE__*/React.createElement(TourBox, {
      title: t('Tour.YourCredentials'),
      leftText: t('Tour.Back'),
      rightText: t('Tour.Done'),
      onLeft: previous,
      onRight: stop,
      currentTour: currentTour,
      currentStep: currentStep,
      next: next,
      stop: stop,
      previous: previous
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        ...TextTheme.normal,
        color: ColorPallet.notification.infoText
      },
      allowFontScaling: false
    }, t('Tour.YourCredentialsDescription')));
  }
}];
//# sourceMappingURL=HomeTourSteps.js.map