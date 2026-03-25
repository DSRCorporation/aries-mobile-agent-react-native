import { useAgent } from '@bifold/react-hooks';
import { ProofRequestType, linkProofWithTemplate, sendProofRequest } from '@bifold/verifier';
import { MetaOverlay } from '@bifold/oca';
import { OverlayType } from '@bifold/oca/build/types/TypeEnums';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import VerifierCredentialCard from '../components/misc/VerifierCredentialCard';
import AlertModal from '../components/modals/AlertModal';
import { TOKENS, useServices } from '../container-api';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTemplate } from '../hooks/proof-request-templates';
import { Screens } from '../types/navigators';
import { buildFieldsFromAnonCredsProofRequestTemplate } from '../utils/oca';
import { testIdWithKey } from '../utils/testable';
import { ThemedText } from '../components/texts/ThemedText';
const onlyNumberRegex = /^\d+$/;
const ProofRequestAttributesCard = ({
  data,
  onChangeValue
}) => {
  const {
    ColorPalette
  } = useTheme();
  const {
    i18n
  } = useTranslation();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const [attributes, setAttributes] = useState(undefined);
  const [credDefId, setCredDefId] = useState(undefined);
  useEffect(() => {
    const attributes = buildFieldsFromAnonCredsProofRequestTemplate(data);
    bundleResolver.presentationFields({
      identifiers: {
        schemaId: data.schema
      },
      attributes,
      language: i18n.language
    }).then(fields => {
      setAttributes(fields);
    });
  }, [data, bundleResolver, i18n.language]);
  useEffect(() => {
    var _ref;
    const credDefId = (_ref = data.requestedAttributes ?? data.requestedPredicates) === null || _ref === void 0 ? void 0 : _ref.flatMap(reqItem => {
      var _reqItem$restrictions;
      return (_reqItem$restrictions = reqItem.restrictions) === null || _reqItem$restrictions === void 0 ? void 0 : _reqItem$restrictions.map(restrictionItem => restrictionItem.cred_def_id);
    }).find(item => item !== undefined);
    setCredDefId(credDefId);
  }, [data.requestedAttributes, data.requestedPredicates]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement(VerifierCredentialCard, {
    onChangeValue: onChangeValue,
    displayItems: attributes,
    style: {
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    credDefId: credDefId,
    schemaId: data.schema,
    preview: true,
    elevated: true,
    brandingOverlayType: bundleResolver.getBrandingOverlayType()
  }));
};
const ProofRequestCardsComponent = ({
  attributes = [],
  onChangeValue
}) => {
  return attributes.map(item => /*#__PURE__*/React.createElement(ProofRequestAttributesCard, {
    key: item.schema,
    data: item,
    onChangeValue: onChangeValue
  }));
};

// memo'd to prevent rerendering when onChangeValue is called from child and updates parent
const ProofRequestCards = /*#__PURE__*/memo(ProofRequestCardsComponent);
const ProofRequestDetails = ({
  route,
  navigation
}) => {
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const [store] = useStore();
  const {
    t
  } = useTranslation();
  const {
    i18n
  } = useTranslation();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const {
    agent
  } = useAgent();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequestDetails route params were not set properly');
  }
  const {
    templateId,
    connectionId
  } = route.params;
  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: 16
    },
    header: {
      marginTop: 12,
      marginBottom: 36
    },
    description: {
      marginTop: 10,
      color: TextTheme.title.color,
      fontSize: 20
    },
    footerButton: {
      marginTop: 'auto',
      marginBottom: 10
    }
  });
  const [meta, setMeta] = useState(undefined);
  const [attributes, setAttributes] = useState(undefined);
  const [customPredicateValues, setCustomPredicateValues] = useState({});
  const [invalidPredicate, setInvalidPredicate] = useState(undefined);
  const template = useTemplate(templateId);
  useEffect(() => {
    if (!template) {
      return;
    }
    const attributes = template.payload.type === ProofRequestType.AnonCreds ? template.payload.data : [];
    bundleResolver.resolve({
      identifiers: {
        templateId
      },
      language: i18n.language
    }).then(bundle => {
      const metaOverlay = (bundle === null || bundle === void 0 ? void 0 : bundle.metaOverlay) || new MetaOverlay({
        capture_base: '',
        type: OverlayType.Meta10,
        name: template.name,
        description: template.description,
        language: i18n.language,
        credential_help_text: '',
        credential_support_url: '',
        issuer: '',
        issuer_description: '',
        issuer_url: ''
      });
      setMeta(metaOverlay);
      setAttributes(attributes);
    });
  }, [template, bundleResolver, templateId, i18n.language]);
  const onChangeValue = useCallback((schema, label, name, value) => {
    if (!onlyNumberRegex.test(value)) {
      setInvalidPredicate({
        visible: true,
        predicate: label
      });
      return;
    }
    setInvalidPredicate(undefined);
    setCustomPredicateValues(prev => ({
      ...prev,
      [schema]: {
        ...(prev[schema] || {}),
        [name]: parseInt(value)
      }
    }));
  }, [setCustomPredicateValues, setInvalidPredicate]);
  const activateProofRequest = useCallback(async () => {
    if (!template) {
      return;
    }
    if (invalidPredicate) {
      setInvalidPredicate({
        visible: true,
        predicate: invalidPredicate.predicate
      });
      return;
    }
    if (connectionId) {
      var _navigation$getParent;
      // Send to specific contact and redirect to the chat with him
      sendProofRequest(agent, template, connectionId, customPredicateValues).then(result => {
        if (result !== null && result !== void 0 && result.proofRecord) {
          linkProofWithTemplate(agent, result.proofRecord, templateId);
        }
      });
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Screens.Chat, {
        connectionId
      });
    } else {
      // Else redirect to the screen with connectionless request
      navigation.navigate(Screens.ProofRequesting, {
        templateId,
        predicateValues: customPredicateValues
      });
    }
  }, [template, invalidPredicate, connectionId, agent, customPredicateValues, templateId, navigation]);
  const showTemplateUsageHistory = useCallback(async () => {
    navigation.navigate(Screens.ProofRequestUsageHistory, {
      templateId
    });
  }, [navigation, templateId]);
  const Header = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.header
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "headingThree"
    }, meta === null || meta === void 0 ? void 0 : meta.name), /*#__PURE__*/React.createElement(ThemedText, {
      style: style.description
    }, meta === null || meta === void 0 ? void 0 : meta.description));
  };
  const Footer = () => {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
      style: style.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: connectionId ? t('Verifier.SendThisProofRequest') : t('Verifier.UseProofRequest'),
      accessibilityLabel: connectionId ? t('Verifier.SendThisProofRequest') : t('Verifier.UseProofRequest'),
      testID: connectionId ? testIdWithKey('SendThisProofRequest') : testIdWithKey('UseProofRequest'),
      buttonType: ButtonType.Primary,
      onPress: () => activateProofRequest()
    })), store.preferences.useDataRetention && /*#__PURE__*/React.createElement(View, {
      style: style.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Verifier.ShowTemplateUsageHistory'),
      accessibilityLabel: t('Verifier.ShowTemplateUsageHistory'),
      testID: testIdWithKey('ShowTemplateUsageHistory'),
      buttonType: ButtonType.Secondary,
      onPress: () => showTemplateUsageHistory()
    })));
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, (invalidPredicate === null || invalidPredicate === void 0 ? void 0 : invalidPredicate.visible) && /*#__PURE__*/React.createElement(AlertModal, {
    title: t('Verifier.InvalidPredicateValueTitle', {
      predicate: invalidPredicate.predicate
    }),
    message: t('Verifier.InvalidPredicateValueDetails'),
    submit: () => setInvalidPredicate({
      visible: false,
      predicate: invalidPredicate.predicate
    })
  }), /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(ProofRequestCards, {
    attributes: attributes,
    onChangeValue: onChangeValue
  }), /*#__PURE__*/React.createElement(Footer, null)));
};
export default ProofRequestDetails;
//# sourceMappingURL=ProofRequestDetails.js.map