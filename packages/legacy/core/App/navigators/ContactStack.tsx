import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderRightHome from '../components/buttons/HeaderHome'
import { TOKENS, useServices } from '../container-api'
import { useTheme } from '../contexts/theme'
import Chat from '../screens/Chat'
import ListContacts from '../screens/ListContacts'
import RenameContact from '../screens/RenameContact'
import WhatAreContacts from '../screens/WhatAreContacts'
import { ContactStackParams, Screens } from '../types/navigators'

import { useDefaultStackOptions } from './defaultStackOptions'

const ContactStack: React.FC = () => {
  const Stack = createStackNavigator<ContactStackParams>()
  const theme = useTheme()
  const { t } = useTranslation()
  const defaultStackOptions = useDefaultStackOptions(theme)

  const [ContactDetails, CredentialDetails, CredentialOffer, ProofRequest, ProofDetails] = useServices([
    TOKENS.SCREEN_CONNECTION_DETAILS,
    TOKENS.SCREEN_CREDENTIAL_DETAILS,
    TOKENS.SCREEN_CREDENTIAL_OFFER,
    TOKENS.SCREEN_PROOF_REQUEST,
    TOKENS.SCREEN_PROOF_DETAILS,
  ])

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen name={Screens.Contacts} component={ListContacts} options={{ title: t('Screens.Contacts') }} />
      <Stack.Screen
        name={Screens.ContactDetails}
        component={ContactDetails}
        options={{
          title: t('Screens.ContactDetails'),
        }}
      />
      <Stack.Screen
        name={Screens.RenameContact}
        component={RenameContact}
        options={{ title: t('Screens.RenameContact') }}
      />
      <Stack.Screen name={Screens.Chat} component={Chat} />
      <Stack.Screen name={Screens.WhatAreContacts} component={WhatAreContacts} options={{ title: '' }} />
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
        name={Screens.ProofDetails}
        component={ProofDetails}
        options={() => ({
          title: '',
          headerRight: () => <HeaderRightHome />,
        })}
      />
      <Stack.Screen
        name={Screens.ProofRequest}
        component={ProofRequest}
        options={{ title: t('Screens.ProofRequest') }}
      />
    </Stack.Navigator>
  )
}

export default ContactStack
