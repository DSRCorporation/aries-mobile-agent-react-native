import { BifoldLogger } from './logger';
export declare class PersistentStorage<T> {
    private _state?;
    private log?;
    constructor(logger: any);
    static fetchValueForKey: <T_1>(key: string, log?: BifoldLogger) => Promise<T_1 | undefined>;
    static storeValueForKey: <T_1>(key: string, value: T_1, log?: BifoldLogger) => Promise<void>;
    static removeValueForKey: (key: string, log?: BifoldLogger) => Promise<void>;
    setValueForKey(key: string, value: Partial<T>): Promise<void>;
    getValueForKey(key: string): Promise<Partial<T> | undefined>;
    migrateStorageKey(oldKey: string, newKey: string): Promise<boolean>;
    flush(): Promise<void>;
    load(): Promise<void>;
}
//# sourceMappingURL=storage.d.ts.map