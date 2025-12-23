/// <reference types="jest" />
declare const useNavigation: () => {
    __timestamp: [number, number];
    navigate: jest.Mock<any, any, any>;
    replace: jest.Mock<any, any, any>;
    setOptions: jest.Mock<any, any, any>;
    getParent: () => {
        navigate: jest.Mock<any, any, any>;
        dispatch: jest.Mock<any, any, any>;
        replace: jest.Mock<any, any, any>;
    };
    getState: jest.Mock<{
        index: jest.Mock<any, any, any>;
    }, [], any>;
    goBack: jest.Mock<any, any, any>;
    pop: jest.Mock<any, any, any>;
    reset: jest.Mock<any, any, any>;
    isFocused: () => boolean;
    dispatch: jest.Mock<any, any, any>;
};
declare const useIsFocused: () => boolean;
declare const CommonActions: {
    navigate: jest.Mock<any, any, any>;
    reset: jest.Mock<any, any, any>;
    goBack: jest.Mock<any, any, any>;
};
declare const useFocusEffect: jest.Mock<any, any, any>;
declare const createNavigatorFactory: jest.Mock<any, any, any>;
export { useNavigation, useIsFocused, useFocusEffect, createNavigatorFactory, CommonActions };
//# sourceMappingURL=native.d.ts.map