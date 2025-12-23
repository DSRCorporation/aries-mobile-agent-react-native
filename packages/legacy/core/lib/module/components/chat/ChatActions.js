function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
      color: theme.options
    }),
    optionTintColor: theme.optionsText
  })) : null;
};
//# sourceMappingURL=ChatActions.js.map