import { Attribute, Predicate } from '@hyperledger/aries-oca/build/legacy';
export const buildFieldsFromAnonCredsCredential = credential => {
  var _credential$credentia;
  return (credential === null || credential === void 0 || (_credential$credentia = credential.credentialAttributes) === null || _credential$credentia === void 0 ? void 0 : _credential$credentia.map(attr => new Attribute(attr))) || [];
};
export const buildFieldsFromAnonCredsProofRequestTemplate = data => {
  const fields = [];
  if (data.requestedAttributes) {
    for (const item of data.requestedAttributes) {
      if (item.name) {
        fields.push(new Attribute({
          name: item.name,
          value: null,
          ...item
        }));
      }
      if (item.names) {
        for (const name of item.names) {
          fields.push(new Attribute({
            name,
            value: null,
            ...item
          }));
        }
      }
    }
  }
  if (data.requestedPredicates) {
    for (const item of data.requestedPredicates) {
      fields.push(new Predicate({
        pType: item.predicateType,
        pValue: item.predicateValue,
        ...item
      }));
    }
  }
  return fields;
};
export const buildFieldsFromSharedAnonCredsProof = data => {
  const fields = [];
  for (const attribute of data.sharedAttributes) {
    fields.push(new Attribute({
      name: attribute.name,
      value: attribute.value
    }));
  }
  for (const attributesGroup of data.sharedAttributeGroups) {
    for (const attribute of attributesGroup.attributes) {
      fields.push(new Attribute({
        name: attribute.name,
        value: attribute.value
      }));
    }
  }
  for (const predicate of data.resolvedPredicates) {
    fields.push(new Predicate({
      name: predicate.name,
      pType: predicate.predicateType,
      pValue: predicate.predicateValue,
      satisfied: true
    }));
  }
  return fields;
};
//# sourceMappingURL=oca.js.map