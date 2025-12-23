"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _moment = _interopRequireDefault(require("moment"));
var _index = require("../../../localization/index");
var _logger = require("../../../services/logger");
var _queue = _interopRequireDefault(require("../services/queue.service"));
var _types = require("../types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

class HistoryManager {
  logger = new _logger.ConsoleLogger();
  constructor(agent) {
    this.agent = agent;
    if (!agent) {
      this.error(`[${HistoryManager.name}]: History module loaded with undefined agent!!`);
      return;
    }
    this.trace(`[${HistoryManager.name}]: History module loaded!`);
  }
  async addGenericRecord(customRecord, type) {
    try {
      if (!this.agent) {
        var _QueeManager$getInsta;
        this.error(`[${HistoryManager.name}]: Add generic record: Agent not set yet adding generic record into quee`);
        (_QueeManager$getInsta = _queue.default.getInstance()) === null || _QueeManager$getInsta === void 0 || _QueeManager$getInsta.addQuee({
          customRecord,
          type
        });
        return;
      }
      const tags = {
        type: type
      };
      const storedContent = customRecord.content;
      this.trace(`[${HistoryManager.name}]: Adding history record:${JSON.stringify(storedContent)}`);
      this.trace(`[${HistoryManager.name}]: >> Tags:${JSON.stringify(tags)}`);
      await this.agent.genericRecords.save({
        content: storedContent,
        tags: tags
      });
    } catch (e) {
      this.error(`[${HistoryManager.name}]: Add generic record: ${e}`);
      throw new Error(`${e}`);
    }
  }
  error(message) {
    this.logger.error(message);
  }
  trace(message) {
    this.logger.trace(message);
  }
  async getGenericRecordsbyQuery(query) {
    try {
      if (!this.agent) {
        this.error(`[${HistoryManager.name}]: Find generic record by query: Agent not set`);
        throw new Error(`Agent not set `);
      }
      this.trace(`[${HistoryManager.name}]: Searching saved history by query:${JSON.stringify(query)}`);
      const retrievedRecords = [];
      const savedRecords = await this.agent.genericRecords.findAllByQuery(query);
      if (savedRecords) {
        savedRecords.forEach(element => {
          const tags = element.getTags();
          switch (tags.type) {
            case _types.RecordType.AppNotificationRecord:
              {
                const appNotificationRecord = element.content;
                const appNotification = {
                  id: element.id,
                  createdAt: element.createdAt,
                  type: appNotificationRecord.type
                };
                retrievedRecords.push({
                  content: appNotification,
                  tags
                });
                break;
              }
            case _types.RecordType.NotificationRecord:
              {
                const notificationRecord = element.content;
                const notification = {
                  message: notificationRecord.message,
                  credentialId: notificationRecord.credentialId,
                  type: notificationRecord.type,
                  id: element.id,
                  createdAt: element.createdAt,
                  isNotificationRemoved: notificationRecord.isNotificationRemoved
                };
                retrievedRecords.push({
                  content: notification,
                  tags
                });
                break;
              }
            case _types.RecordType.HistoryRecord:
              {
                const historyRecord = element.content;
                const history = {
                  message: historyRecord.message,
                  id: element.id,
                  createdAt: element.createdAt,
                  type: historyRecord.type,
                  correspondenceId: historyRecord.correspondenceId,
                  correspondenceName: historyRecord.correspondenceName
                };
                retrievedRecords.push({
                  content: history,
                  tags
                });
                break;
              }
            default:
              {
                break;
              }
          }
        });
      }
      this.trace(`[${HistoryManager.name}]: Found saved history length:${retrievedRecords.length}`);
      return retrievedRecords;
    } catch (e) {
      this.error(`[${HistoryManager.name}]: Find generic record by query: ${e}`);
      throw new Error(`${e}`);
    }
  }

  // PUBLIC
  async saveHistory(recordData) {
    this.trace(`[${HistoryManager.name}]: Saving history record:${JSON.stringify(recordData)}`);
    try {
      const historySettingsOption = await _asyncStorage.default.getItem(_types.HistorySettingsOptionStorageKey.HistorySettingsOption);
      // Save History when history settigs option is not 'Never'
      if (!(historySettingsOption === 'Never')) {
        await this.addGenericRecord({
          content: recordData
        }, _types.RecordType.HistoryRecord);
      }
    } catch (e) {
      this.error(`[${HistoryManager.name}]: Saving history error: ${e}`);
      throw new Error(`${e}`);
    }
  }
  async getHistoryItems(query) {
    return this.getGenericRecordsbyQuery(query);
  }
  async findGenericRecordById(id) {
    try {
      if (!this.agent) {
        this.error(`[${HistoryManager.name}]: Find generic record by id: Agent not set`);
        throw new Error(`Agent not set `);
      }
      return await this.agent.genericRecords.findById(id);
    } catch (e) {
      this.error(`[${HistoryManager.name}]: Find generic record by id: ${e}`);
      throw new Error(`${e}`);
    }
  }
  async removeGenericRecord(genericRecord) {
    try {
      if (!this.agent) {
        this.error(`[${HistoryManager.name}]: Remove generic record: Agent not set`);
        throw new Error(`Agent not set `);
      }
      return await this.agent.genericRecords.delete(genericRecord);
    } catch (e) {
      this.error(`[${HistoryManager.name}]: Remove generic record: ${e}`);
      throw new Error(`${e}`);
    }
  }
  async handleStoreHistorySettings(selectedValue) {
    if (!selectedValue) {
      throw new Error('No option selected');
    }
    await _asyncStorage.default.setItem(_types.HistorySettingsOptionStorageKey.HistorySettingsOption, selectedValue.id);

    //TODO: Delete old history
    /*
    if (selectedValue.id !== 'Always') {
      // Filter history record data and get the ones that needs to be deleted.
      const selectedHistoryRecords = historyItems && filterDataByGivenDate(historyItems, selectedValue.date)
      // Remove history past the selected date.
      if (selectedHistoryRecords) {
        for await (const record of selectedHistoryRecords) {
          const recordHistory = record.content as HistoryRecord
          if (!recordHistory || !recordHistory.id) {
            return
          }
          const deleteRecord = await findGenericRecordById(recordHistory.id)
          if (!deleteRecord) {
            return
          }
          await removeGenericRecord(deleteRecord)
        }
      }
    }
    */
  }
  async getStoredHistorySettingsOption() {
    return await _asyncStorage.default.getItem(_types.HistorySettingsOptionStorageKey.HistorySettingsOption);
  }
  getHistorySettingsOptionList() {
    const oneMonth = (0, _moment.default)().subtract(1, 'month');
    const sixMonth = (0, _moment.default)().subtract(6, 'month');
    const oneYear = (0, _moment.default)().subtract(1, 'year');
    return [{
      key: 0,
      id: '1 month',
      date: oneMonth,
      value: _index.i18n.t('ActivityHistory.DeleteActivityAfter.1month')
    }, {
      key: 1,
      id: '6 month',
      date: sixMonth,
      value: _index.i18n.t('ActivityHistory.DeleteActivityAfter.6month')
    }, {
      key: 2,
      id: '1 year',
      date: oneYear,
      value: _index.i18n.t('ActivityHistory.DeleteActivityAfter.1year')
    }, {
      key: 3,
      id: 'Always',
      value: _index.i18n.t('ActivityHistory.DeleteActivityAfter.Always')
    }];
  }
}
exports.default = HistoryManager;
//# sourceMappingURL=historyManager.js.map