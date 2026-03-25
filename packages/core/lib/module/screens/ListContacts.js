import { useAgent, useConnections } from '@bifold/react-hooks';
import { DidCommConnectionType, DidCommDidExchangeState } from '@credo-ts/didcomm';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, StyleSheet, View } from 'react-native';
import IconButton, { ButtonLocation } from '../components/buttons/IconButton';
import EmptyListContacts from '../components/misc/EmptyListContacts';
import { EventTypes } from '../constants';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens, Stacks } from '../types/navigators';
import { fetchContactsByLatestMessage } from '../utils/contacts';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
const ListContacts = ({
  navigation
}) => {
  const {
    ColorPalette
  } = useTheme();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const [connections, setConnections] = useState([]);
  const {
    records: connectionRecords
  } = useConnections();
  const [store] = useStore();
  const [{
    contactHideList
  }, ContactListItem, defaultScreenOptionsDict] = useServices([TOKENS.CONFIG, TOKENS.COMPONENT_CONTACT_LIST_ITEM, TOKENS.OBJECT_SCREEN_CONFIG]);
  const style = StyleSheet.create({
    list: {
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    itemSeparator: {
      backgroundColor: ColorPalette.brand.primaryBackground,
      height: 1,
      marginHorizontal: 16
    }
  });
  useEffect(() => {
    const fetchAndSetConnections = async () => {
      if (!agent) return;
      let orderedContacts = await fetchContactsByLatestMessage(agent, connectionRecords);

      // if developer mode is disabled, filter out mediator connections and connections in the hide list
      if (!store.preferences.developerModeEnabled) {
        orderedContacts = orderedContacts.filter(r => {
          return !r.connectionTypes.includes(DidCommConnectionType.Mediator) && !(contactHideList !== null && contactHideList !== void 0 && contactHideList.includes((r.theirLabel || r.alias) ?? '')) && r.state === DidCommDidExchangeState.Completed;
        });
      }
      setConnections(orderedContacts);
    };
    fetchAndSetConnections().catch(err => {
      agent === null || agent === void 0 || agent.config.logger.error('Error fetching contacts:', err);
      const error = new BifoldError(t('Error.Title1046'), t('Error.Message1046'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1046);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, [agent, connectionRecords, store.preferences.developerModeEnabled, contactHideList, t]);
  const onPressAddContact = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ConnectStack, {
      screen: Screens.Scan,
      params: {
        defaultToConnect: true
      }
    });
  }, [navigation]);
  useEffect(() => {
    if (store.preferences.useConnectionInviterCapability) {
      navigation.setOptions({
        headerRight: () => /*#__PURE__*/React.createElement(IconButton, {
          buttonLocation: ButtonLocation.Right,
          accessibilityLabel: t('Contacts.AddContact'),
          testID: testIdWithKey('AddContact'),
          onPress: onPressAddContact,
          icon: "plus-circle-outline"
        })
      });
    } else {
      var _defaultScreenOptions;
      navigation.setOptions({
        headerRight: (_defaultScreenOptions = defaultScreenOptionsDict[Screens.Contacts]) === null || _defaultScreenOptions === void 0 ? void 0 : _defaultScreenOptions.headerRight
      });
    }
  }, [store.preferences.useConnectionInviterCapability, navigation, t, onPressAddContact, defaultScreenOptionsDict]);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(FlatList, {
    style: style.list,
    data: connections,
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: style.itemSeparator
    }),
    keyExtractor: connection => connection.id,
    renderItem: ({
      item: connection
    }) => /*#__PURE__*/React.createElement(ContactListItem, {
      contact: connection,
      navigation: navigation
    }),
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(EmptyListContacts, {
      navigation: navigation
    }),
    showsVerticalScrollIndicator: false
  }));
};
export default ListContacts;
//# sourceMappingURL=ListContacts.js.map