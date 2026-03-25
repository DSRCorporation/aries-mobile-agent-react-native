import { PINValidationRules } from '../types/security';
export declare enum PINError {
    CrossPatternValidation = "CrossPatternValidation",
    OddOrEvenSequenceValidation = "OddOrEvenSequenceValidation",
    NoRepetitionOfTheSameNumbersValidation = "NoRepetitionOfTheSameNumbersValidation",
    MaxAdjacentNumberRepetitionValidation = "MaxAdjacentNumberRepetitionValidation",
    NoRepetitionOfTheTwoSameNumbersValidation = "NoRepetitionOfTheTwoSameNumbersValidation",
    NoSeriesOfNumbersValidation = "NoSeriesOfNumbersValidation",
    PINOnlyContainDigitsValidation = "PINOnlyContainDigitsValidation",
    PINTooShortValidation = "PINTooShortValidation",
    PINTooLongValidation = "PINTooLongValidation",
    PINIsExpectedLength = "PINExpectedLengthValidation",
    PINCommonlyUsed = "PINCommonlyUsed"
}
export interface PINValidationsType {
    isInvalid: boolean;
    errorName: PINError;
    errorTextAddition?: Record<string, string>;
}
export declare const createPINValidations: (PIN: string, PINRules: PINValidationRules) => PINValidationsType[];
//# sourceMappingURL=PINValidation.d.ts.map