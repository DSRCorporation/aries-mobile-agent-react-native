import React from 'react';
export declare enum MaskType {
    QR_CODE = "qr-code",
    OVAL = "oval",
    RECTANGLE = "rectangle",
    ID_CARD = "id-card",
    CUSTOM = "custom"
}
interface ISVGOverlay {
    maskType?: MaskType;
    customPath?: string;
    strokeColor?: string;
    overlayColor?: string;
    overlayOpacity?: number;
}
declare const SVGOverlay: React.FC<ISVGOverlay>;
export default SVGOverlay;
//# sourceMappingURL=SVGOverlay.d.ts.map