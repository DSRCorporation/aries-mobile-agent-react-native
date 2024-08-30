import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import SettingsMenu from '../components/buttons/SettingsMenu'
import { TOKENS, useContainer } from '../container-api'
import { useTheme } from '../contexts/theme'
import { CredentialStackParams, Screens } from '../types/navigators'

import { useDefaultStackOptions } from './defaultStackOptions'
import { TOKENS, useServices } from '../container-api'

const CredentialStack: React.FC = () => {
  const Stack = createStackNavigator<CredentialStackParams>()
  const theme = useTheme()
  const { t } = useTranslation()
  const [CredentialListHeaderRight] = useServices([TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT])
  const defaultStackOptions = useDefaultStackOptions(theme)

  const container = useContainer()
  const ListCredentials = container.resolve(TOKENS.SCREEN_CREDENTIAL_LIST)
  const CredentialDetails = container.resolve(TOKENS.SCREEN_CREDENTIAL_DETAILS)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.Credentials}
        component={ListCredentials}
        options={() => ({
          title: t('Screens.Credentials'),
          headerRight: () => <CredentialListHeaderRight />,
          headerLeft: () => <SettingsMenu />,
        })}
      />
      <Stack.Screen
        name={Screens.CredentialDetails}
        component={CredentialDetails}
        options={{ title: t('Screens.CredentialDetails') }}
      />
    </Stack.Navigator>
  )
}

export default CredentialStack
