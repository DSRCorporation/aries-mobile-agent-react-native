"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walletTimeout = exports.walletId = exports.tourMargin = exports.testIdPrefix = exports.second = exports.minute = exports.minPINLength = exports.hour = exports.hitSlop = exports.hiddenFieldValue = exports.domain = exports.dateIntFormat = exports.attemptLockoutThresholdRules = exports.attemptLockoutBaseRules = exports.PINRules = exports.LocalStorageKeys = exports.KeychainServices = exports.EventTypes = void 0;
const lengthOfHiddenAttributes = 10;
const unicodeForBulletCharacter = '\u2022';
const dateIntFormat = exports.dateIntFormat = 'YYYYMMDD';
const hiddenFieldValue = exports.hiddenFieldValue = Array(lengthOfHiddenAttributes).fill(unicodeForBulletCharacter).join('');
// Used to property prefix TestIDs so they can be looked up
// by on-device automated testing systems like SauceLabs.
const testIdPrefix = exports.testIdPrefix = 'com.ariesbifold:id/';
let LocalStorageKeys = exports.LocalStorageKeys = /*#__PURE__*/function (LocalStorageKeys) {
  LocalStorageKeys["Onboarding"] = "OnboardingState";
  LocalStorageKeys["RevokedCredentials"] = "RevokedCredentials";
  LocalStorageKeys["RevokedCredentialsMessageDismissed"] = "RevokedCredentialsMessageDismissed";
  LocalStorageKeys["Preferences"] = "PreferencesState";
  LocalStorageKeys["Migration"] = "MigrationState";
  LocalStorageKeys["Tours"] = "ToursState";
  return LocalStorageKeys;
}({});
let KeychainServices = exports.KeychainServices = /*#__PURE__*/function (KeychainServices) {
  KeychainServices["Salt"] = "secret.wallet.salt";
  KeychainServices["Key"] = "secret.wallet.key";
  KeychainServices["LoginAttempt"] = "wallet.loginAttempt";
  return KeychainServices;
}({});
let EventTypes = exports.EventTypes = /*#__PURE__*/function (EventTypes) {
  EventTypes["ERROR_ADDED"] = "ErrorAdded";
  EventTypes["ERROR_REMOVED"] = "ErrorRemoved";
  EventTypes["BIOMETRY_UPDATE"] = "BiometryUpdate";
  EventTypes["BIOMETRY_ERROR"] = "BiometryError";
  return EventTypes;
}({});
const second = exports.second = 1000;
const minute = exports.minute = 60000;
const hour = exports.hour = 3600000;

// wallet timeout of 5 minutes, 0 means the wallet never locks due to inactivity
const walletTimeout = exports.walletTimeout = minute * 5;

/* lockout attempt rules: The base rules apply the lockout at a specified number of incorrect attempts,
 and the threshold rules apply the lockout penalty to each attempt after the threshold that falls on the attemptIncrement.
 (In this case the threshold rule applies to every 5th incorrect login after 20)
5 incorrect => 1 minute lockout
10 incorrect => 10 minute lockout
15 incorrect => 1 hour lockout
20, 25, 30, etc incorrect => 1 day lockout
*/
const attemptLockoutBaseRules = exports.attemptLockoutBaseRules = {
  5: minute,
  10: 10 * minute,
  15: hour
};
const attemptLockoutThresholdRules = exports.attemptLockoutThresholdRules = {
  attemptThreshold: 20,
  attemptIncrement: 5,
  attemptPenalty: 24 * hour
};
const walletId = exports.walletId = 'walletId';
const minPINLength = exports.minPINLength = 6;
const PINRules = exports.PINRules = {
  only_numbers: true,
  min_length: 6,
  max_length: 6,
  no_repeated_numbers: false,
  no_repetition_of_the_two_same_numbers: false,
  no_series_of_numbers: false,
  no_even_or_odd_series_of_numbers: false,
  no_cross_pattern: false
};
const domain = exports.domain = 'didcomm://invite';
const tourMargin = exports.tourMargin = 25;
const hitSlop = exports.hitSlop = {
  top: 44,
  bottom: 44,
  left: 44,
  right: 44
};
//# sourceMappingURL=constants.js.map