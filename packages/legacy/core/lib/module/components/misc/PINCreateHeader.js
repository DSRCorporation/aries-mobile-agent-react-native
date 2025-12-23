import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/theme';
import { Text, View } from 'react-native';
const PINCreateHeader = ({
  updatePin
}) => {
  const {
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, {
      marginBottom: 16
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }, updatePin ? t('PINCreate.RememberChangePIN') : t('PINCreate.RememberPIN')), ' ', t('PINCreate.PINDisclaimer')));
};
export default PINCreateHeader;
//# sourceMappingURL=PINCreateHeader.js.map