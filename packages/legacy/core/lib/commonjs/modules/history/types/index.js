"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordType = exports.NotificationCardType = exports.HistorySettingsOptionStorageKey = exports.HistoryCardType = exports.AppNotificationCardType = void 0;
let HistorySettingsOptionStorageKey = exports.HistorySettingsOptionStorageKey = /*#__PURE__*/function (HistorySettingsOptionStorageKey) {
  HistorySettingsOptionStorageKey["HistorySettingsOption"] = "historySettingsOption";
  return HistorySettingsOptionStorageKey;
}({});
let HistoryCardType = exports.HistoryCardType = /*#__PURE__*/function (HistoryCardType) {
  HistoryCardType["CardAccepted"] = "CardAccepted";
  HistoryCardType["CardDeclined"] = "CardDeclined";
  HistoryCardType["CardExpired"] = "CardExpired";
  HistoryCardType["CardRevoked"] = "CardRevoked";
  HistoryCardType["InformationSent"] = "InformationSent";
  HistoryCardType["PinChanged"] = "PinChanged";
  HistoryCardType["CardUpdates"] = "CardUpdates";
  return HistoryCardType;
}({});
let RecordType = exports.RecordType = /*#__PURE__*/function (RecordType) {
  RecordType["AppNotificationRecord"] = "AppNotificationRecord";
  RecordType["NotificationRecord"] = "NotificationRecord";
  RecordType["HistoryRecord"] = "HistoryRecord";
  return RecordType;
}({});
let AppNotificationCardType = exports.AppNotificationCardType = /*#__PURE__*/function (AppNotificationCardType) {
  AppNotificationCardType["AppPinReminder"] = "AppPinReminder";
  return AppNotificationCardType;
}({});
let NotificationCardType = exports.NotificationCardType = /*#__PURE__*/function (NotificationCardType) {
  NotificationCardType["CardExpired"] = "CardExpired";
  NotificationCardType["CardRevoked"] = "CardRevoked";
  return NotificationCardType;
}({});
//# sourceMappingURL=index.js.map