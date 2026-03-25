import { useAgent } from '@bifold/react-hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStore } from '../contexts/store';
import { DispatchAction } from '../contexts/reducers/store';
import { useTheme } from '../contexts/theme';
import { ThemedText } from '../components/texts/ThemedText';
import { testIdWithKey } from '../utils/testable';
import { LockoutReason, useAuth } from '../contexts/auth';
import DismissiblePopupModal from '../components/modals/DismissiblePopupModal';
import { setMediationToDefault } from '../utils/mediatorhelpers';
import { DidCommMediationRecipientService } from '@credo-ts/didcomm';
const ConfigureMediator = ({
  route
}) => {
  var _route$params;
  const [store, dispatch] = useStore();
  const {
    agent
  } = useAgent();
  const {
    ColorPalette,
    SettingsTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const {
    lockOutUser
  } = useAuth();
  const supportedMediators = store.preferences.availableMediators;
  const scannedMediatorUri = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.scannedMediatorUri;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingMediatorId, setPendingMediatorId] = useState(null);
  useEffect(() => {
    if (scannedMediatorUri && !store.preferences.availableMediators.includes(scannedMediatorUri)) {
      dispatch({
        type: DispatchAction.ADD_AVAILABLE_MEDIATOR,
        payload: [scannedMediatorUri]
      });
    }
  }, [scannedMediatorUri, dispatch, store.preferences.availableMediators]);
  const mediators = supportedMediators.map(mediator => ({
    id: mediator,
    label: String(mediator),
    testID: testIdWithKey(mediator)
  }));
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.primaryBackground,
      width: '100%'
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPalette.brand.primaryBackground,
      marginHorizontal: 25
    },
    checkboxContainer: {
      justifyContent: 'center'
    }
  });
  const confirmMediatorChange = async () => {
    if (!pendingMediatorId || !agent) return;
    await agent.context.dependencyManager.resolve(DidCommMediationRecipientService).clearDefaultMediator(agent.context);
    agent.config.logger.info(`successfully cleared default mediator`);
    await setMediationToDefault(agent, pendingMediatorId);
    dispatch({
      type: DispatchAction.SET_SELECTED_MEDIATOR,
      payload: [pendingMediatorId]
    });
    lockOutUser(LockoutReason.Logout);
    setIsModalVisible(false);
  };
  const handleMediatorChange = async mediatorId => {
    if (mediatorId === store.preferences.selectedMediator) return;
    setPendingMediatorId(mediatorId);
    setIsModalVisible(true);
  };
  const MediatorRow = ({
    label,
    id,
    testID,
    selected,
    onPress
  }) => /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "title"
  }, label), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.checkboxContainer,
    accessibilityLabel: label,
    accessibilityRole: "radio",
    testID: testIdWithKey(testID)
  }, /*#__PURE__*/React.createElement(BouncyCheckbox, {
    disableText: true,
    fillColor: ColorPalette.brand.secondaryBackground,
    unfillColor: ColorPalette.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPalette.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/React.createElement(Icon, {
      name: "circle",
      size: 18,
      color: ColorPalette.brand.primary
    }),
    onPress: () => onPress(id),
    isChecked: selected,
    disableBuiltInState: true
  })));
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: mediators,
    keyExtractor: item => item.id,
    renderItem: ({
      item
    }) => /*#__PURE__*/React.createElement(MediatorRow, {
      label: item.label.split('?')[0],
      id: item.id,
      testID: item.testID,
      selected: store.preferences.selectedMediator === item.id,
      onPress: handleMediatorChange
    })
  }), isModalVisible && /*#__PURE__*/React.createElement(DismissiblePopupModal, {
    title: t('Settings.ChangeMediator'),
    description: t('Settings.ChangeMediatorDescription'),
    onCallToActionLabel: t('Global.Confirm'),
    onCallToActionPressed: () => confirmMediatorChange(),
    onDismissPressed: () => setIsModalVisible(false)
  }));
};
export default ConfigureMediator;
//# sourceMappingURL=ConfigureMediator.js.map