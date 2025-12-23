"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PINError = exports.PINCreationValidations = void 0;
const consecutiveSeriesOfThree = new RegExp(/012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210/);
const evenNumberSeries = new RegExp('(13579)');
const oddNumberSeries = new RegExp('(02468)');
const isNumber = new RegExp('^[0-9]+$');
const crossNumberPattern = ['159753', '159357', '951357', '951753', '357159', '357951', '753159', '753951'];
let PINError = exports.PINError = /*#__PURE__*/function (PINError) {
  PINError["CrossPatternValidation"] = "CrossPatternValidation";
  PINError["OddOrEvenSequenceValidation"] = "OddOrEvenSequenceValidation";
  PINError["NoRepetitionOfTheSameNumbersValidation"] = "NoRepetitionOfTheSameNumbersValidation";
  PINError["NoRepetitionOfTheTwoSameNumbersValidation"] = "NoRepetitionOfTheTwoSameNumbersValidation";
  PINError["NoSeriesOfNumbersValidation"] = "NoSeriesOfNumbersValidation";
  PINError["PINOnlyContainDigitsValidation"] = "PINOnlyContainDigitsValidation";
  PINError["PINTooShortValidation"] = "PINTooShortValidation";
  PINError["PINTooLongValidation"] = "PINTooLongValidation";
  return PINError;
}({});
const PINCreationValidations = (PIN, PINRules) => {
  const PINValidations = [];
  if (PINRules.no_cross_pattern) {
    PINValidations.push({
      isInvalid: crossNumberPattern.includes(PIN),
      errorName: PINError.CrossPatternValidation
    });
  }
  if (PINRules.no_even_or_odd_series_of_numbers) {
    PINValidations.push({
      isInvalid: evenNumberSeries.test(PIN) || oddNumberSeries.test(PIN),
      errorName: PINError.OddOrEvenSequenceValidation
    });
  }
  if (PINRules.no_repeated_numbers) {
    let noRepeatedNumbers = new RegExp(/(\d)\1{1,}/);
    if (typeof PINRules.no_repeated_numbers === 'number') {
      noRepeatedNumbers = new RegExp(`(\\d)\\1{${PINRules.no_repeated_numbers - 1},}`);
    }
    PINValidations.push({
      isInvalid: noRepeatedNumbers.test(PIN),
      errorName: PINError.NoRepetitionOfTheSameNumbersValidation
    });
  }
  if (PINRules.no_repetition_of_the_two_same_numbers) {
    let noRepetitionOfTheTwoSameNumbers = new RegExp(/([0-9][0-9])\1{1,}/);
    if (typeof PINRules.no_repetition_of_the_two_same_numbers === 'number') {
      noRepetitionOfTheTwoSameNumbers = new RegExp(`([0-9][0-9])\\1{${PINRules.no_repetition_of_the_two_same_numbers - 1},}`);
    }
    PINValidations.push({
      isInvalid: noRepetitionOfTheTwoSameNumbers.test(PIN),
      errorName: PINError.NoRepetitionOfTheTwoSameNumbersValidation
    });
  }
  if (PINRules.no_series_of_numbers) {
    PINValidations.push({
      isInvalid: consecutiveSeriesOfThree.test(PIN),
      errorName: PINError.NoSeriesOfNumbersValidation
    });
  }
  if (PINRules.only_numbers) {
    PINValidations.push({
      isInvalid: !isNumber.test(PIN),
      errorName: PINError.PINOnlyContainDigitsValidation
    });
  }
  PINValidations.push({
    isInvalid: PIN.length < PINRules.min_length || PIN.length > PINRules.max_length,
    errorName: PIN.length <= PINRules.max_length ? PINError.PINTooShortValidation : PINError.PINTooLongValidation
  });
  return PINValidations;
};
exports.PINCreationValidations = PINCreationValidations;
//# sourceMappingURL=PINCreationValidation.js.map