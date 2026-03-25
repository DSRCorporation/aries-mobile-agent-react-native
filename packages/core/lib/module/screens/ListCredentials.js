import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds';
import { useCredentialByState } from '@bifold/react-hooks';
import { SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { DidCommCredentialState } from '@credo-ts/didcomm';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTour } from '../contexts/tour/tour-context';
import { Screens } from '../types/navigators';
import { TOKENS, useServices } from '../container-api';
import { useOpenIDCredentials } from '../modules/openid/context/OpenIDCredentialRecordProvider';
import { BaseTourID } from '../types/tour';
import { OpenIDCredentialType } from '../modules/openid/types';
const ListCredentials = () => {
  const {
    t
  } = useTranslation();
  const [store, dispatch] = useStore();
  const [CredentialListOptions, credentialEmptyList, credentialListFooter, {
    enableTours: enableToursConfig,
    credentialHideList
  }, CredentialCard] = useServices([TOKENS.COMPONENT_CRED_LIST_OPTIONS, TOKENS.COMPONENT_CRED_EMPTY_LIST, TOKENS.COMPONENT_CRED_LIST_FOOTER, TOKENS.CONFIG, TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const navigation = useNavigation();
  const {
    ColorPalette
  } = useTheme();
  const {
    start,
    stop
  } = useTour();
  const screenIsFocused = useIsFocused();
  const {
    openIdState: {
      w3cCredentialRecords,
      sdJwtVcRecords
    }
  } = useOpenIDCredentials();
  let credentials = [...useCredentialByState(DidCommCredentialState.CredentialReceived), ...useCredentialByState(DidCommCredentialState.Done), ...w3cCredentialRecords, ...sdJwtVcRecords];
  const CredentialEmptyList = credentialEmptyList;
  const CredentialListFooter = credentialListFooter;

  // Filter out hidden credentials when not in dev mode
  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter(r => {
      var _r$metadata$get;
      const credDefId = (_r$metadata$get = r.metadata.get(AnonCredsCredentialMetadataKey)) === null || _r$metadata$get === void 0 ? void 0 : _r$metadata$get.credentialDefinitionId;
      return !(credentialHideList !== null && credentialHideList !== void 0 && credentialHideList.includes(credDefId));
    });
  }
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour;
    if (shouldShowTour && screenIsFocused) {
      start(BaseTourID.CredentialsTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenCredentialsTour, screenIsFocused, start, dispatch]);

  // stop the tour when the screen unmounts
  useEffect(() => {
    return stop;
  }, [stop]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderCardItem = cred => {
    return /*#__PURE__*/React.createElement(CredentialCard, {
      credential: cred,
      onPress: () => {
        if (cred instanceof W3cCredentialRecord) {
          navigation.navigate(Screens.OpenIDCredentialDetails, {
            credentialId: cred.id,
            type: OpenIDCredentialType.W3cCredential
          });
        } else if (cred instanceof SdJwtVcRecord) {
          navigation.navigate(Screens.OpenIDCredentialDetails, {
            credentialId: cred.id,
            type: OpenIDCredentialType.SdJwtVc
          });
        } else {
          navigation.navigate(Screens.CredentialDetails, {
            credentialId: cred.id
          });
        }
      }
    });
  };
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(FlatList, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    data: credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
    keyExtractor: credential => credential.id,
    renderItem: ({
      item: credential,
      index
    }) => {
      return /*#__PURE__*/React.createElement(View, {
        style: {
          marginHorizontal: 15,
          marginTop: 15,
          marginBottom: index === credentials.length - 1 ? 45 : 0
        }
      }, renderCardItem(credential));
    },
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(CredentialEmptyList, {
      message: t('Credentials.EmptyList')
    }),
    ListFooterComponent: () => /*#__PURE__*/React.createElement(CredentialListFooter, {
      credentialsCount: credentials.length
    })
  }), /*#__PURE__*/React.createElement(CredentialListOptions, null));
};
export default ListCredentials;
//# sourceMappingURL=ListCredentials.js.map