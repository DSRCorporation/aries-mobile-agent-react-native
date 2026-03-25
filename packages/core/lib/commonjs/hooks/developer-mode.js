"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeveloperMode = void 0;
var _react = require("react");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
const TOUCH_COUNT_TO_ENABLE_DEVELOPER_MODE = 10;
const useDeveloperMode = onDevModeTriggered => {
  const developerOptionCount = (0, _react.useRef)(0);
  const [, dispatch] = (0, _store2.useStore)();
  const incrementDeveloperMenuCounter = (0, _react.useCallback)(() => {
    if (developerOptionCount.current >= TOUCH_COUNT_TO_ENABLE_DEVELOPER_MODE) {
      developerOptionCount.current = 0;
      dispatch({
        type: _store.DispatchAction.ENABLE_DEVELOPER_MODE,
        payload: [true]
      });
      onDevModeTriggered === null || onDevModeTriggered === void 0 || onDevModeTriggered();
    } else {
      developerOptionCount.current = developerOptionCount.current + 1;
    }
  }, [dispatch, onDevModeTriggered]);
  return {
    incrementDeveloperMenuCounter
  };
};
exports.useDeveloperMode = useDeveloperMode;
//# sourceMappingURL=developer-mode.js.map