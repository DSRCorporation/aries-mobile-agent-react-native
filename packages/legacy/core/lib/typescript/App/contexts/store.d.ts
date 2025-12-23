import React, { Dispatch } from 'react';
import { State } from '../types/state';
import { ReducerAction } from './reducers/store';
type Reducer = <S extends State>(state: S, action: ReducerAction<any>) => S;
interface StoreProviderProps extends React.PropsWithChildren {
    initialState?: State;
    reducer?: Reducer;
}
export declare const defaultState: State;
export declare const StoreContext: React.Context<[State, React.Dispatch<ReducerAction<any>>]>;
export declare const mergeReducers: (a: Reducer, b: Reducer) => Reducer;
export declare const defaultReducer: <S extends State>(state: S, action: ReducerAction<import("./reducers/store").DispatchAction>) => S;
export declare const StoreProvider: React.FC<StoreProviderProps>;
export declare const useStore: <S extends State>() => [S, React.Dispatch<ReducerAction<any>>];
export {};
//# sourceMappingURL=store.d.ts.map