import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/theme';
import { useDefaultStackOptions } from '../../../navigators/defaultStackOptions';
import { Screens } from '../../../types/navigators';
import { testIdWithKey } from '../../../utils/testable';
// import HistoryDetailsPage from '../ui/HistoryDetails'
import HistoryPage from '../ui/HistoryPage';
const HistoryStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.HistoryPage,
    component: HistoryPage,
    options: {
      title: t('Screens.History'),
      headerBackTestID: testIdWithKey('Back')
    }
  }));
};
export default HistoryStack;
//# sourceMappingURL=HistoryStack.js.map