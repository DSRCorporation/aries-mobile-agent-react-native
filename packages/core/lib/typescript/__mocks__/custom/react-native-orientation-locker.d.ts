declare const Orientation: {
    initialOrientation: string;
    lockToPortrait: jest.Mock<any, any, any>;
    lockToLandscape: jest.Mock<any, any, any>;
    unlockAllOrientations: jest.Mock<any, any, any>;
    addOrientationListener: jest.Mock<any, any, any>;
    removeOrientationListener: jest.Mock<any, any, any>;
};
declare const useOrientationChange: jest.Mock<any, any, any>;
declare enum OrientationType {
    PORTRAIT = "PORTRAIT",
    PORTRAIT_UPSIDEDOWN = "PORTRAIT-UPSIDEDOWN",
    LANDSCAPE_LEFT = "LANDSCAPE-LEFT",
    LANDSCAPE_RIGHT = "LANDSCAPE-RIGHT"
}
export default Orientation;
export { Orientation, useOrientationChange, OrientationType };
//# sourceMappingURL=react-native-orientation-locker.d.ts.map