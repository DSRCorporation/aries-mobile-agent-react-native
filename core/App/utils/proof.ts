import { ProofIdentifier } from '@aries-framework/core'
import { IndyProof, IndyProofRequest } from 'indy-sdk-react-native'

export interface MissingAttribute {
  name: string
}

export interface SharedAttribute {
  name: string
  value: string
  identifiers: ProofIdentifier
}

export interface SharedGroupedAttribute {
  name: string
  value: string
}

export interface SharedAttributesGroup {
  attributes: Array<SharedGroupedAttribute>
  identifiers: ProofIdentifier
}

export interface ResolvedPredicate {
  name: string
  predicateType: string
  predicateValue: number
  identifiers: ProofIdentifier
}

export interface UnresolvedPredicate {
  name: string
  predicateType: string
  predicateValue: number
}

export class ParsedIndyProof {
  public sharedAttribute: Array<SharedAttribute>
  public sharedAttributeGroups: Array<SharedAttributesGroup>
  public resolvedPredicates: Array<ResolvedPredicate>
  public unresolvedAttributes: Array<MissingAttribute>
  public unresolvedAttributeGroups: Array<Array<MissingAttribute>>
  public unresolvedPredicates: Array<UnresolvedPredicate>

  public constructor() {
    this.sharedAttribute = []
    this.sharedAttributeGroups = []
    this.resolvedPredicates = []
    this.unresolvedAttributes = []
    this.unresolvedAttributeGroups = []
    this.unresolvedPredicates = []
  }
}

/*
 * Extract identifiers from indy proof
 * */
const getProofIdentifiers = (proof: IndyProof, proofIndex: number): ProofIdentifier => {
  const identifiers = proof.identifiers[proofIndex]
  if (!identifiers) {
    throw new Error('Invalid indy proof data')
  }
  return {
    schemaId: identifiers.schema_id,
    credentialDefinitionId: identifiers.cred_def_id,
    revocationRegistryId: identifiers.rev_reg_id,
    timestamp: identifiers.timestamp,
  }
}

/*
 * Process indy proof and return
 *  - shared attributes
 *  - shared attribute groups
 *  - resolved predicates
 *  - missing attributes
 *  - missing attribute groups
 *  - unresolved predicates
 * */
export const parseIndyProof = (request: IndyProofRequest, proof: IndyProof): ParsedIndyProof => {
  const result = new ParsedIndyProof()

  for (const [referent, requested_attribute] of Object.entries(request.requested_attributes)) {
    if (requested_attribute.name) {
      const shared = proof.requested_proof.revealed_attrs[referent]
      if (shared) {
        const identifiers = getProofIdentifiers(proof, shared.sub_proof_index)
        result.sharedAttribute.push({
          name: requested_attribute.name,
          value: shared.raw,
          identifiers,
        })
      } else {
        result.unresolvedAttributes.push({
          name: requested_attribute.name,
        })
      }
    }

    if (requested_attribute.names) {
      const shared = proof.requested_proof.revealed_attr_groups[referent]
      if (shared) {
        const attributes = Object.entries(shared.values).map(([name, value]) => ({
          name,
          value: value.raw,
        }))
        const identifiers = getProofIdentifiers(proof, shared.sub_proof_index)
        result.sharedAttributeGroups.push({
          attributes,
          identifiers,
        })
      } else {
        result.unresolvedAttributeGroups.push(requested_attribute.names.map((name) => ({ name })))
      }
    }
  }

  for (const [referent, requestedPredicate] of Object.entries(request.requested_predicates)) {
    const shared = proof.requested_proof.requested_predicates[referent]
    if (shared) {
      const identifiers = getProofIdentifiers(proof, shared.sub_proof_index)
      result.resolvedPredicates.push({
        name: requestedPredicate.name,
        predicateType: requestedPredicate.p_type,
        predicateValue: requestedPredicate.p_value,
        identifiers,
      })
    } else {
      result.unresolvedPredicates.push({
        name: requestedPredicate.name,
        predicateType: requestedPredicate.p_type,
        predicateValue: requestedPredicate.p_value,
      })
    }
  }

  return result
}

export class CredentialSharedProofData {
  public sharedAttribute: Array<SharedAttribute>
  public sharedAttributeGroups: Array<SharedAttributesGroup>
  public resolvedPredicates: Array<ResolvedPredicate>

  public constructor() {
    this.sharedAttribute = []
    this.sharedAttributeGroups = []
    this.resolvedPredicates = []
  }
}

export type GroupedSharedProofData = Record<string, CredentialSharedProofData>

/*
 * Group parsed indy proof data ( returned from `parseIndyProof`) by schema
 * */
export const groupSharedProofDataByCredential = (data: ParsedIndyProof): GroupedSharedProofData => {
  const result: GroupedSharedProofData = {}
  for (const item of data.sharedAttribute) {
    if (!result[item.identifiers.schemaId]) {
      result[item.identifiers.schemaId] = new CredentialSharedProofData()
    }
    result[item.identifiers.schemaId]?.sharedAttribute.push(item)
  }
  for (const item of data.sharedAttributeGroups) {
    if (!result[item.identifiers.schemaId]) {
      result[item.identifiers.schemaId] = new CredentialSharedProofData()
    }
    result[item.identifiers.schemaId]?.sharedAttributeGroups.push(item)
  }
  for (const item of data.resolvedPredicates) {
    if (!result[item.identifiers.schemaId]) {
      result[item.identifiers.schemaId] = new CredentialSharedProofData()
    }
    result[item.identifiers.schemaId]?.resolvedPredicates.push(item)
  }
  return result
}
