import React, { PropsWithChildren } from 'react';
import { AppStateStatus } from 'react-native';
export declare const AutoLockTime: {
    readonly OneMinute: 1;
    readonly ThreeMinutes: 3;
    readonly FiveMinutes: 5;
    readonly Never: 0;
};
export interface ActivityContext {
    appStateStatus: AppStateStatus;
}
export declare const ActivityContext: React.Context<ActivityContext>;
export declare const ActivityProvider: React.FC<PropsWithChildren>;
export declare const useActivity: () => ActivityContext;
//# sourceMappingURL=activity.d.ts.map