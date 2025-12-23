import { BasicMessageRepository } from '@credo-ts/core';
import { useAgent, useBasicMessagesByConnectionId, useConnectionById } from '@credo-ts/react-hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoIcon from '../components/buttons/InfoIcon';
import { renderComposer, renderInputToolbar, renderSend } from '../components/chat';
import ActionSlider from '../components/chat/ActionSlider';
import { renderActions } from '../components/chat/ChatActions';
import { ChatMessage } from '../components/chat/ChatMessage';
import { useNetwork } from '../contexts/network';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useChatMessagesByConnection } from '../hooks/chat-messages';
import { Role } from '../types/chat';
import { BasicMessageMetadata } from '../types/metadata';
import { Screens, Stacks } from '../types/navigators';
import { getConnectionName } from '../utils/helpers';
const Chat = ({
  route
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Chat route params were not set properly');
  }
  const {
    connectionId
  } = route.params;
  const [store] = useStore();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const navigation = useNavigation();
  const connection = useConnectionById(connectionId);
  const basicMessages = useBasicMessagesByConnectionId(connectionId);
  const chatMessages = useChatMessagesByConnection(connection);
  const isFocused = useIsFocused();
  const {
    assertConnectedNetwork,
    silentAssertConnectedNetwork
  } = useNetwork();
  const [showActionSlider, setShowActionSlider] = useState(false);
  const theme = useTheme();
  const {
    ColorPallet,
    ChatTheme,
    Assets
  } = theme;
  const [theirLabel, setTheirLabel] = useState(getConnectionName(connection, store.preferences.alternateContactNames));

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  useEffect(() => {
    setTheirLabel(getConnectionName(connection, store.preferences.alternateContactNames));
  }, [isFocused, connection, store.preferences.alternateContactNames]);
  useMemo(() => {
    assertConnectedNetwork();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      title: theirLabel,
      headerRight: () => /*#__PURE__*/React.createElement(InfoIcon, {
        connectionId: connection === null || connection === void 0 ? void 0 : connection.id
      })
    });
  }, [connection, theirLabel]);

  // when chat is open, mark messages as seen
  useEffect(() => {
    basicMessages.forEach(msg => {
      const meta = msg.metadata.get(BasicMessageMetadata.customMetadata);
      if (agent && !(meta !== null && meta !== void 0 && meta.seen)) {
        msg.metadata.set(BasicMessageMetadata.customMetadata, {
          ...meta,
          seen: true
        });
        const basicMessageRepository = agent.context.dependencyManager.resolve(BasicMessageRepository);
        basicMessageRepository.update(agent.context, msg);
      }
    });
  }, [basicMessages]);
  const onSend = useCallback(async messages => {
    await (agent === null || agent === void 0 ? void 0 : agent.basicMessages.sendMessage(connectionId, messages[0].text));
  }, [agent, connectionId]);
  const onSendRequest = useCallback(async () => {
    navigation.navigate(Stacks.ProofRequestsStack, {
      screen: Screens.ProofRequests,
      params: {
        navigation: navigation,
        connectionId
      }
    });
  }, [navigation, connectionId]);
  const actions = useMemo(() => {
    return store.preferences.useVerifierCapability ? [{
      text: t('Verifier.SendProofRequest'),
      onPress: () => {
        setShowActionSlider(false);
        onSendRequest();
      },
      icon: () => /*#__PURE__*/React.createElement(Assets.svg.iconInfoSentDark, {
        height: 30,
        width: 30
      })
    }] : undefined;
  }, [t, store.preferences.useVerifierCapability, onSendRequest]);
  const onDismiss = () => {
    setShowActionSlider(false);
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    edges: ['bottom', 'left', 'right'],
    style: {
      flex: 1,
      backgroundColor: ColorPallet.grayscale.white,
      borderRadius: 24
    }
  }, /*#__PURE__*/React.createElement(GiftedChat, {
    messages: chatMessages,
    showAvatarForEveryMessage: true,
    alignTop: true,
    renderAvatar: () => null,
    messageIdGenerator: msg => (msg === null || msg === void 0 ? void 0 : msg._id.toString()) || '0',
    renderMessage: props => /*#__PURE__*/React.createElement(ChatMessage, {
      messageProps: props
    }),
    renderInputToolbar: props => renderInputToolbar(props, ChatTheme),
    renderSend: props => renderSend(props, ChatTheme),
    renderComposer: props => renderComposer(props, ChatTheme, t('Contacts.TypeHere')),
    disableComposer: !silentAssertConnectedNetwork(),
    onSend: onSend,
    user: {
      _id: Role.me
    },
    renderActions: props => renderActions(props, ChatTheme, actions),
    onPressActionButton: actions ? () => setShowActionSlider(true) : undefined
  }), showActionSlider && /*#__PURE__*/React.createElement(ActionSlider, {
    onDismiss: onDismiss,
    actions: actions
  }));
};
export default Chat;
//# sourceMappingURL=Chat.js.map