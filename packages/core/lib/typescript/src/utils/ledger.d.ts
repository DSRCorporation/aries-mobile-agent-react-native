import { IndyVdrPoolConfig } from '@credo-ts/indy-vdr';
export declare enum IndyLedger {
    SOVRIN_BUILDER_NET = "sbn",
    SOVRIN_STAGING_NET = "ssn",
    SOVERIN_MAIN_NET = "smn",
    LOCAL_VON_NETWORK = "vn",
    LINUX_LOCAL_VON_NETWORK = "lln",
    BCOVRIN_DEV = "bcd",
    BCOVRIN_TEST = "bct",
    BCOVRIN = "bcp",
    GREENLIGHT_DEV_LEDGER = "gld",
    INDICO_MAINNET = "imn",
    INDICO_DEMONET = "idn",
    INDICO_TESTNET = "itn",
    CANDY_DEV_NETWORK = "cdn",
    CANDY_TEST_NETWORK = "ctn",
    CANDY_PRODUCTION_NETWORK = "cpn"
}
export interface IndyLedgerConfig {
    ledgerId: IndyLedger;
    isProduction: boolean;
    doNotConnectOnStartup?: true;
}
export interface IndyLedgerJSON extends IndyVdrPoolConfig {
    id: string;
}
export type IndyLedgersRecord = Record<IndyLedger, {
    name: string;
    indyNamespace: string;
    genesisUrl: string;
}>;
export interface IndyLedgerFileSystem {
    /**
     * Writes data to a file at the specified file path.
     *
     * @param {string} filePath - The path to the file where data should be written.
     * @param {*} {string} data - The data to write to the file.
     * @returns {*} {void}
     */
    writeFile: (filePath: string, data: string) => void;
    /**
     * Reads and returns the content of a file at the specified file path.
     *
     * @param {string} filePath - The path to the file to read.
     * @returns {*} {string} - The content of the file as a string.
     */
    readFile: (filePath: string) => string;
    /**
     * Checks if a file exists at the specified file path.
     *
     * @param {string} filePath - The path to the file to check.
     * @returns {*} {boolean} - True if the file exists, false otherwise.
     */
    fileExists: (filePath: string) => boolean;
    /**
     * Resolves and returns the absolute path for a given file path.
     *
     * @example ./ledgers.json -> /Users/username/project/ledgers.json
     *
     * @param {string} filePath - The file path to resolve.
     * @returns {*} {string} - The resolved absolute file path.
     */
    pathResolve: (filePath: string) => string;
}
/**
 * Fetches the content from a given URL and returns it as a Promise.
 *
 * @throws {Error} - Throws an error if the fetch operation fails.
 * @template T - The type of content expected from the URL.
 * @param {string} url - The URL to fetch content from.
 * @returns {*} {Promise<T>} - A promise that resolves to the content fetched from the URL
 */
export declare function _fetchUrlContent<T>(url: string): Promise<T>;
/**
 * Fetches and returns a list of Indy ledgers based on the provided configurations.
 *
 * @throws {Error} - Throws an error if a ledgerConfig is not found in the IndyLedgersRecord.
 * @param {IndyLedgerConfig[]} indyLedgerConfigs - The list of supported Indy ledger configurations.
 * @returns {*} {Promise<IndyLedgerJSON[]>} - A promise that resolves to an array of ledgers.
 */
export declare function getIndyLedgers(indyLedgerConfigs: IndyLedgerConfig[]): Promise<IndyLedgerJSON[]>;
/**
 * Writes the provided Indy ledgers to a JSON file at the specified file path.
 *
 * @throws {Error} - Throws an error if writing to the file fails or if the file path is invalid.
 * @param {IndyLedgerFileSystem} fileSystem - The file system interface to use for writing the file.
 * @param {string} filePath - The path to the JSON file where the ledgers should be written.
 * @param {IndyLedgerJSON[]} ledgers - The array of Indy ledgers to write to the file.
 * @returns {*} {void}
 */
export declare function writeIndyLedgersToFile(fileSystem: IndyLedgerFileSystem, filePath: string, ledgers: IndyLedgerJSON[]): void;
/**
 * Reads and parses Indy ledgers from a JSON file at the specified file path.
 *
 * @throws {Error} - Throws an error if reading from the file fails, if the file path is invalid, or if parsing fails.
 * @param {IndyLedgerFileSystem} fileSystem - The file system interface to use for reading the file.
 * @param {string} filePath - The path to the JSON file to read the ledgers from.
 * @returns {*} {IndyLedgerJSON[]} - An array of Indy ledgers read from the file.
 */
export declare function readIndyLedgersFromFile(fileSystem: IndyLedgerFileSystem, filePath: string): IndyLedgerJSON[];
//# sourceMappingURL=ledger.d.ts.map