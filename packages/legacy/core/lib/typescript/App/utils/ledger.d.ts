export declare const canConnectToLedgerNode: (node: {
    host: string;
    port: number;
}) => Promise<boolean>;
export declare const fetchLedgerNodes: (indyNamespace?: string) => Array<{
    host: string;
    port: number;
}>;
//# sourceMappingURL=ledger.d.ts.map