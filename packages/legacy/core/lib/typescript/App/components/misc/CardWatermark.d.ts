import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
interface CardWatermarkProps {
    watermark: string;
    height: number;
    width: number;
    style?: StyleProp<TextStyle>;
}
export declare const styles: {
    container: {
        position: "absolute";
        width: "200%";
        height: "200%";
        marginTop: number;
    };
    watermarkText: {
        opacity: number;
        marginLeft: number;
        transform: {
            rotate: string;
        }[];
        overflow: "hidden";
    };
};
declare const CardWatermark: React.FC<CardWatermarkProps>;
export default CardWatermark;
//# sourceMappingURL=CardWatermark.d.ts.map