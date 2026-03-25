"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _EmptyListContacts = _interopRequireDefault(require("../components/misc/EmptyListContacts"));
var _constants = require("../constants");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _contacts = require("../utils/contacts");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ListContacts = ({
  navigation
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [connections, setConnections] = (0, _react.useState)([]);
  const {
    records: connectionRecords
  } = (0, _reactHooks.useConnections)();
  const [store] = (0, _store.useStore)();
  const [{
    contactHideList
  }, ContactListItem, defaultScreenOptionsDict] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_CONTACT_LIST_ITEM, _containerApi.TOKENS.OBJECT_SCREEN_CONFIG]);
  const style = _reactNative.StyleSheet.create({
    list: {
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    itemSeparator: {
      backgroundColor: ColorPalette.brand.primaryBackground,
      height: 1,
      marginHorizontal: 16
    }
  });
  (0, _react.useEffect)(() => {
    const fetchAndSetConnections = async () => {
      if (!agent) return;
      let orderedContacts = await (0, _contacts.fetchContactsByLatestMessage)(agent, connectionRecords);

      // if developer mode is disabled, filter out mediator connections and connections in the hide list
      if (!store.preferences.developerModeEnabled) {
        orderedContacts = orderedContacts.filter(r => {
          return !r.connectionTypes.includes(_didcomm.DidCommConnectionType.Mediator) && !(contactHideList !== null && contactHideList !== void 0 && contactHideList.includes((r.theirLabel || r.alias) ?? '')) && r.state === _didcomm.DidCommDidExchangeState.Completed;
        });
      }
      setConnections(orderedContacts);
    };
    fetchAndSetConnections().catch(err => {
      agent === null || agent === void 0 || agent.config.logger.error('Error fetching contacts:', err);
      const error = new _error.BifoldError(t('Error.Title1046'), t('Error.Message1046'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1046);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, [agent, connectionRecords, store.preferences.developerModeEnabled, contactHideList, t]);
  const onPressAddContact = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ConnectStack, {
      screen: _navigators.Screens.Scan,
      params: {
        defaultToConnect: true
      }
    });
  }, [navigation]);
  (0, _react.useEffect)(() => {
    if (store.preferences.useConnectionInviterCapability) {
      navigation.setOptions({
        headerRight: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
          buttonLocation: _IconButton.ButtonLocation.Right,
          accessibilityLabel: t('Contacts.AddContact'),
          testID: (0, _testable.testIdWithKey)('AddContact'),
          onPress: onPressAddContact,
          icon: "plus-circle-outline"
        })
      });
    } else {
      var _defaultScreenOptions;
      navigation.setOptions({
        headerRight: (_defaultScreenOptions = defaultScreenOptionsDict[_navigators.Screens.Contacts]) === null || _defaultScreenOptions === void 0 ? void 0 : _defaultScreenOptions.headerRight
      });
    }
  }, [store.preferences.useConnectionInviterCapability, navigation, t, onPressAddContact, defaultScreenOptionsDict]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: style.list,
    data: connections,
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.itemSeparator
    }),
    keyExtractor: connection => connection.id,
    renderItem: ({
      item: connection
    }) => /*#__PURE__*/_react.default.createElement(ContactListItem, {
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