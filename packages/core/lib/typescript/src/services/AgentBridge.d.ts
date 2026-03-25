import type { Agent } from '@credo-ts/core';
type ReadyListener = (agent: Agent) => void;
type ClosedListener = (reason?: string) => void;
type ChangeListener = (agent: Agent | undefined) => void;
export declare class AgentBridge {
    private agent?;
    private readyOnce;
    private readonly readyPersistent;
    private closedListeners;
    private changeListeners;
    /** Set the live agent (e.g., after PIN unlock) */
    setAgent(agent: Agent): void;
    /** Clear the current agent (e.g., on wallet lock / shutdown) */
    clearAgent(reason?: string): void;
    /**
     * Ready subscription.
     * - Default (persistent = false): one-shot (old behavior). If agent exists, fires immediately.
     * - Persistent (persistent = true): fires now if ready and on every subsequent setAgent.
     */
    onReady(fn: ReadyListener, persistent?: boolean): () => void;
    /** Persistent: called whenever agent becomes available or cleared */
    onChange(fn: ChangeListener): () => void;
    /** Persistent: called when agent is cleared (lock/shutdown) */
    onClosed(fn: ClosedListener): () => void;
    /** Promise helper to await an agent (one-shot) */
    waitForReady(): Promise<Agent>;
    get current(): Agent | undefined;
    get isReady(): boolean;
}
export {};
//# sourceMappingURL=AgentBridge.d.ts.map