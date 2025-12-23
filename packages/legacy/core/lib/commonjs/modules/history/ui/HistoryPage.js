"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ButtonApi = require("../../../components/buttons/Button-api");
var _KeyboardView = _interopRequireDefault(require("../../../components/views/KeyboardView"));
var _containerApi = require("../../../container-api");
var _animatedComponents = require("../../../contexts/animated-components");
var _theme = require("../../../contexts/theme");
var _testable = require("../../../utils/testable");
var _types = require("../types");
var _HistoryListItem = _interopRequireDefault(require("./components/HistoryListItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { TouchableOpacity } from 'react-native-gesture-handler'

const HistoryPage = () => {
  //   const updatePin = (route.params as any)?.updatePin
  const [continueEnabled] = (0, _react.useState)(true);
  const [isLoading] = (0, _react.useState)(false);
  const [historyItems, setHistoryItems] = (0, _react.useState)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const actionButtonLabel = t('Global.SaveSettings');
  const actionButtonTestId = (0, _testable.testIdWithKey)('Save');
  const [Button, logger, loadHistory] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_BUTTON, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY]);
  const historyManager = agent ? loadHistory(agent) : undefined;

  //State

  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    title: {
      marginTop: 16
    },
    deleteButtonText: {
      alignSelf: 'flex-start',
      color: '#CD0000' //TODO: Use Bifold alert color
    },
    deleteButton: {
      marginBottom: 16
    },
    gap: {
      marginTop: 10,
      marginBottom: 10
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {}
  });

  /** Load history */
  const getAllHistory = async () => {
    if (!historyManager) {
      logger.error(`[${HistoryPage.name}][getAllHistory]: historyManager undefined!`);
      return;
    }
    const allRecords = await historyManager.getHistoryItems({
      type: _types.RecordType.HistoryRecord
    });
    allRecords.sort((objA, objB) => Number(objB.content.createdAt) - Number(objA.content.createdAt));
    if (allRecords) {
      setHistoryItems(allRecords);
    }
  };

  //UI
  const renderEmptyListComponent = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [style.title, TextTheme.headerTitle]
    }, t('ActivityHistory.NoHistory')));
  };
  const renderHistoryListItem = item => {
    return /*#__PURE__*/_react.default.createElement(_HistoryListItem.default, {
      item: item
    });
  };
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    getAllHistory();
  }, []));
  return /*#__PURE__*/_react.default.createElement(_KeyboardView.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(Button, {
    title: t('History.SortFilterButton'),
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: _ButtonApi.ButtonType.Secondary,
    onPress: async () => {
      //TODO: Save settings
      // console.log('save history')
    }
  }, !continueEnabled && isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.gap
  }), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    showsVerticalScrollIndicator: false,
    style: {
      flexGrow: 0
    },
    data: historyItems,
    ListEmptyComponent: renderEmptyListComponent,
    renderItem: element => renderHistoryListItem(element.item)
  })))));
};
var _default = exports.default = HistoryPage;
//# sourceMappingURL=HistoryPage.js.map