"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttributeField = exports.buildOverlayFromW3cCredential = exports.buildFieldsFromW3cCredsCredential = exports.buildFieldsFromSharedAnonCredsProof = exports.buildFieldsFromAnonCredsProofRequestTemplate = exports.buildFieldsFromAnonCredsCredential = void 0;
var _legacy = require("@bifold/oca/build/legacy");
const getAttributeField = (display, searchKey) => {
  let attributeName = 'Unknown';
  let attributeValue = 'Unknown';
  for (const [key, value] of Object.entries(display.attributes)) {
    let formattedValue;
    if (searchKey === key) {
      if (typeof value === 'object' && value !== null) {
        formattedValue = JSON.stringify(value); // Convert object to string
      } else {
        formattedValue = value;
      }
      attributeName = key;
      attributeValue = formattedValue;
    }
  }

  //Now check credentialSubject for attributeName mapping
  const credentialSubject = display.credentialSubject;
  if (credentialSubject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(credentialSubject)) {
      if (key !== searchKey || !value) continue;
      const {
        display
      } = value;
      const {
        name
      } = display[0];
      attributeName = name;
    }
  }
  return {
    field: new _legacy.Attribute({
      name: attributeName,
      value: attributeValue,
      mimeType: typeof attributeValue === 'number' ? 'text/number' : 'text/plain'
    }),
    attribute_name: searchKey
  };
};
exports.getAttributeField = getAttributeField;
const buildFieldsFromW3cCredsCredential = (display, filterByAttributes) => {
  return Object.entries(display.attributes).filter(([key]) => key !== 'id' && key !== 'sub' && key !== 'status').map(([key]) => getAttributeField(display, key)).filter(field => field !== undefined).filter(field => filterByAttributes ? filterByAttributes.includes(field.attribute_name) : true).map(fld => fld.field) || [];
};
exports.buildFieldsFromW3cCredsCredential = buildFieldsFromW3cCredsCredential;
const buildFieldsFromAnonCredsCredential = credential => {
  var _credential$credentia;
  return (credential === null || credential === void 0 || (_credential$credentia = credential.credentialAttributes) === null || _credential$credentia === void 0 ? void 0 : _credential$credentia.map(attr => new _legacy.Attribute(attr))) || [];
};
exports.buildFieldsFromAnonCredsCredential = buildFieldsFromAnonCredsCredential;
const buildFieldsFromAnonCredsProofRequestTemplate = data => {
  const fields = [];
  if (data.requestedAttributes) {
    for (const item of data.requestedAttributes) {
      if (item.name) {
        fields.push(new _legacy.Attribute({
          name: item.name,
          value: null,
          ...item
        }));
      }
      if (item.names) {
        for (const name of item.names) {
          fields.push(new _legacy.Attribute({
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
      fields.push(new _legacy.Predicate({
        pType: item.predicateType,
        pValue: item.predicateValue,
        ...item
      }));
    }
  }
  return fields;
};
exports.buildFieldsFromAnonCredsProofRequestTemplate = buildFieldsFromAnonCredsProofRequestTemplate;
const buildFieldsFromSharedAnonCredsProof = data => {
  const fields = [];
  for (const attribute of data.sharedAttributes) {
    fields.push(new _legacy.Attribute({
      name: attribute.name,
      value: attribute.value
    }));
  }
  for (const attributesGroup of data.sharedAttributeGroups) {
    for (const attribute of attributesGroup.attributes) {
      fields.push(new _legacy.Attribute({
        name: attribute.name,
        value: attribute.value
      }));
    }
  }
  for (const predicate of data.resolvedPredicates) {
    fields.push(new _legacy.Predicate({
      name: predicate.name,
      pType: predicate.predicateType,
      pValue: predicate.predicateValue,
      satisfied: true
    }));
  }
  return fields;
};
exports.buildFieldsFromSharedAnonCredsProof = buildFieldsFromSharedAnonCredsProof;
const buildOverlayFromW3cCredential = async ({
  credentialDisplay,
  language,
  resolver
}) => {
  const params = {
    identifiers: {
      schemaId: '',
      credentialDefinitionId: credentialDisplay.id
    },
    meta: {
      alias: credentialDisplay.display.issuer.name,
      credConnectionId: undefined,
      credName: credentialDisplay.display.name
    },
    attributes: buildFieldsFromW3cCredsCredential(credentialDisplay),
    language
  };
  const bundle = await resolver.resolveAllBundles(params);
  return {
    ...bundle,
    presentationFields: buildFieldsFromW3cCredsCredential(credentialDisplay)
  };
};
exports.buildOverlayFromW3cCredential = buildOverlayFromW3cCredential;
//# sourceMappingURL=oca.js.map