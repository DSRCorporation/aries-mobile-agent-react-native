"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLedgerNodes = exports.canConnectToLedgerNode = void 0;
var _reactNativeTcpSocket = _interopRequireDefault(require("react-native-tcp-socket"));
var _indy = _interopRequireDefault(require("../configs/ledgers/indy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const canConnectToLedgerNode = async node => new Promise(resolve => {
  const socketTimeoutInMs = 3000;
  const client = _reactNativeTcpSocket.default.createConnection(node, () => {
    resolve(true);
    client.destroy();
  });

  // Other events that can be safely be ignored. See the
  // library for more details:
  // https://www.npmjs.com/package/react-native-tcp-socket

  client.on('error', () => {
    client.destroy();
    resolve(false);
  });
  client.on('timeout', () => {
    client.destroy();
    client.removeAllListeners();
    resolve(false);
  });
  client.setTimeout(socketTimeoutInMs);
});
exports.canConnectToLedgerNode = canConnectToLedgerNode;
const fetchLedgerNodes = (indyNamespace = 'sovrin') => {
  const [pool] = _indy.default.filter(p => p.indyNamespace === indyNamespace);
  if (!pool) {
    return [];
  }
  const genesisTransactionsAsString = pool.genesisTransactions;
  let genesisTransactions = [];
  if (genesisTransactionsAsString) {
    try {
      genesisTransactions = genesisTransactionsAsString.split('\n').map(g => JSON.parse(g));
    } catch (error) {
      return [];
    }
  }
  const nodes = genesisTransactions.map(g => {
    return {
      host: g.txn.data.data.client_ip,
      port: parseInt(g.txn.data.data.client_port)
    };
  });
  return nodes;
};
exports.fetchLedgerNodes = fetchLedgerNodes;
//# sourceMappingURL=ledger.js.map