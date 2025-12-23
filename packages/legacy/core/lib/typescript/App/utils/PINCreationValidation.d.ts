import { PINValidationRules } from '../types/security';
export declare enum PINError {
    CrossPatternValidation = "CrossPatternValidation",
    OddOrEvenSequenceValidation = "OddOrEvenSequenceValidation",
    NoRepetitionOfTheSameNumbersValidation = "NoRepetitionOfTheSameNumbersValidation",
    NoRepetitionOfTheTwoSameNumbersValidation = "NoRepetitionOfTheTwoSameNumbersValidation",
    NoSeriesOfNumbersValidation = "NoSeriesOfNumbersValidation",
    PINOnlyContainDigitsValidation = "PINOnlyContainDigitsValidation",
    PINTooShortValidation = "PINTooShortValidation",
    PINTooLongValidation = "PINTooLongValidation"
}
export interface PINValidationsType {
    isInvalid: boolean;
    errorName: PINError;
}
export declare const PINCreationValidations: (PIN: string, PINRules: PINValidationRules) => PINValidationsType[];
//# sourceMappingURL=PINCreationValidation.d.ts.map