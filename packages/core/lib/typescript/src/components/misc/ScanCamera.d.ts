import React from 'react';
import { QrCodeScanError } from '../../types/error';
export interface ScanCameraProps {
    handleCodeScan: (value: string) => Promise<void>;
    error?: QrCodeScanError | null;
    enableCameraOnError?: boolean;
    torchActive?: boolean;
}
declare const ScanCamera: React.FC<ScanCameraProps>;
export default ScanCamera;
//# sourceMappingURL=ScanCamera.d.ts.map