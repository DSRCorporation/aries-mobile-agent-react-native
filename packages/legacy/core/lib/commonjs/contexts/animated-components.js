"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedComponents = exports.AnimatedComponentsProvider = exports.AnimatedComponentsContext = void 0;
var _react = require("react");
var _animatedComponents = require("../animated-components");
const AnimatedComponentsContext = exports.AnimatedComponentsContext = /*#__PURE__*/(0, _react.createContext)(_animatedComponents.animatedComponents);
const AnimatedComponentsProvider = exports.AnimatedComponentsProvider = AnimatedComponentsContext.Provider;
const useAnimatedComponents = () => (0, _react.useContext)(AnimatedComponentsContext);
exports.useAnimatedComponents = useAnimatedComponents;
//# sourceMappingURL=animated-components.js.map