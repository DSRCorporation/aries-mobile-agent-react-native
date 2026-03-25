import React from 'react';
export interface BannerMessage {
    id: string;
    title: string;
    type: 'error' | 'warning' | 'info' | 'success';
    variant: 'summary' | 'detail';
    dismissible?: boolean;
}
export interface BannerSectionProps extends BannerMessage {
    expanded?: boolean;
    onDismiss?: () => void;
    onToggle?: () => void;
}
export declare const Banner: React.FC;
export declare const BannerSection: React.FC<BannerSectionProps>;
//# sourceMappingURL=Banner.d.ts.map