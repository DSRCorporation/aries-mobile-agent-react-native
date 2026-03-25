"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _didcomm = require("@credo-ts/didcomm");
var _indyVdr = require("@credo-ts/indy-vdr");
var _reactNative = require("@credo-ts/react-native");
var _indyVdrShared = require("@hyperledger/indy-vdr-shared");
var _react = require("react");
var _reactNativeFs = require("react-native-fs");
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _agent = require("../utils/agent");
var _migration = require("../utils/migration");
const useBifoldAgentSetup = () => {
  const [agent, setAgent] = (0, _react.useState)(null);
  const agentInstanceRef = (0, _react.useRef)(null);
  const [store, dispatch] = (0, _store2.useStore)();
  const [cacheSchemas, cacheCredDefs, logger, indyLedgers, bridge] = (0, _containerApi.useServices)([_containerApi.TOKENS.CACHE_SCHEMAS, _containerApi.TOKENS.CACHE_CRED_DEFS, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_LEDGERS, _containerApi.TOKENS.UTIL_AGENT_BRIDGE, _containerApi.TOKENS.UTIL_REFRESH_ORCHESTRATOR]);
  const restartExistingAgent = (0, _react.useCallback)(async agent => {
    try {
      await agent.initialize();
    } catch (error) {
      logger.warn(`Agent restart failed with error ${error}`);
      // if the existing agents wallet cannot be opened or initialize() fails it was
      // again not a clean shutdown and the agent should be replaced, not restarted
      return;
    }
    return agent;
  }, [logger]);
  const createNewAgent = (0, _react.useCallback)(async (walletSecret, mediatorUrl) => {
    const newAgent = new _core.Agent({
      config: {
        logger,
        autoUpdateStorageOnStartup: true
      },
      dependencies: _reactNative.agentDependencies,
      modules: (0, _agent.getAgentModules)({
        walletSecret,
        indyNetworks: indyLedgers,
        mediatorInvitationUrl: mediatorUrl,
        txnCache: {
          capacity: 1000,
          expiryOffsetMs: 1000 * 60 * 60 * 24 * 7,
          path: _reactNativeFs.CachesDirectoryPath + '/txn-cache'
        }
      })
    });
    const wsTransport = new _didcomm.DidCommWsOutboundTransport();
    const httpTransport = new _didcomm.DidCommHttpOutboundTransport();
    newAgent.modules.didcomm.registerOutboundTransport(wsTransport);
    newAgent.modules.didcomm.registerOutboundTransport(httpTransport);
    return newAgent;
  }, [logger, indyLedgers]);
  const migrateIfRequired = (0, _react.useCallback)(async (newAgent, walletSecret) => {
    // If we haven't migrated to Aries Askar yet, we need to do this before we initialize the agent.
    if (!store.migration.didMigrateToAskar) {
      await (0, _migration.migrateToAskar)(walletSecret.id, walletSecret.key, newAgent);
      // Store that we migrated to askar.
      dispatch({
        type: _store.DispatchAction.DID_MIGRATE_TO_ASKAR
      });
    }
  }, [store.migration.didMigrateToAskar, dispatch]);
  const warmUpCache = (0, _react.useCallback)(async newAgent => {
    const poolService = newAgent.dependencyManager.resolve(_indyVdr.IndyVdrPoolService); // Maybe should resolve differently
    cacheCredDefs.forEach(async ({
      did,
      id
    }) => {
      const pool = await poolService.getPoolForDid(newAgent.context, did);
      const credDefRequest = new _indyVdrShared.GetCredentialDefinitionRequest({
        credentialDefinitionId: id
      });
      await pool.pool.submitRequest(credDefRequest);
    });
    cacheSchemas.forEach(async ({
      did,
      id
    }) => {
      const pool = await poolService.getPoolForDid(newAgent.context, did);
      const schemaRequest = new _indyVdrShared.GetSchemaRequest({
        schemaId: id
      });
      await pool.pool.submitRequest(schemaRequest);
    });
  }, [cacheCredDefs, cacheSchemas]);
  const initializeAgent = (0, _react.useCallback)(async walletSecret => {
    const mediatorUrl = store.preferences.selectedMediator;
    logger.info('Checking for existing agent...');
    if (agentInstanceRef.current) {
      const restartedAgent = await restartExistingAgent(agentInstanceRef.current);
      if (restartedAgent) {
        logger.info('Successfully restarted existing agent...');
        agentInstanceRef.current = restartedAgent;
        setAgent(restartedAgent);
        return;
      }
    }
    logger.info('Creating new agent...');
    const newAgent = await createNewAgent(walletSecret, mediatorUrl);
    logger.info('Migrating if required...');
    await migrateIfRequired(newAgent, walletSecret);
    try {
      logger.info('Initializing agent...');
      await newAgent.initialize();
    } catch (e) {
      var _cause, _cause2;
      logger.error('Stack: ' + e.stack);
      logger.error('Message: ' + e.message);
      logger.error(((_cause = e.cause) === null || _cause === void 0 ? void 0 : _cause.stack) ?? 'No cause stack');
      logger.error(((_cause2 = e.cause) === null || _cause2 === void 0 ? void 0 : _cause2.message) ?? 'No cause message');
      throw e;
    }
    logger.info('Creating link secret if required...');
    await (0, _agent.createLinkSecretIfRequired)(newAgent);
    logger.info('Warming up cache...');
    await warmUpCache(newAgent);
    logger.info('Agent initialized successfully');
    agentInstanceRef.current = newAgent;
    setAgent(newAgent);
    bridge.setAgent(newAgent);
  }, [logger, restartExistingAgent, createNewAgent, migrateIfRequired, warmUpCache, store.preferences.selectedMediator, bridge]);
  const shutdownAndClearAgentIfExists = (0, _react.useCallback)(async () => {
    if (agent) {
      try {
        await agent.shutdown();
      } catch (error) {
        logger.error(`Error shutting down agent with shutdownAndClearAgentIfExists: ${error}`);
      } finally {
        bridge.clearAgent();
        setAgent(null);
      }
    }
  }, [agent, logger, bridge]);
  return {
    agent,
    initializeAgent,
    shutdownAndClearAgentIfExists
  };
};
var _default = exports.default = useBifoldAgentSetup;
//# sourceMappingURL=useBifoldAgentSetup.js.map