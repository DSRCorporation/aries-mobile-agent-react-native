import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { QrCodeScanError } from '../../types/error';
import { ConnectStackParams } from '../../types/navigators';
type ConnectProps = StackScreenProps<ConnectStackParams>;
interface Props extends ConnectProps {
    showTabs?: boolean;
    defaultToConnect: boolean;
    handleCodeScan: (value: string) => Promise<void>;
    error?: QrCodeScanError | null;
    enableCameraOnError?: boolean;
}
declare const QRScanner: React.FC<Props>;
export default QRScanner;
//# sourceMappingURL=QRScanner.d.ts.map