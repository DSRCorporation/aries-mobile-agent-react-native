import { Field } from '@bifold/oca/build/legacy';
import { OpenId4VciResolvedCredentialOffer } from '@credo-ts/openid4vc';
/**
 * Converts a camelCase string to a sentence format (first letter capitalized, rest in lower case).
 * i.e. sanitizeString("helloWorld")  // returns: 'Hello world'
 */
export declare function sanitizeString(str: string): string;
export declare function getHostNameFromUrl(url: string): string;
export declare const buildFieldsFromOpenIDTemplate: (data: {
    [key: string]: unknown;
}) => Array<Field>;
export declare function formatDate(input: string | Date): string;
/**
 * Mostly used for mdoc crednetials
 */
export declare function detectImageMimeType(data: Uint8Array): 'image/jpeg' | 'image/jp2' | null;
/**
 * very simple matcher for `yyyy-mm-dd`
 */
export declare function isDateString(value: string): false | RegExpMatchArray | null;
export declare function isW3CProofRequest(type: string): boolean;
export declare function isSdJwtProofRequest(type: string): boolean;
export declare function getCredentialConfigurationIds(resolved: OpenId4VciResolvedCredentialOffer): string[];
//# sourceMappingURL=utils.d.ts.map