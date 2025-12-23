"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getPresentationStateLabel = record => {
  switch (record.state) {
    case _core.ProofState.RequestSent:
      return 'Verifier.RequestSent';
    case _core.ProofState.PresentationReceived:
      return 'Verifier.PresentationReceived';
    case _core.ProofState.Declined:
    case _core.ProofState.Abandoned:
      return 'Verifier.ProofRequestRejected';
    case _core.ProofState.Done:
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
    ColorPallet
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
      color: ColorPallet.grayscale.black
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
  const presentationReceived = (0, _react.useMemo)(() => (0, _ariesBifoldVerifier.isPresentationReceived)(record), [record]);
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
    testID: (0, _testable.testIdWithKey)('ProofDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.leftContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.cardRow
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.valueLabel
  }, t('Verifier.PresentationFrom'), ":"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.valueText
  }, theirLabel || t('Verifier.ConnectionlessPresentation'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.cardRow
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.valueLabel
  }, t('Verifier.PresentationState'), ":"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.valueText
  }, t(getPresentationStateLabel(record))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.rightContainer
  }, presentationReceived && /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: style.icon,
    name: 'chevron-right'
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.date
  }, (0, _helpers.formatTime)(record.createdAt, {
    shortMonth: true
  }))));
};
const ProofRequestUsageHistory = ({
  route,
  navigation
}) => {
  const {
    templateId
  } = route === null || route === void 0 ? void 0 : route.params;
  const style = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 20,
      elevation: 5
    }
  });
  const proofs = (0, _ariesBifoldVerifier.useProofsByTemplateId)(templateId);
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