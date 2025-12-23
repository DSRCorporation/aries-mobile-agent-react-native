"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
var _ContactListItem = _interopRequireDefault(require("../components/listItems/ContactListItem"));
var _EmptyListContacts = _interopRequireDefault(require("../components/misc/EmptyListContacts"));
var _constants = require("../constants");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _contacts = require("../utils/contacts");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ListContacts = ({
  navigation
}) => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [connections, setConnections] = (0, _react.useState)([]);
  const [store] = (0, _store.useStore)();
  const [{
    contactHideList
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const style = _reactNative.StyleSheet.create({
    list: {
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    itemSeparator: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      height: 1,
      marginHorizontal: 16
    }
  });
  (0, _react.useEffect)(() => {
    const fetchAndSetConnections = async () => {
      if (!agent) return;
      let orderedContacts = await (0, _contacts.fetchContactsByLatestMessage)(agent);

      // if developer mode is disabled, filter out mediator connections and connections in the hide list
      if (!store.preferences.developerModeEnabled) {
        orderedContacts = orderedContacts.filter(r => {
          return !r.connectionTypes.includes(_core.ConnectionType.Mediator) && !(contactHideList !== null && contactHideList !== void 0 && contactHideList.includes((r.theirLabel || r.alias) ?? '')) && r.state === _core.DidExchangeState.Completed;
        });
      }
      setConnections(orderedContacts);
    };
    fetchAndSetConnections().catch(err => {
      agent === null || agent === void 0 || agent.config.logger.error('Error fetching contacts:', err);
      const error = new _error.BifoldError(t('Error.Title1046'), t('Error.Message1046'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1046);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, [agent]);
  const onPressAddContact = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ConnectStack, {
      screen: _navigators.Screens.Scan,
      params: {
        defaultToConnect: true
      }
    });
  };
  (0, _react.useEffect)(() => {
    if (store.preferences.useConnectionInviterCapability) {
      navigation.setOptions({
        headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
          buttonLocation: _HeaderButton.ButtonLocation.Right,
          accessibilityLabel: t('Contacts.AddContact'),
          testID: (0, _testable.testIdWithKey)('AddContact'),
          onPress: onPressAddContact,
          icon: "plus-circle-outline"
        })
      });
    } else {
      navigation.setOptions({
        headerRight: () => false
      });
    }
  }, [store.preferences.useConnectionInviterCapability]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: style.list,
    data: connections,
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.itemSeparator
    }),
    keyExtractor: connection => connection.id,
    renderItem: ({
      item: connection
    }) => /*#__PURE__*/_react.default.createElement(_ContactListItem.default, {
      contact: connection,
      navigation: navigation
    }),
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(_EmptyListContacts.default, {
      navigation: navigation
    }),
    showsVerticalScrollIndicator: false
  }));
};
var _default = exports.default = ListContacts;
//# sourceMappingURL=ListContacts.js.map