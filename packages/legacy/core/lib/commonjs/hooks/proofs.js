"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProofsByConnectionId = exports.useAllCredentialsForProof = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = require("react");
var _reactI18next = require("react-i18next");
var _containerApi = require("../container-api");
var _helpers = require("../utils/helpers");
const useProofsByConnectionId = connectionId => {
  const {
    records: proofs
  } = (0, _reactHooks.useProofs)();
  return (0, _react.useMemo)(() => proofs.filter(proof => proof.connectionId === connectionId), [proofs, connectionId]);
};
exports.useProofsByConnectionId = useProofsByConnectionId;
const useAllCredentialsForProof = proofId => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const fullCredentials = (0, _reactHooks.useCredentials)().records;
  const proof = (0, _reactHooks.useProofById)(proofId);
  const [groupByReferent] = (0, _containerApi.useServices)([_containerApi.TOKENS.GROUP_BY_REFERENT]);
  return (0, _react.useMemo)(() => {
    if (!proof || !agent) {
      return;
    }
    return (0, _helpers.retrieveCredentialsForProof)(agent, proof, fullCredentials, t, groupByReferent);
  }, [proofId, fullCredentials]);
};
exports.useAllCredentialsForProof = useAllCredentialsForProof;
//# sourceMappingURL=proofs.js.map