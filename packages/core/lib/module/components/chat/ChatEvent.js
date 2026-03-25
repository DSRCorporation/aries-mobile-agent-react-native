import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { Role } from '../../types/chat';
import { ThemedText } from '../texts/ThemedText';
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
  }, userLabel && /*#__PURE__*/React.createElement(ThemedText, {
    style: [role === Role.me ? ChatTheme.rightText : ChatTheme.leftText, {
      marginRight: 4
    }]
  }, userLabel), actionLabel && /*#__PURE__*/React.createElement(ThemedText, {
    style: role === Role.me ? ChatTheme.rightTextHighlighted : ChatTheme.leftTextHighlighted
  }, actionLabel));
};
//# sourceMappingURL=ChatEvent.js.map