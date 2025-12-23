import { CredentialExchangeRecord, CredentialState, ProofExchangeRecord, ProofState } from '@credo-ts/core';
import { useBasicMessagesByConnectionId } from '@credo-ts/react-hooks';
import { isPresentationReceived } from '@hyperledger/aries-bifold-verifier';
import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Text } from 'react-native';
import { ChatEvent } from '../components/chat/ChatEvent';
import { CallbackType } from '../components/chat/ChatMessage';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useCredentialsByConnectionId } from '../hooks/credentials';
import { useProofsByConnectionId } from '../hooks/proofs';
import { Role } from '../types/chat';
import { Screens, Stacks } from '../types/navigators';
import { getConnectionName, getCredentialEventLabel, getCredentialEventRole, getMessageEventRole, getProofEventLabel, getProofEventRole } from '../utils/helpers';

/**
 * Determines the callback to be called when the button below a given chat message is pressed, if it exists.
 *
 * eg. 'View offer' -> opens the credential offer screen
 *
 * @param {CredentialExchangeRecord | ProofExchangeRecord} record - The record to determine the callback type for.
 * @returns {CallbackType} The callback type for the given record.
 */
const callbackTypeForMessage = record => {
  if (record instanceof CredentialExchangeRecord && (record.state === CredentialState.Done || record.state === CredentialState.OfferReceived)) {
    return CallbackType.CredentialOffer;
  }
  if (record instanceof ProofExchangeRecord && isPresentationReceived(record) && record.isVerified !== undefined || record.state === ProofState.RequestReceived || record.state === ProofState.Done && record.isVerified === undefined) {
    return CallbackType.ProofRequest;
  }
  if (record instanceof ProofExchangeRecord && (record.state === ProofState.PresentationSent || record.state === ProofState.Done)) {
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
    ColorPallet
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
      const msgText = /*#__PURE__*/React.createElement(Text, {
        style: role === Role.me ? theme.rightText : theme.leftText
      }, record.content.split(linkRegex).map((split, i) => {
        if (i < links.length) {
          const link = links[i];
          return /*#__PURE__*/React.createElement(Fragment, {
            key: `${record.id}-${i}`
          }, /*#__PURE__*/React.createElement(Text, null, split), /*#__PURE__*/React.createElement(Text, {
            onPress: () => handleLinkPress(link),
            style: {
              color: ColorPallet.brand.link,
              textDecorationLine: 'underline'
            },
            accessibilityRole: 'link'
          }, link));
        }
        return /*#__PURE__*/React.createElement(Text, {
          key: `${record.id}-${i}`
        }, split);
      }));
      return {
        _id: record.id,
        text: record.content,
        renderEvent: () => msgText,
        createdAt: record.updatedAt || record.createdAt,
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
        createdAt: record.updatedAt || record.createdAt,
        type: record.type,
        user: {
          _id: role
        },
        messageOpensCallbackType: callbackTypeForMessage(record),
        onDetails: () => {
          const navMap = {
            [CredentialState.Done]: () => {
              navigation.navigate(Stacks.ContactStack, {
                screen: Screens.CredentialDetails,
                params: {
                  credential: record
                }
              });
            },
            [CredentialState.OfferReceived]: () => {
              navigation.navigate(Stacks.ContactStack, {
                screen: Screens.CredentialOffer,
                params: {
                  credentialId: record.id
                }
              });
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
        createdAt: record.updatedAt || record.createdAt,
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
                senderReview: record.state === ProofState.PresentationSent || record.state === ProofState.Done && record.isVerified === undefined
              }
            });
          };
          const navMap = {
            [ProofState.Done]: toProofDetails,
            [ProofState.PresentationSent]: toProofDetails,
            [ProofState.PresentationReceived]: toProofDetails,
            [ProofState.RequestReceived]: () => {
              navigation.navigate(Stacks.ContactStack, {
                screen: Screens.ProofRequest,
                params: {
                  proofId: record.id
                }
              });
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
      renderEvent: () => /*#__PURE__*/React.createElement(Text, {
        style: theme.rightText
      }, t('Chat.YouConnected'), /*#__PURE__*/React.createElement(Text, {
        style: [theme.rightText, theme.rightTextHighlighted]
      }, " ", theirLabel)),
      createdAt: connection.createdAt,
      user: {
        _id: Role.me
      }
    } : undefined;
    setMessages(connectedMessage ? [...transformedMessages.sort((a, b) => b.createdAt - a.createdAt), connectedMessage] : transformedMessages.sort((a, b) => b.createdAt - a.createdAt));
  }, [basicMessages, credentials, proofs, theirLabel]);
  return messages;
};
//# sourceMappingURL=chat-messages.js.map