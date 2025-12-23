import { ConnectionType, DidExchangeState } from '@credo-ts/core';
import { useAgent } from '@credo-ts/react-hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, StyleSheet, View } from 'react-native';
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton';
import ContactListItem from '../components/listItems/ContactListItem';
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
    ColorPallet
  } = useTheme();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const [connections, setConnections] = useState([]);
  const [store] = useStore();
  const [{
    contactHideList
  }] = useServices([TOKENS.CONFIG]);
  const style = StyleSheet.create({
    list: {
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    itemSeparator: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      height: 1,
      marginHorizontal: 16
    }
  });
  useEffect(() => {
    const fetchAndSetConnections = async () => {
      if (!agent) return;
      let orderedContacts = await fetchContactsByLatestMessage(agent);

      // if developer mode is disabled, filter out mediator connections and connections in the hide list
      if (!store.preferences.developerModeEnabled) {
        orderedContacts = orderedContacts.filter(r => {
          return !r.connectionTypes.includes(ConnectionType.Mediator) && !(contactHideList !== null && contactHideList !== void 0 && contactHideList.includes((r.theirLabel || r.alias) ?? '')) && r.state === DidExchangeState.Completed;
        });
      }
      setConnections(orderedContacts);
    };
    fetchAndSetConnections().catch(err => {
      agent === null || agent === void 0 || agent.config.logger.error('Error fetching contacts:', err);
      const error = new BifoldError(t('Error.Title1046'), t('Error.Message1046'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1046);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, [agent]);
  const onPressAddContact = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ConnectStack, {
      screen: Screens.Scan,
      params: {
        defaultToConnect: true
      }
    });
  };
  useEffect(() => {
    if (store.preferences.useConnectionInviterCapability) {
      navigation.setOptions({
        headerRight: () => /*#__PURE__*/React.createElement(HeaderButton, {
          buttonLocation: ButtonLocation.Right,
          accessibilityLabel: t('Contacts.AddContact'),
          testID: testIdWithKey('AddContact'),
          onPress: onPressAddContact,
          icon: "plus-circle-outline"
        })
      });
    } else {
      navigation.setOptions({
        headerRight: () => false
      });
    }
  }, [store.preferences.useConnectionInviterCapability]);
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