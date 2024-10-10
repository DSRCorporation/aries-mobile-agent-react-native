import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderRightHome from '../components/buttons/HeaderHome'
import { TOKENS, useServices } from '../container-api'
import { useTheme } from '../contexts/theme'
import { DeliveryStackParams, Screens } from '../types/navigators'

import { useDefaultStackOptions } from './defaultStackOptions'

const DeliveryStack: React.FC = () => {
  const Stack = createStackNavigator<DeliveryStackParams>()
  const { t } = useTranslation()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)

  const [CredentialOffer, ProofRequest, Connection] = useServices([
    TOKENS.SCREEN_CREDENTIAL_OFFER,
    TOKENS.SCREEN_PROOF_REQUEST,
    TOKENS.SCREEN_CONNECTION,
  ])

  return (
    <Stack.Navigator
      initialRouteName={Screens.Connection}
      screenOptions={{
        ...defaultStackOptions,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerShown: true,
        presentation: 'modal',
        headerLeft: () => null,
        headerRight: () => <HeaderRightHome />,
      }}
    >
      <Stack.Screen
        name={Screens.Connection}
        component={Connection}
        options={{ ...defaultStackOptions, headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ProofRequest}
        component={ProofRequest}
        options={{ title: t('Screens.ProofRequest') }}
      />
      <Stack.Screen
        name={Screens.CredentialOffer}
        component={CredentialOffer}
        options={{ title: t('Screens.CredentialOffer') }}
      />
    </Stack.Navigator>
  )
}

export default DeliveryStack
