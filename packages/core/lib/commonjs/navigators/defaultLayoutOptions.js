"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultScreenLayoutOptions = void 0;
var _navigators = require("../types/navigators");
const DefaultScreenLayoutOptions = exports.DefaultScreenLayoutOptions = {
  [_navigators.Screens.Terms]: {
    customEdges: ['top', 'left', 'right']
  },
  [_navigators.Screens.OpenIDCredentialDetails]: {
    customEdges: ['left', 'right']
  },
  [_navigators.Screens.OpenIDCredentialOffer]: {
    customEdges: ['left', 'right', 'bottom']
  },
  [_navigators.Screens.OpenIDProofPresentation]: {
    customEdges: ['left', 'right', 'bottom']
  }
  //TODO: Add more screens here
};
//# sourceMappingURL=defaultLayoutOptions.js.map