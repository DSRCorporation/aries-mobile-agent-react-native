export declare const screenGuardOptions: {
    timeAfterResume: number;
    backgroundColor: string;
};
/**
 * Prevents screenshots when component is mounted. When unmounted, allows them again
 *
 * @param {boolean} [active=true] - If `false`, hook does nothing
 * @remarks
 * - If `active` param is `true`, it prevents screenshots when the
 * component is mounted
 * - On unmount, or when `active` is changed to false, it restores
 * the ability to take screenshots
 * - Should be used at the screen level only
 *
 * @example
 * ```tsx
 * import usePreventScreenCapture from './hooks/screen-capture';
 *
 * const MyScreen = () => {
 *   usePreventScreenCapture();
 *   return <View><Text>Secure Content</Text></View>;
 * };
 * ```
 *
 * @returns {void}
 */
declare const usePreventScreenCapture: (active?: boolean) => void;
export default usePreventScreenCapture;
//# sourceMappingURL=screen-capture.d.ts.map