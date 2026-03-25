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
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  }, [field, t]);
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
  return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style || styles.text,
    testID: (0, _testable.testIdWithKey)('AttributeValue')
  }, shown ? date : _constants.hiddenFieldValue);
};
var _default = exports.default = RecordDateIntField;
//# sourceMappingURL=RecordDateIntField.js.map