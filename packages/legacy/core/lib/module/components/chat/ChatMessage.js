function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { Role } from '../../types/chat';
import { formatTime } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import Text from '../texts/Text';
export let CallbackType = /*#__PURE__*/function (CallbackType) {
  CallbackType["CredentialOffer"] = "CredentialOffer";
  CallbackType["ProofRequest"] = "ProofRequest";
  CallbackType["PresentationSent"] = "PresentationSent";
  return CallbackType;
}({});
const MessageTime = ({
  message
}) => {
  const {
    ChatTheme: theme
  } = useTheme();
  return /*#__PURE__*/React.createElement(Text, {
    style: message.user._id === Role.me ? theme.timeStyleRight : theme.timeStyleLeft
  }, formatTime(message.createdAt, {
    includeHour: true,
    chatFormat: true,
    trim: true
  }));
};
const MessageIcon = ({
  type
}) => {
  const {
    ChatTheme: theme,
    Assets
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      ...theme.documentIconContainer
    }
  }, type === CallbackType.CredentialOffer && /*#__PURE__*/React.createElement(Assets.svg.iconCredentialOfferLight, {
    width: 40,
    height: 40
  }), type === CallbackType.PresentationSent && /*#__PURE__*/React.createElement(Assets.svg.iconInfoSentLight, {
    width: 40,
    height: 40
  }), type === CallbackType.ProofRequest && /*#__PURE__*/React.createElement(Assets.svg.iconProofRequestLight, {
    width: 40,
    height: 40
  }));
};
export const ChatMessage = ({
  messageProps
}) => {
  const {
    t
  } = useTranslation();
  const {
    ChatTheme: theme
  } = useTheme();
  const message = useMemo(() => messageProps.currentMessage, [messageProps]);
  const textForCallbackType = callbackType => {
    // Receiving a credential offer
    if (callbackType === CallbackType.CredentialOffer) {
      return t('Chat.ViewOffer');
    }

    // Receiving a proof request
    if (callbackType === CallbackType.ProofRequest) {
      return t('Chat.ViewRequest');
    }

    // After a presentation of a proof
    if (callbackType === CallbackType.PresentationSent) {
      return t('Chat.OpenPresentation');
    }
    return t('Chat.OpenItem');
  };
  const testIdForCallbackType = callbackType => {
    const text = textForCallbackType(callbackType);
    const textWithoutSpaces = text.replace(/\s+/g, '');
    return testIdWithKey(textWithoutSpaces);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: message.user._id === Role.me ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      ...theme.containerStyle
    }
  }, /*#__PURE__*/React.createElement(Bubble, _extends({}, messageProps, {
    renderUsernameOnMessage: false,
    renderMessageText: () => message.renderEvent(),
    containerStyle: {
      left: {
        margin: 0
      },
      right: {
        margin: 0
      }
    },
    wrapperStyle: {
      left: {
        ...theme.leftBubble,
        marginRight: 0,
        marginLeft: 0
      },
      right: {
        ...theme.rightBubble,
        marginLeft: 0,
        marginRight: 0
      }
    },
    textStyle: {
      left: {
        ...theme.leftText
      },
      right: {
        ...theme.rightText
      }
    },
    renderTime: () => /*#__PURE__*/React.createElement(MessageTime, {
      message: message
    }),
    renderCustomView: () => message.messageOpensCallbackType ? /*#__PURE__*/React.createElement(MessageIcon, {
      type: message.messageOpensCallbackType
    }) : null
  })), message.messageOpensCallbackType && /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: textForCallbackType(message.messageOpensCallbackType),
    testID: testIdForCallbackType(message.messageOpensCallbackType),
    onPress: () => {
      if (message.onDetails) message.onDetails();
    },
    style: {
      ...theme.openButtonStyle
    },
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      ...theme.openButtonTextStyle
    }
  }, textForCallbackType(message.messageOpensCallbackType)))));
};
//# sourceMappingURL=ChatMessage.js.map