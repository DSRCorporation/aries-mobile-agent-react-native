import { CustomRecord, RecordType } from '../types';
interface HistoryQueeItem {
    customRecord: CustomRecord;
    type: RecordType;
}
export default class QueeManager {
    private recordsQuee;
    constructor();
    addQuee(item: HistoryQueeItem): void;
    getLast(): HistoryQueeItem | undefined;
    private static myInstance;
    static getInstance(): QueeManager | null;
}
export {};
//# sourceMappingURL=queue.service.d.ts.map