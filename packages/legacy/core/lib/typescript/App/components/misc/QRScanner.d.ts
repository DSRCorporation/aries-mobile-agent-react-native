import React from 'react';
import { QrCodeScanError } from '../../types/error';
interface Props {
    handleCodeScan: (value: string) => Promise<void>;
    error?: QrCodeScanError | null;
    enableCameraOnError?: boolean;
}
declare const QRScanner: React.FC<Props>;
export default QRScanner;
//# sourceMappingURL=QRScanner.d.ts.map