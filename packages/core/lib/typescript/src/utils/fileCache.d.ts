import { AxiosInstance } from 'axios';
import { BifoldLogger } from '../services/logger';
export type CacheDataFile = {
    fileEtag: string;
    updatedAt: Date;
};
export declare class FileCache {
    protected axiosInstance: AxiosInstance;
    protected _fileEtag?: string;
    protected log?: BifoldLogger;
    private workspace;
    private cacheFileName;
    constructor(indexFileBaseUrl: string, workspace: string, cacheDataFileName: string, log?: BifoldLogger);
    set fileEtag(value: string);
    get fileEtag(): string;
    protected loadCacheData: () => Promise<CacheDataFile | undefined>;
    protected saveCacheData: (cacheData: CacheDataFile) => Promise<boolean>;
    protected saveFileToLocalStorage: (fileName: string, data: string) => Promise<boolean>;
    protected fileStoragePath: () => string;
    protected createWorkingDirectoryIfNotExists: () => Promise<boolean>;
    protected loadFileFromLocalStorage: (fileName: string) => Promise<string | undefined>;
    protected checkFileExists: (fileName: string) => Promise<boolean>;
    protected stripWeakEtag: (etag: string) => string;
    protected compareWeakEtags: (etag1: string, etag2: string) => boolean;
}
//# sourceMappingURL=fileCache.d.ts.map