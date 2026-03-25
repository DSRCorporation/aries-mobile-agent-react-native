export let HistoryCardType = /*#__PURE__*/function (HistoryCardType) {
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
export let RecordType = /*#__PURE__*/function (RecordType) {
  RecordType["AppNotificationRecord"] = "AppNotificationRecord";
  RecordType["NotificationRecord"] = "NotificationRecord";
  RecordType["HistoryRecord"] = "HistoryRecord";
  return RecordType;
}({});
export let AppNotificationCardType = /*#__PURE__*/function (AppNotificationCardType) {
  AppNotificationCardType["AppPinReminder"] = "AppPinReminder";
  return AppNotificationCardType;
}({});
export let NotificationCardType = /*#__PURE__*/function (NotificationCardType) {
  NotificationCardType["CardExpired"] = "CardExpired";
  NotificationCardType["CardRevoked"] = "CardRevoked";
  return NotificationCardType;
}({});
//# sourceMappingURL=index.js.map