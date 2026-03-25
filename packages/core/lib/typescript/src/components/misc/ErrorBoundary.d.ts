import React, { ReactNode } from 'react';
import { AbstractBifoldLogger } from '../../services/AbstractBifoldLogger';
interface ErrorBoundaryWrapperProps {
    children: ReactNode;
    logger: AbstractBifoldLogger;
}
declare const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps>;
export default ErrorBoundaryWrapper;
//# sourceMappingURL=ErrorBoundary.d.ts.map