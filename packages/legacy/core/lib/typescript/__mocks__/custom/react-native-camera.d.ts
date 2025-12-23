/// <reference types="jest" />
import React from 'react';
declare class Camera extends React.Component {
    static Constants: {
        device: {};
        torch: {
            on: string;
            off: string;
            auto: string;
        };
        isActive: boolean;
        codeScanner: {};
    };
    render(): null;
}
declare const useCameraDevice: jest.Mock<any, any, any>;
declare const useCodeScanner: jest.Mock<any, any, any>;
declare const useCameraFormat: jest.Mock<any, any, any>;
export { Camera, useCameraDevice, useCodeScanner, useCameraFormat };
//# sourceMappingURL=react-native-camera.d.ts.map