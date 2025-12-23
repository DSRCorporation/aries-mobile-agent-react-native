"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RecordDateIntField = ({
  field,
  shown,
  style
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const [date, setDate] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    const dateint = field.value;
    if (!dateint) {
      setDate('');
      return;
    }
    if (dateint.length === _constants.dateIntFormat.length) {
      const year = dateint.substring(0, 4);
      const month = dateint.substring(4, 6);
      const day = dateint.substring(6, 8);
      //NOTE: JavaScript counts months from 0 to 11: January = 0, December = 11.
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(date.getDate())) {
        setDate((0, _helpers.formatTime)(date, {
          shortMonth: true
        }));
        return;
      }
    }
    setDate(t('Record.InvalidDate') + dateint);
  }, [field]);
  const styles = _reactNative.StyleSheet.create({
    text: {
      ...ListItems.recordAttributeText
    },
    image: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 10
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style || styles.text,
    testID: (0, _testable.testIdWithKey)('AttributeValue')
  }, shown ? date : _constants.hiddenFieldValue);
};
var _default = exports.default = RecordDateIntField;
//# sourceMappingURL=RecordDateIntField.js.map