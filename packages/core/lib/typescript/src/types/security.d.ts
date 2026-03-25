export interface WalletSecret {
    id: string;
    key: string;
    salt: string;
}
export declare enum AuthLevel {
    BiometricsFallbackPIN = "BiometricsFallbackPIN",
    BiometricsAndPIN = "BiometricsAndPIN",
    BiometricsOnly = "BiometricsOnly"
}
export interface PINValidationRules {
    only_numbers: boolean;
    min_length: number;
    max_length: number;
    use_nist_requirements: boolean;
    no_repeated_numbers: number;
    no_repetition_of_the_two_same_numbers: boolean | number;
    no_series_of_numbers: boolean;
    no_even_or_odd_series_of_numbers: boolean;
    no_cross_pattern: boolean;
    most_used_pins: boolean;
    unacceptable_pin_list: Array<string>;
}
export interface PINSecurityParams {
    rules: PINValidationRules;
    displayHelper: boolean;
}
//# sourceMappingURL=security.d.ts.map