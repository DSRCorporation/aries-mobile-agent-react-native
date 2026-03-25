export declare const ACCESS_CONTROL: {
    BIOMETRY_ANY: string;
    BIOMETRY_CURRENT_SET: string;
    DEVICE_PASSCODE: string;
    BIOMETRY_ANY_OR_DEVICE_PASSCODE: string;
    BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: string;
};
export declare const ACCESSIBLE: {
    ALWAYS: string;
    WHEN_UNLOCKED: string;
    AFTER_FIRST_UNLOCK: string;
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: string;
    WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: string;
    AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: string;
};
export declare const SECURITY_LEVEL: {
    ANY: string;
    SECURE_SOFTWARE: string;
    SECURE_HARDWARE: string;
};
export declare const STORAGE_TYPE: {
    AES_GCM_NO_AUTH: string;
    RSA: string;
};
export declare const BIOMETRY_TYPE: {
    FACE_ID: string;
    TOUCH_ID: string;
    FINGERPRINT: string;
    FACE: string;
    IRIS: string;
};
export declare const setGenericPassword: jest.Mock<any, any, any>;
export declare const getGenericPassword: jest.Mock<any, any, any>;
export declare const resetGenericPassword: jest.Mock<any, any, any>;
export declare const getSupportedBiometryType: jest.Mock<any, any, any>;
declare const _default: {
    ACCESS_CONTROL: {
        BIOMETRY_ANY: string;
        BIOMETRY_CURRENT_SET: string;
        DEVICE_PASSCODE: string;
        BIOMETRY_ANY_OR_DEVICE_PASSCODE: string;
        BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: string;
    };
    ACCESSIBLE: {
        ALWAYS: string;
        WHEN_UNLOCKED: string;
        AFTER_FIRST_UNLOCK: string;
        WHEN_UNLOCKED_THIS_DEVICE_ONLY: string;
        WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: string;
        AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: string;
    };
    SECURITY_LEVEL: {
        ANY: string;
        SECURE_SOFTWARE: string;
        SECURE_HARDWARE: string;
    };
    STORAGE_TYPE: {
        AES_GCM_NO_AUTH: string;
        RSA: string;
    };
    BIOMETRY_TYPE: {
        FACE_ID: string;
        TOUCH_ID: string;
        FINGERPRINT: string;
        FACE: string;
        IRIS: string;
    };
    setGenericPassword: jest.Mock<any, any, any>;
    getGenericPassword: jest.Mock<any, any, any>;
    resetGenericPassword: jest.Mock<any, any, any>;
    getSupportedBiometryType: jest.Mock<any, any, any>;
};
export default _default;
//# sourceMappingURL=react-native-keychain.d.ts.map