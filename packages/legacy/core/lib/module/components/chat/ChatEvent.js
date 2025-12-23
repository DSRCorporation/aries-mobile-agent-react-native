import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { Role } from '../../types/chat';
export const ChatEvent = ({
  userLabel,
  actionLabel,
  role
}) => {
  const {
    ChatTheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }, userLabel && /*#__PURE__*/React.createElement(Text, {
    style: [role === Role.me ? ChatTheme.rightText : ChatTheme.leftText, {
      marginRight: 4
    }]
  }, userLabel), actionLabel && /*#__PURE__*/React.createElement(Text, {
    style: role === Role.me ? ChatTheme.rightTextHighlighted : ChatTheme.leftTextHighlighted
  }, actionLabel));
};
//# sourceMappingURL=ChatEvent.js.map