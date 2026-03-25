import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Button, { ButtonType } from '../buttons/Button';
import { testIdWithKey } from '../../utils/testable';
import { useTheme } from '../../contexts/theme';
import { useTranslation } from 'react-i18next';
import InfoTextBox from '../texts/InfoTextBox';
import { InfoBoxType } from '../misc/InfoBox';
import ProgressBar from './ProgressBar';
import RecordLoading from '../animated/RecordLoading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../texts/ThemedText';
export const LoadingPlaceholderWorkflowType = {
  Connection: 'Connection',
  ReceiveOffer: 'ReceiveOffer',
  ProofRequested: 'ProofRequested'
};
// TODO:(jl) Add `AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'))
// when the timeout is triggered.

const LoadingPlaceholder = ({
  workflowType,
  timeoutDurationInMs = 10000,
  loadingProgressPercent = 0,
  onCancelTouched,
  onTimeoutTriggered,
  testID
}) => {
  const {
    ListItems
  } = useTheme();
  const {
    t
  } = useTranslation();
  const timerRef = useRef(null);
  const [overtime, setOvertime] = useState(false);
  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1
    },
    container: {
      flex: 1,
      marginTop: 8,
      marginHorizontal: 20
    },
    buttonContainer: {
      marginVertical: 25
    },
    link: {
      ...ListItems.recordAttributeText,
      ...ListItems.recordLink
    },
    loadingAnimationContainer: {
      flex: 1,
      flexGrow: 1,
      borderRadius: 15
    },
    infoTextBoxContainer: {
      flexShrink: 1
    }
  });
  useEffect(() => {
    if (timeoutDurationInMs === 0) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setOvertime(true);
      if (onTimeoutTriggered) {
        onTimeoutTriggered();
      }
    }, timeoutDurationInMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeoutDurationInMs, onTimeoutTriggered]);
  const textForProgressIndication = useCallback(() => {
    switch (workflowType) {
      case LoadingPlaceholderWorkflowType.Connection:
        return t('LoadingPlaceholder.Connecting');
      case LoadingPlaceholderWorkflowType.ProofRequested:
        return t('LoadingPlaceholder.ProofRequest');
      case LoadingPlaceholderWorkflowType.ReceiveOffer:
        return t('LoadingPlaceholder.CredentialOffer');
    }
  }, [workflowType, t]);
  const textForWorkflowType = useCallback(() => {
    switch (workflowType) {
      case LoadingPlaceholderWorkflowType.ProofRequested:
        return t('LoadingPlaceholder.YourRequest');
      case LoadingPlaceholderWorkflowType.ReceiveOffer:
        return t('LoadingPlaceholder.YourOffer');
      default:
        return t('LoadingPlaceholder.Connecting');
    }
  }, [workflowType, t]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.safeAreaView,
    testID: testID ?? testIdWithKey('LoadingPlaceholder'),
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(ScrollView, null, loadingProgressPercent > 0 && /*#__PURE__*/React.createElement(ProgressBar, {
    progressPercent: loadingProgressPercent
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "label",
    style: {
      textAlign: 'center',
      fontWeight: 'normal'
    }
  }, textForProgressIndication()), overtime && /*#__PURE__*/React.createElement(InfoTextBox, {
    type: InfoBoxType.Info,
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.infoTextBoxContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "title",
    style: {
      fontWeight: 'bold',
      marginBottom: 10
    },
    testID: testIdWithKey('SlowLoadTitle')
  }, t('LoadingPlaceholder.SlowLoadingTitle')), /*#__PURE__*/React.createElement(ThemedText, {
    testID: testIdWithKey('SlowLoadBody')
  }, t('LoadingPlaceholder.SlowLoadingBody')))), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      marginTop: 25,
      marginBottom: 10
    }
  }, textForWorkflowType()), /*#__PURE__*/React.createElement(View, {
    style: styles.loadingAnimationContainer
  }, /*#__PURE__*/React.createElement(RecordLoading, null), /*#__PURE__*/React.createElement(RecordLoading, {
    style: {
      marginTop: 10
    }
  })), onCancelTouched && /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    testID: testIdWithKey('Cancel'),
    buttonType: ButtonType.Primary,
    onPress: onCancelTouched
  })))));
};
export default LoadingPlaceholder;
//# sourceMappingURL=LoadingPlaceholder.js.map