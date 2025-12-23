import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InfoBoxType } from '../../components/misc/InfoBox';
import PopupModal from './PopupModal';
const NetInfoModal = ({
  visible,
  onSubmit = () => null
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && /*#__PURE__*/React.createElement(SafeAreaView, null, /*#__PURE__*/React.createElement(PopupModal, {
    notificationType: InfoBoxType.Error,
    title: t('NetInfo.NoInternetConnectionTitle'),
    description: t('NetInfo.NoInternetConnectionMessage'),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: () => onSubmit()
  })));
};
export default NetInfoModal;
//# sourceMappingURL=NetInfoModal.js.map