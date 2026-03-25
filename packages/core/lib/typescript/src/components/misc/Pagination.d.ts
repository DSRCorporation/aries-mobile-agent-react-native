import React from 'react';
import { Animated } from 'react-native';
interface IPaginationStyleSheet {
    pagerContainer: Record<string, any>;
    pagerDot: Record<string, any>;
    pagerDotActive: Record<string, any>;
    pagerDotInactive: Record<string, any>;
    pagerPosition: Record<string, any>;
    pagerNavigationButton: Record<string, any>;
}
interface IPaginationProps {
    pages: Array<Element>;
    activeIndex: number;
    scrollX: Animated.Value;
    next: () => void;
    nextButtonText?: string;
    previous: () => void;
    previousButtonText?: string;
    style: IPaginationStyleSheet;
}
export declare const Pagination: React.FC<IPaginationProps>;
export {};
//# sourceMappingURL=Pagination.d.ts.map