import React from 'react';
import { QrCodeScanError } from '../../types/error';
interface Props {
    handleCodeScan: (value: string) => Promise<void>;
    error?: QrCodeScanError | null;
    enableCameraOnError?: boolean;
    torchActive?: boolean;
}
declare const ScanCamera: React.FC<Props>;
export default ScanCamera;
//# sourceMappingURL=ScanCamera.d.ts.map