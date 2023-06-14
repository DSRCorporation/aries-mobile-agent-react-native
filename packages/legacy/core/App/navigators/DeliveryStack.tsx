import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderRightHome from '../components/buttons/HeaderHome'
import { useConfiguration } from '../contexts/configuration'
import { useTheme } from '../contexts/theme'
import Connection from '../screens/Connection'
import CredentialOffer from '../screens/CredentialOffer'
import ProofRequest from '../screens/ProofRequest'
import { DeliveryStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

const DeliveryStack: React.FC = () => {
  const Stack = createStackNavigator<DeliveryStackParams>()
  const { t } = useTranslation()
  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)
  const { showHeader } = useConfiguration()

  return (
    <Stack.Navigator
      initialRouteName={Screens.Connection}
      screenOptions={{
        ...defaultStackOptions,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerShown: showHeader ?? true,
        presentation: 'modal',
        headerLeft: () => null,
        headerRight: () => <HeaderRightHome />,
      }}
    >
      <Stack.Screen name={Screens.Connection} component={Connection} options={{ ...defaultStackOptions }} />
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
