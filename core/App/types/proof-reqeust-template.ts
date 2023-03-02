export interface IndyRequestedPredicate {
  label?: string
  name: string
  predicateType: string
  predicateValue: number
  restrictions?: Array<Record<string, unknown>>
  nonRevoked?: boolean
  parameterizable?: boolean
}

export interface IndyRequestedAttribute {
  label?: string
  name?: string
  names?: Array<string>
  restrictions?: Array<Record<string, unknown>>
  revealed?: boolean
  nonRevoked?: boolean
}

export interface IndyProofRequestTemplatePayloadData {
  schema: string
  requestedAttributes?: Array<IndyRequestedAttribute>
  requestedPredicates?: Array<IndyRequestedPredicate>
}

export enum ProofRequestType {
  Indy = 'indy',
  DIF = 'dif',
}

export interface IndyProofRequestTemplatePayload {
  type: ProofRequestType.Indy
  data: Array<IndyProofRequestTemplatePayloadData>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DifProofRequestTemplatePayloadData {}

export interface DifProofRequestTemplatePayload {
  type: ProofRequestType.DIF
  data: Array<DifProofRequestTemplatePayloadData>
}

export interface ProofRequestTemplate {
  id: string
  title: string
  details: string
  version: string
  payload: IndyProofRequestTemplatePayload | DifProofRequestTemplatePayload
}
