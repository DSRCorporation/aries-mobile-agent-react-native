import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { QrCodeScanError } from '../../types/error';
import { ConnectStackParams } from '../../types/navigators';
type ConnectProps = StackScreenProps<ConnectStackParams>;
interface Props extends ConnectProps {
    defaultToConnect: boolean;
    handleCodeScan: (value: string) => Promise<void>;
    error?: QrCodeScanError | null;
    enableCameraOnError?: boolean;
}
declare const NewQRView: React.FC<Props>;
export default NewQRView;
//# sourceMappingURL=NewQRView.d.ts.map