import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds';
import { CredentialState } from '@credo-ts/core';
import { useCredentialByState } from '@credo-ts/react-hooks';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTour } from '../contexts/tour/tour-context';
import { Screens } from '../types/navigators';
import { TourID } from '../types/tour';
import { TOKENS, useServices } from '../container-api';
const ListCredentials = () => {
  const {
    t
  } = useTranslation();
  const [store, dispatch] = useStore();
  const [CredentialCard, CredentialListOptions, credentialEmptyList, {
    enableTours: enableToursConfig,
    credentialHideList
  }] = useServices([TOKENS.COMP_CREDENTIAL_CARD, TOKENS.COMPONENT_CRED_LIST_OPTIONS, TOKENS.COMPONENT_CRED_EMPTY_LIST, TOKENS.CONFIG]);
  let credentials = [...useCredentialByState(CredentialState.CredentialReceived), ...useCredentialByState(CredentialState.Done)];
  const CredentialEmptyList = credentialEmptyList;

  // Filter out hidden credentials when not in dev mode
  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter(r => {
      var _r$metadata$get;
      const credDefId = (_r$metadata$get = r.metadata.get(AnonCredsCredentialMetadataKey)) === null || _r$metadata$get === void 0 ? void 0 : _r$metadata$get.credentialDefinitionId;
      return !(credentialHideList !== null && credentialHideList !== void 0 && credentialHideList.includes(credDefId));
    });
  }
  const navigation = useNavigation();
  const {
    ColorPallet
  } = useTheme();
  const {
    start,
    stop
  } = useTour();
  const screenIsFocused = useIsFocused();
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour;
    if (shouldShowTour && screenIsFocused) {
      start(TourID.CredentialsTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true]
      });
    }
    return stop;
  }, [screenIsFocused]);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(FlatList, {
    style: {
      backgroundColor: ColorPallet.brand.primaryBackground
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
      }, /*#__PURE__*/React.createElement(CredentialCard, {
        credential: credential,
        onPress: () => navigation.navigate(Screens.CredentialDetails, {
          credential
        })
      }));
    },
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(CredentialEmptyList, {
      message: t('Credentials.EmptyList')
    })
  }), /*#__PURE__*/React.createElement(CredentialListOptions, null));
};
export default ListCredentials;
//# sourceMappingURL=ListCredentials.js.map