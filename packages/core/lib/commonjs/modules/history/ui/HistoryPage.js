"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ButtonApi = require("../../../components/buttons/Button-api");
var _containerApi = require("../../../container-api");
var _animatedComponents = require("../../../contexts/animated-components");
var _theme = require("../../../contexts/theme");
var _testable = require("../../../utils/testable");
var _types = require("../types");
var _HistoryListItem = _interopRequireDefault(require("./components/HistoryListItem"));
var _ThemedText = require("../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const HistoryPage = () => {
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
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const actionButtonLabel = t('Global.SaveSettings');
  const actionButtonTestId = (0, _testable.testIdWithKey)('Save');
  const [Button, logger, historyManagerCurried] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_BUTTON, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY]);
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPalette.brand.primaryBackground,
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

  //UI
  const renderEmptyListComponent = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "headerTitle",
      style: style.title
    }, t('ActivityHistory.NoHistory')));
  };
  const renderHistoryListItem = item => {
    return /*#__PURE__*/_react.default.createElement(_HistoryListItem.default, {
      item: item
    });
  };
  (0, _react.useEffect)(() => {
    const getHistory = async () => {
      if (!agent) {
        logger.error(`[${HistoryPage.name}][getAllHistory]: agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
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
    getHistory().catch(e => {
      logger.error(`[${HistoryPage.name}][getAllHistory]: ${e}`);
    });
  }, [historyManagerCurried, logger, agent]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }))));
};
var _default = exports.default = HistoryPage;
//# sourceMappingURL=HistoryPage.js.map