"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLedgerNodes = exports.canConnectToHost = void 0;
var _reactNativeTcpSocket = _interopRequireDefault(require("react-native-tcp-socket"));
var _indy = _interopRequireDefault(require("../configs/ledgers/indy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const canConnectToHost = async host => new Promise(resolve => {
  const socketTimeoutInMs = 3000;
  const client = _reactNativeTcpSocket.default.createConnection(host, () => {
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
exports.canConnectToHost = canConnectToHost;
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
    } catch {
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
//# sourceMappingURL=network.js.map