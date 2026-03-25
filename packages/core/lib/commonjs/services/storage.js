"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentStorage = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PersistentStorage {
  constructor(logger) {
    // this._state = state
    this.log = logger;
  }
  static fetchValueForKey = async (key, log) => {
    try {
      const value = await _asyncStorage.default.getItem(key);
      if (!value) {
        return;
      }
      return JSON.parse(value);
    } catch (error) {
      log === null || log === void 0 || log.error(`Error fetching state for key ${key}, ${error}`);
    }
  };
  static storeValueForKey = async (key, value, log) => {
    try {
      const serializedState = JSON.stringify(value);
      return _asyncStorage.default.setItem(key, serializedState);
    } catch (error) {
      log === null || log === void 0 || log.error(`Error storing state for key ${key}, ${error}`);
      throw error;
    }
  };
  static removeValueForKey = async (key, log) => {
    try {
      return _asyncStorage.default.removeItem(key);
    } catch (error) {
      log === null || log === void 0 || log.error(`Error removing state for key ${key}, ${error}`);
      throw error;
    }
  };
  async setValueForKey(key, value) {
    if (!this._state) {
      throw new Error("State hasn't been initialized");
    }

    // @ts-expect-error Fix complicated type error
    this._state[key] = value;
    try {
      const serializedState = JSON.stringify(value);
      await _asyncStorage.default.setItem(key, serializedState);
    } catch (error) {
      var _this$log;
      (_this$log = this.log) === null || _this$log === void 0 || _this$log.error(`Error saving state for key ${key}, ${error}`);
    }
  }
  async getValueForKey(key) {
    try {
      if (!this._state) {
        await this.load();
      }

      // If state isn't readdy leave early
      if (!this._state) {
        return undefined;
      }

      // @ts-expect-error Fix complicated type error.
      const data = this._state[key];

      // don't attempt to type cast this undefined value
      if (data === undefined || data === null) {
        return undefined;
      }
      return data;
    } catch (error) {
      var _this$log2;
      (_this$log2 = this.log) === null || _this$log2 === void 0 || _this$log2.error(`Error loading state for key ${key}, ${error}`);
    }
  }
  async migrateStorageKey(oldKey, newKey) {
    try {
      const value = await _asyncStorage.default.getItem(oldKey);
      if (!value) {
        return false;
      }
      await _asyncStorage.default.setItem(newKey, value);
      await _asyncStorage.default.removeItem(oldKey);

      // @ts-expect-error Fix complicated type error
      delete this._state[oldKey];
      // @ts-expect-error Fix complicated type error
      this._state[newKey] = JSON.parse(value);
      return true;
    } catch (error) {
      var _this$log3;
      (_this$log3 = this.log) === null || _this$log3 === void 0 || _this$log3.error(`Error migrating state for key ${oldKey}, ${error}`);
    }
    return false;
  }
  async flush() {
    if (!this._state) {
      return;
    }
    try {
      const keys = Object.keys(this._state);
      for (const key of keys) {
        // @ts-expect-error Fix complicated type error
        const value = this._state[key];
        const serializedState = JSON.stringify(value);
        await _asyncStorage.default.setItem(key, serializedState);
      }
    } catch (error) {
      var _this$log4;
      (_this$log4 = this.log) === null || _this$log4 === void 0 || _this$log4.error('Error saving state', error);
    }
  }
  async load() {
    try {
      const keys = await _asyncStorage.default.getAllKeys();
      const items = await _asyncStorage.default.multiGet(keys);
      items.forEach(([key, value]) => {
        if (value === null || value === undefined) {
          return;
        }
        const parsedValue = JSON.parse(value);

        // @ts-expect-error Fix complicated type error
        this._state = {
          ...this._state,
          [key]: parsedValue
        };
      });
    } catch (error) {
      var _this$log5;
      (_this$log5 = this.log) === null || _this$log5 === void 0 || _this$log5.error('Error loading state', error);
    }
  }
}
exports.PersistentStorage = PersistentStorage;
//# sourceMappingURL=storage.js.map