"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChatMessagesByConnection = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ChatEvent = require("../components/chat/ChatEvent");
var _ChatMessage = require("../components/chat/ChatMessage");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _credentials = require("../hooks/credentials");
var _proofs = require("../hooks/proofs");
var _chat = require("../types/chat");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Determines the callback to be called when the button below a given chat message is pressed, if it exists.
 *
 * eg. 'View offer' -> opens the credential offer screen
 *
 * @param {CredentialExchangeRecord | ProofExchangeRecord} record - The record to determine the callback type for.
 * @returns {CallbackType} The callback type for the given record.
 */
const callbackTypeForMessage = record => {
  if (record instanceof _core.CredentialExchangeRecord && (record.state === _core.CredentialState.Done || record.state === _core.CredentialState.OfferReceived)) {
    return _ChatMessage.CallbackType.CredentialOffer;
  }
  if (record instanceof _core.ProofExchangeRecord && (0, _ariesBifoldVerifier.isPresentationReceived)(record) && record.isVerified !== undefined || record.state === _core.ProofState.RequestReceived || record.state === _core.ProofState.Done && record.isVerified === undefined) {
    return _ChatMessage.CallbackType.ProofRequest;
  }
  if (record instanceof _core.ProofExchangeRecord && (record.state === _core.ProofState.PresentationSent || record.state === _core.ProofState.Done)) {
    return _ChatMessage.CallbackType.PresentationSent;
  }
};

/**
 * Custom hook for retrieving chat messages for a given connection. This hook includes some of
 * the JSX for rendering the chat messages, including the logic for handling links in messages.
 *
 * @param {ConnectionRecord} connection - The connection to retrieve chat messages for.
 * @returns {ExtendedChatMessage[]} The chat messages for the given connection.
 */
const useChatMessagesByConnection = connection => {
  const [messages, setMessages] = (0, _react.useState)([]);
  const [store] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ChatTheme: theme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const navigation = (0, _native.useNavigation)();
  const basicMessages = (0, _reactHooks.useBasicMessagesByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const credentials = (0, _credentials.useCredentialsByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const proofs = (0, _proofs.useProofsByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const [theirLabel, setTheirLabel] = (0, _react.useState)((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  (0, _react.useEffect)(() => {
    setTheirLabel((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  }, [connection, store.preferences.alternateContactNames]);
  (0, _react.useEffect)(() => {
    const transformedMessages = basicMessages.map(record => {
      const role = (0, _helpers.getMessageEventRole)(record);
      // eslint-disable-next-line
      const linkRegex = /(?:https?\:\/\/\w+(?:\.\w+)+\S*)|(?:[\w\d\.\_\-]+@\w+(?:\.\w+)+)/gim;
      // eslint-disable-next-line
      const mailRegex = /^[\w\d\.\_\-]+@\w+(?:\.\w+)+$/gim;
      const links = record.content.match(linkRegex) ?? [];
      const handleLinkPress = link => {
        if (link.match(mailRegex)) {
          link = 'mailto:' + link;
        }
        _reactNative.Linking.openURL(link);
      };
      const msgText = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: role === _chat.Role.me ? theme.rightText : theme.leftText
      }, record.content.split(linkRegex).map((split, i) => {
        if (i < links.length) {
          const link = links[i];
          return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
            key: `${record.id}-${i}`
          }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, split), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            onPress: () => handleLinkPress(link),
            style: {
              color: ColorPallet.brand.link,
              textDecorationLine: 'underline'
            },
            accessibilityRole: 'link'
          }, link));
        }
        return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
      const role = (0, _helpers.getCredentialEventRole)(record);
      const userLabel = role === _chat.Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t((0, _helpers.getCredentialEventLabel)(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/_react.default.createElement(_ChatEvent.ChatEvent, {
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
            [_core.CredentialState.Done]: () => {
              navigation.navigate(_navigators.Stacks.ContactStack, {
                screen: _navigators.Screens.CredentialDetails,
                params: {
                  credential: record
                }
              });
            },
            [_core.CredentialState.OfferReceived]: () => {
              navigation.navigate(_navigators.Stacks.ContactStack, {
                screen: _navigators.Screens.CredentialOffer,
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
      const role = (0, _helpers.getProofEventRole)(record);
      const userLabel = role === _chat.Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t((0, _helpers.getProofEventLabel)(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/_react.default.createElement(_ChatEvent.ChatEvent, {
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
            navigation.navigate(_navigators.Stacks.ContactStack, {
              screen: _navigators.Screens.ProofDetails,
              params: {
                recordId: record.id,
                isHistory: true,
                senderReview: record.state === _core.ProofState.PresentationSent || record.state === _core.ProofState.Done && record.isVerified === undefined
              }
            });
          };
          const navMap = {
            [_core.ProofState.Done]: toProofDetails,
            [_core.ProofState.PresentationSent]: toProofDetails,
            [_core.ProofState.PresentationReceived]: toProofDetails,
            [_core.ProofState.RequestReceived]: () => {
              navigation.navigate(_navigators.Stacks.ContactStack, {
                screen: _navigators.Screens.ProofRequest,
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
      renderEvent: () => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: theme.rightText
      }, t('Chat.YouConnected'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [theme.rightText, theme.rightTextHighlighted]
      }, " ", theirLabel)),
      createdAt: connection.createdAt,
      user: {
        _id: _chat.Role.me
      }
    } : undefined;
    setMessages(connectedMessage ? [...transformedMessages.sort((a, b) => b.createdAt - a.createdAt), connectedMessage] : transformedMessages.sort((a, b) => b.createdAt - a.createdAt));
  }, [basicMessages, credentials, proofs, theirLabel]);
  return messages;
};
exports.useChatMessagesByConnection = useChatMessagesByConnection;
//# sourceMappingURL=chat-messages.js.map