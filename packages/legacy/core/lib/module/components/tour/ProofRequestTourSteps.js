import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { TourBox } from './TourBox';
export const proofRequestTourSteps = [{
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
      title: t('Tour.ProofRequests'),
      hideLeft: true,
      rightText: t('Tour.Done'),
      onRight: stop,
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
    }, t('Tour.ProofRequestsDescription')));
  }
}];
//# sourceMappingURL=ProofRequestTourSteps.js.map