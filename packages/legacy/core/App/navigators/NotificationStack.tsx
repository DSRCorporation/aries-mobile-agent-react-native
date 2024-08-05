import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TOKENS, useContainer } from '../container-api'
import { useTheme } from '../contexts/theme'
import { NotificationStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

const NotificationStack: React.FC = () => {
  const Stack = createStackNavigator<NotificationStackParams>()
  const theme = useTheme()
  const { t } = useTranslation()
  const defaultStackOptions = createDefaultStackOptions(theme)

  const container = useContainer()
  const CredentialDetails = container.resolve(TOKENS.SCREEN_CREDENTIAL_DETAILS)
  const CredentialOffer = container.resolve(TOKENS.SCREEN_CREDENTIAL_OFFER)
  const ProofRequest = container.resolve(TOKENS.SCREEN_PROOF_REQUEST)
  const { customNotificationConfig: customNotification } = container.resolve(TOKENS.NOTIFICATIONS)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.CredentialDetails}
        component={CredentialDetails}
        options={{ title: t('Screens.CredentialDetails') }}
      />
      <Stack.Screen
        name={Screens.CredentialOffer}
        component={CredentialOffer}
        options={{ title: t('Screens.CredentialOffer') }}
      />
      <Stack.Screen
        name={Screens.ProofRequest}
        component={ProofRequest}
        options={{ title: t('Screens.ProofRequest') }}
      />
      {customNotification && (
        <Stack.Screen
          name={Screens.CustomNotification}
          component={customNotification.component}
          options={{ title: t(customNotification.pageTitle as any) }}
        />
      )}
      {customNotification &&
        customNotification.additionalStackItems?.length &&
        customNotification.additionalStackItems.map((item) => (
          <Stack.Screen name={item.name as any} component={item.component} options={item.stackOptions}></Stack.Screen>
        ))}
    </Stack.Navigator>
  )
}

export default NotificationStack
