"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenGuardOptions = exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeScreenguard = _interopRequireDefault(require("react-native-screenguard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const screenGuardOptions = exports.screenGuardOptions = {
  timeAfterResume: 500,
  // milliseconds
  backgroundColor: '#000000' // black
};

/**
 * Prevents screenshots when component is mounted. When unmounted, allows them again
 *
 * @param {boolean} [active=true] - If `false`, hook does nothing
 * @remarks
 * - If `active` param is `true`, it prevents screenshots when the
 * component is mounted
 * - On unmount, or when `active` is changed to false, it restores
 * the ability to take screenshots
 * - Should be used at the screen level only
 *
 * @example
 * ```tsx
 * import usePreventScreenCapture from './hooks/screen-capture';
 *
 * const MyScreen = () => {
 *   usePreventScreenCapture();
 *   return <View><Text>Secure Content</Text></View>;
 * };
 * ```
 *
 * @returns {void}
 */
const usePreventScreenCapture = (active = true) => {
  (0, _react.useEffect)(() => {
    if (!active) return;
    if (_reactNative.Platform.OS === 'android') {
      // on Android, plain `register` will trigger AppState to
      // change momentarily, which can have side effects.
      // `registerWithoutEffect` prevents that
      _reactNativeScreenguard.default.registerWithoutEffect();
    } else {
      _reactNativeScreenguard.default.register(screenGuardOptions);
    }
    return () => {
      _reactNativeScreenguard.default.unregister();
    };
  }, [active]);
};
var _default = exports.default = usePreventScreenCapture;
//# sourceMappingURL=screen-capture.js.map