import { hasPredicates, isParameterizable } from '@hyperledger/aries-bifold-verifier';
import { MetaOverlay, OverlayType } from '@hyperledger/aries-oca';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmptyList from '../components/misc/EmptyList';
import { TOKENS, useServices } from '../container-api';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTemplates } from '../hooks/proof-request-templates';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
const ProofRequestsCard = ({
  navigation,
  template,
  connectionId
}) => {
  const {
    t
  } = useTranslation();
  const {
    i18n
  } = useTranslation();
  const {
    ListItems
  } = useTheme();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const style = StyleSheet.create({
    card: {
      ...ListItems.requestTemplateBackground,
      flexDirection: 'row',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10
    },
    textContainer: {
      flex: 1
    },
    templateTitle: {
      ...ListItems.requestTemplateTitle,
      marginBottom: 4
    },
    templateDetails: {
      ...ListItems.requestTemplateDetails,
      marginBottom: 4
    },
    templateZkpLabel: {
      ...ListItems.requestTemplateZkpLabel
    },
    iconContainer: {
      alignSelf: 'center'
    },
    icon: {
      ...ListItems.requestTemplateIcon
    }
  });
  const [meta, setMeta] = useState(undefined);
  useEffect(() => {
    bundleResolver.resolve({
      identifiers: {
        templateId: template.id
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
    });
  }, [template]);
  return meta ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: style.card,
    onPress: () => navigation.navigate(Screens.ProofRequestDetails, {
      templateId: template.id,
      connectionId
    }),
    accessibilityLabel: t('Screens.ProofRequestDetails'),
    testID: testIdWithKey('ProofRequestsCard')
  }, /*#__PURE__*/React.createElement(View, {
    style: style.textContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.templateTitle,
    numberOfLines: 1
  }, meta.name), /*#__PURE__*/React.createElement(Text, {
    style: style.templateDetails,
    numberOfLines: 2
  }, meta.description), hasPredicates(template) && /*#__PURE__*/React.createElement(Text, {
    style: style.templateZkpLabel
  }, t('Verifier.ZeroKnowledgeProof')), isParameterizable(template) && /*#__PURE__*/React.createElement(Text, {
    style: style.templateZkpLabel
  }, t('Verifier.Parameterizable'))), /*#__PURE__*/React.createElement(View, {
    style: style.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    style: style.icon,
    name: 'chevron-right'
  }))) : null;
};
const ListProofRequests = ({
  navigation,
  route
}) => {
  var _route$params;
  const {
    t
  } = useTranslation();
  const {
    ColorPallet
  } = useTheme();
  const [store] = useStore();
  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 24,
      elevation: 5
    }
  });
  const connectionId = route === null || route === void 0 || (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.connectionId;

  // if useDevVerifierTemplates not set then exclude dev templates
  const proofRequestTemplates = useTemplates().filter(tem => store.preferences.useDevVerifierTemplates || !tem.devOnly);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, /*#__PURE__*/React.createElement(FlatList, {
    style: {
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    data: proofRequestTemplates,
    keyExtractor: records => records.id,
    renderItem: ({
      item
    }) => {
      return /*#__PURE__*/React.createElement(ProofRequestsCard, {
        template: item,
        connectionId: connectionId,
        navigation: navigation
      });
    },
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(EmptyList, {
      message: t('Verifier.EmptyList')
    })
  }));
};
export default ListProofRequests;
//# sourceMappingURL=ListProofRequests.js.map