import { Screens } from '../types/navigators';
export const DefaultScreenLayoutOptions = {
  [Screens.Terms]: {
    customEdges: ['top', 'left', 'right']
  },
  [Screens.OpenIDCredentialDetails]: {
    customEdges: ['left', 'right']
  },
  [Screens.OpenIDCredentialOffer]: {
    customEdges: ['left', 'right', 'bottom']
  },
  [Screens.OpenIDProofPresentation]: {
    safeArea: true,
    customEdges: ['left', 'right', 'bottom', 'top']
  }
  //TODO: Add more screens here
};
//# sourceMappingURL=defaultLayoutOptions.js.map