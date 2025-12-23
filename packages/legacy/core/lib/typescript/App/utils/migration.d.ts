import { Agent } from '@credo-ts/core';
import { Migration as MigrationState } from '../types/state';
export declare const didMigrateToAskar: (state: MigrationState) => boolean;
export declare const migrateToAskar: (walletId: string, key: string, agent?: Agent) => Promise<void>;
//# sourceMappingURL=migration.d.ts.map