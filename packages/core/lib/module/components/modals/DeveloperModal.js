import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TOKENS, useServices } from '../../container-api';
import FauxHeader from '../misc/FauxHeader';
import SafeAreaModal from './SafeAreaModal';
import { useTheme } from '../../contexts/theme';
const DeveloperModal = ({
  onBackPressed
}) => {
  const {
    NavigationTheme
  } = useTheme();
  const [Developer] = useServices([TOKENS.SCREEN_DEVELOPER]);
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(SafeAreaModal, null, /*#__PURE__*/React.createElement(SafeAreaView, {
    edges: ['left', 'right', 'top'],
    style: {
      flex: 1,
      backgroundColor: NavigationTheme.colors.primary
    }
  }, /*#__PURE__*/React.createElement(FauxHeader, {
    title: t('Screens.Developer'),
    onBackPressed: onBackPressed
  }), /*#__PURE__*/React.createElement(Developer, null)));
};
export default DeveloperModal;
//# sourceMappingURL=DeveloperModal.js.map