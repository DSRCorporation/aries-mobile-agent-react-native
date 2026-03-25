"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordType = exports.NotificationCardType = exports.HistoryCardType = exports.AppNotificationCardType = void 0;
let HistoryCardType = exports.HistoryCardType = /*#__PURE__*/function (HistoryCardType) {
  HistoryCardType["CardAccepted"] = "CardAccepted";
  HistoryCardType["CardDeclined"] = "CardDeclined";
  HistoryCardType["CardExpired"] = "CardExpired";
  // TODO: log this type of event
  HistoryCardType["CardRemoved"] = "CardRemoved";
  HistoryCardType["CardRevoked"] = "CardRevoked";
  // TODO: log this type of event
  HistoryCardType["CardUpdates"] = "CardUpdates";
  // TODO: log this type of event
  HistoryCardType["PinChanged"] = "PinChanged";
  HistoryCardType["InformationSent"] = "InformationSent";
  HistoryCardType["InformationNotSent"] = "InformationNotSent";
  HistoryCardType["Connection"] = "Connection";
  HistoryCardType["ConnectionRemoved"] = "ConnectionRemoved";
  HistoryCardType["ActivateBiometry"] = "ActivateBiometry";
  HistoryCardType["DeactivateBiometry"] = "DeactivateBiometry";
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