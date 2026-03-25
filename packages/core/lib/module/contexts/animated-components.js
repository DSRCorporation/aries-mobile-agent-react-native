import { createContext, useContext } from 'react';
import { animatedComponents } from '../animated-components';
export const AnimatedComponentsContext = /*#__PURE__*/createContext(animatedComponents);
export const AnimatedComponentsProvider = AnimatedComponentsContext.Provider;
export const useAnimatedComponents = () => useContext(AnimatedComponentsContext);
//# sourceMappingURL=animated-components.js.map