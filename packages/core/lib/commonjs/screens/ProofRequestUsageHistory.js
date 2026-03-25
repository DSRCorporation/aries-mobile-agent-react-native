"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _verifier = require("@bifold/verifier");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _EmptyList = _interopRequireDefault(require("../components/misc/EmptyList"));
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const getPresentationStateLabel = record => {
  switch (record.state) {
    case _didcomm.DidCommProofState.RequestSent:
      return 'Verifier.RequestSent';
    case _didcomm.DidCommProofState.PresentationReceived:
      return 'Verifier.PresentationReceived';
    case _didcomm.DidCommProofState.Declined:
    case _didcomm.DidCommProofState.Abandoned:
      return 'Verifier.ProofRequestRejected';
    case _didcomm.DidCommProofState.Done:
      return record.isVerified ? 'Verifier.PresentationReceived' : 'Verifier.PresentationFailed';
    default:
      return '';
  }
};
const ProofRequestUsageHistoryRecord = ({
  record,
  navigation
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems,
    ColorPalette
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const connection = (0, _reactHooks.useConnectionById)(record.connectionId ?? '');
  const theirLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const style = _reactNative.StyleSheet.create({
    card: {
      ...ListItems.requestTemplateBackground,
      flexGrow: 1,
      flexDirection: 'row',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10
    },
    leftContainer: {
      flexDirection: 'column',
      marginVertical: 10
    },
    cardRow: {
      flexDirection: 'row',
      marginVertical: 2
    },
    valueLabel: {
      color: ColorPalette.grayscale.black
    },
    valueText: {
      ...ListItems.requestTemplateTitle,
      marginLeft: 4
    },
    rightContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    icon: {
      ...ListItems.requestTemplateIcon
    },
    date: {
      ...ListItems.requestTemplateDate
    }
  });
  const presentationReceived = (0, _react.useMemo)(() => (0, _verifier.isPresentationReceived)(record), [record]);
  const onDetails = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.ProofDetails, {
      recordId: record.id,
      isHistory: true
    });
  }, [navigation, record]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: style.card,
    onPress: onDetails,
    disabled: !presentationReceived,
    accessibilityLabel: t('Screens.ProofDetails'),
    accessibilityRole: "button",
    testID: (0, _testable.testIdWithKey)('ProofDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.leftContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.cardRow
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.valueLabel
  }, t('Verifier.PresentationFrom'), ":"), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.valueText
  }, theirLabel || t('Verifier.ConnectionlessPresentation'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.cardRow
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.valueLabel
  }, t('Verifier.PresentationState'), ":"), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.valueText
  }, t(getPresentationStateLabel(record))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.rightContainer
  }, presentationReceived && /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: style.icon,
    name: 'chevron-right'
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.date
  }, (0, _helpers.formatTime)(record.createdAt, {
    shortMonth: true
  }))));
};
const ProofRequestUsageHistory = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequestUsageHistory route params were not set properly');
  }
  const {
    templateId
  } = route.params;
  const style = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 20,
      elevation: 5
    }
  });
  const proofs = (0, _verifier.useProofsByTemplateId)(templateId);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: proofs,
    keyExtractor: proof => proof.id,
    renderItem: ({
      item
    }) => /*#__PURE__*/_react.default.createElement(ProofRequestUsageHistoryRecord, {
      record: item,
      navigation: navigation
    }),
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(_EmptyList.default, null)
  }));
};
var _default = exports.default = ProofRequestUsageHistory;
//# sourceMappingURL=ProofRequestUsageHistory.js.map