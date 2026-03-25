import { useBasicMessagesByConnectionId } from '@bifold/react-hooks';
import { DidCommCredentialExchangeRecord, DidCommCredentialState, DidCommProofExchangeRecord, DidCommProofState } from '@credo-ts/didcomm';
import { isPresentationReceived } from '@bifold/verifier';
import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { ChatEvent } from '../components/chat/ChatEvent';
import { CallbackType } from '../components/chat/ChatMessage';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useCredentialsByConnectionId } from './credentials';
import { useProofsByConnectionId } from './proofs';
import { Role } from '../types/chat';
import { Screens, Stacks } from '../types/navigators';
import { getConnectionName, getCredentialEventLabel, getCredentialEventRole, getMessageEventRole, getProofEventLabel, getProofEventRole } from '../utils/helpers';
import { ThemedText } from '../components/texts/ThemedText';

/**
 * Determines the callback to be called when the button below a given chat message is pressed, if it exists.
 *
 * eg. 'View offer' -> opens the credential offer screen
 *
 * @param {DidCommCredentialExchangeRecord | DidCommProofExchangeRecord} record - The record to determine the callback type for.
 * @returns {CallbackType} The callback type for the given record.
 */
const callbackTypeForMessage = record => {
  if (record instanceof DidCommCredentialExchangeRecord && (record.state === DidCommCredentialState.Done || record.state === DidCommCredentialState.OfferReceived)) {
    return CallbackType.CredentialOffer;
  }
  if (record instanceof DidCommProofExchangeRecord && isPresentationReceived(record) && record.isVerified !== undefined || record.state === DidCommProofState.RequestReceived || record.state === DidCommProofState.Done && record.isVerified === undefined) {
    return CallbackType.ProofRequest;
  }
  if (record instanceof DidCommProofExchangeRecord && (record.state === DidCommProofState.PresentationSent || record.state === DidCommProofState.Done)) {
    return CallbackType.PresentationSent;
  }
};

/**
 * Custom hook for retrieving chat messages for a given connection. This hook includes some of
 * the JSX for rendering the chat messages, including the logic for handling links in messages.
 *
 * @param {ConnectionRecord} connection - The connection to retrieve chat messages for.
 * @returns {ExtendedChatMessage[]} The chat messages for the given connection.
 */
export const useChatMessagesByConnection = connection => {
  const [messages, setMessages] = useState([]);
  const [store] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ChatTheme: theme,
    ColorPalette
  } = useTheme();
  const navigation = useNavigation();
  const basicMessages = useBasicMessagesByConnectionId(connection === null || connection === void 0 ? void 0 : connection.id);
  const credentials = useCredentialsByConnectionId(connection === null || connection === void 0 ? void 0 : connection.id);
  const proofs = useProofsByConnectionId(connection === null || connection === void 0 ? void 0 : connection.id);
  const [theirLabel, setTheirLabel] = useState(getConnectionName(connection, store.preferences.alternateContactNames));

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  useEffect(() => {
    setTheirLabel(getConnectionName(connection, store.preferences.alternateContactNames));
  }, [connection, store.preferences.alternateContactNames]);
  useEffect(() => {
    const transformedMessages = basicMessages.map(record => {
      const role = getMessageEventRole(record);
      // eslint-disable-next-line
      const linkRegex = /(?:https?\:\/\/\w+(?:\.\w+)+\S*)|(?:[\w\d\.\_\-]+@\w+(?:\.\w+)+)/gim;
      // eslint-disable-next-line
      const mailRegex = /^[\w\d\.\_\-]+@\w+(?:\.\w+)+$/gim;
      const links = record.content.match(linkRegex) ?? [];
      const handleLinkPress = link => {
        if (link.match(mailRegex)) {
          link = 'mailto:' + link;
        }
        Linking.openURL(link);
      };
      const msgText = /*#__PURE__*/React.createElement(ThemedText, {
        style: role === Role.me ? theme.rightText : theme.leftText
      }, record.content.split(linkRegex).map((split, i) => {
        if (i < links.length) {
          const link = links[i];
          return /*#__PURE__*/React.createElement(Fragment, {
            key: `${record.id}-${i}`
          }, /*#__PURE__*/React.createElement(ThemedText, null, split), /*#__PURE__*/React.createElement(ThemedText, {
            onPress: () => handleLinkPress(link),
            style: {
              color: ColorPalette.brand.link,
              textDecorationLine: 'underline'
            },
            accessibilityRole: 'link'
          }, link));
        }
        return /*#__PURE__*/React.createElement(ThemedText, {
          key: `${record.id}-${i}`
        }, split);
      }));
      return {
        _id: record.id,
        text: record.content,
        renderEvent: () => msgText,
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        }
      };
    });
    transformedMessages.push(...credentials.map(record => {
      const role = getCredentialEventRole(record);
      const userLabel = role === Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t(getCredentialEventLabel(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/React.createElement(ChatEvent, {
          role: role,
          userLabel: userLabel,
          actionLabel: actionLabel
        }),
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        },
        messageOpensCallbackType: callbackTypeForMessage(record),
        onDetails: () => {
          const navMap = {
            [DidCommCredentialState.Done]: () => {
              navigation.navigate(Stacks.ContactStack, {
                screen: Screens.CredentialDetails,
                params: {
                  credentialId: record.id
                }
              });
            },
            [DidCommCredentialState.OfferReceived]: () => {
              // if we are in the contact stack, use the parent navigator
              if (navigation.getParent()) {
                var _navigation$getParent;
                (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ConnectionStack, {
                  screen: Screens.Connection,
                  params: {
                    credentialId: record.id
                  }
                });
              } else {
                // if we are in the root stack, use the current navigator
                navigation.navigate(Stacks.ConnectionStack, {
                  screen: Screens.Connection,
                  params: {
                    credentialId: record.id
                  }
                });
              }
            }
          };
          const nav = navMap[record.state];
          if (nav) {
            nav();
          }
        }
      };
    }));
    transformedMessages.push(...proofs.map(record => {
      const role = getProofEventRole(record);
      const userLabel = role === Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t(getProofEventLabel(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/React.createElement(ChatEvent, {
          role: role,
          userLabel: userLabel,
          actionLabel: actionLabel
        }),
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        },
        messageOpensCallbackType: callbackTypeForMessage(record),
        onDetails: () => {
          const toProofDetails = () => {
            navigation.navigate(Stacks.ContactStack, {
              screen: Screens.ProofDetails,
              params: {
                recordId: record.id,
                isHistory: true,
                senderReview: record.state === DidCommProofState.PresentationSent || record.state === DidCommProofState.Done && record.isVerified === undefined
              }
            });
          };
          const navMap = {
            [DidCommProofState.Done]: toProofDetails,
            [DidCommProofState.PresentationSent]: toProofDetails,
            [DidCommProofState.PresentationReceived]: toProofDetails,
            [DidCommProofState.RequestReceived]: () => {
              // if we are in the contact stack, use the parent navigator
              if (navigation.getParent()) {
                var _navigation$getParent2;
                (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(Stacks.ConnectionStack, {
                  screen: Screens.Connection,
                  params: {
                    proofId: record.id
                  }
                });
              } else {
                // if we are in the root stack, use the current navigator
                navigation.navigate(Stacks.ConnectionStack, {
                  screen: Screens.Connection,
                  params: {
                    proofId: record.id
                  }
                });
              }
            }
          };
          const nav = navMap[record.state];
          if (nav) {
            nav();
          }
        }
      };
    }));
    const connectedMessage = connection ? {
      _id: 'connected',
      text: `${t('Chat.YouConnected')} ${theirLabel}`,
      renderEvent: () => /*#__PURE__*/React.createElement(ThemedText, {
        style: theme.rightText
      }, t('Chat.YouConnected'), /*#__PURE__*/React.createElement(ThemedText, {
        style: [theme.rightText, theme.rightTextHighlighted]
      }, " ", theirLabel)),
      createdAt: connection.createdAt,
      user: {
        _id: Role.me
      }
    } : undefined;
    setMessages(connectedMessage ? [...transformedMessages.sort((a, b) => b.createdAt - a.createdAt), connectedMessage] : transformedMessages.sort((a, b) => b.createdAt - a.createdAt));
  }, [ColorPalette, basicMessages, theme, credentials, t, navigation, proofs, theirLabel, connection]);
  return messages;
};
//# sourceMappingURL=chat-messages.js.map