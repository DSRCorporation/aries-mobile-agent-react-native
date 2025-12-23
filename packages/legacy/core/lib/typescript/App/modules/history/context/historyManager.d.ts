/**
 *  USAGE
 *
        const { agent } = useAgent()

        //Log history
        const historyManager = container.resolve(TOKENS.FN_LOAD_HISTORY)(agent)
         const recordData: HistoryRecord = {
           type: HistoryCardType.CardAccepted,
           message: `Wallet Initialized at ${new Date()}`,
           createdAt: new Date(),
           correspondenceId: 'Some data',
           correspondenceName: 'Some name',
         }
        await historyManager.saveHistory(recordData)
        
        const allRecords = await historyManager.getHistoryItems({ type: RecordType.HistoryRecord })
        console.log("$$:", JSON.stringify(allRecords))
 *
 */
import { Agent } from '@credo-ts/core';
import { GenericRecord } from '@credo-ts/core/build/modules/generic-records/repository/GenericRecord';
import { CustomRecord, HistoryBlockSelection, HistoryQuery, HistoryRecord, IHistoryManager } from '../types';
export default class HistoryManager implements IHistoryManager {
    private agent;
    private logger;
    constructor(agent: Agent<any> | null);
    private addGenericRecord;
    private error;
    private trace;
    private getGenericRecordsbyQuery;
    saveHistory(recordData: HistoryRecord): Promise<void>;
    getHistoryItems(query: HistoryQuery): Promise<CustomRecord[]>;
    findGenericRecordById(id: string): Promise<GenericRecord | null>;
    removeGenericRecord(genericRecord: GenericRecord): Promise<void>;
    handleStoreHistorySettings(selectedValue: HistoryBlockSelection | undefined): Promise<void>;
    getStoredHistorySettingsOption(): Promise<string | null>;
    getHistorySettingsOptionList(): Array<HistoryBlockSelection>;
}
//# sourceMappingURL=historyManager.d.ts.map