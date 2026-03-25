function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { t } from 'i18next';
import React from 'react';
import { Actions } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const renderActions = (props, theme, actions) => {
  return actions ? /*#__PURE__*/React.createElement(Actions, _extends({}, props, {
    containerStyle: {
      width: 40,
      height: 40,
      marginBottom: 6,
      marginLeft: 20
    },
    icon: () => /*#__PURE__*/React.createElement(Icon, {
      name: 'plus-box-outline',
      size: 40,
      color: theme.options,
      accessible: true,
      accessibilityLabel: t('Chat.Actions'),
      accessibilityRole: "button"
    }),
    optionTintColor: theme.optionsText
  })) : null;
};
//# sourceMappingURL=ChatActions.js.map