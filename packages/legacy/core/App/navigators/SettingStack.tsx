import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter } from 'react-native'

import { EventTypes } from '../constants'
import { useTheme } from '../contexts/theme'
import HistorySettings from '../modules/history/ui/HistorySettings'
import DataRetention from '../screens/DataRetention'
import NameWallet from '../screens/NameWallet'
import { createCarouselStyle } from '../screens/OnboardingPages'
import PushNotification from '../screens/PushNotification'
import Tours from '../screens/Tours'
import { Screens, SettingStackParams } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import { useDefaultStackOptions } from './defaultStackOptions'
import { TOKENS, useServices } from '../container-api'

const SettingStack: React.FC = () => {
  const Stack = createStackNavigator<SettingStackParams>()
  const theme = useTheme()
  const [biometryUpdatePending, setBiometryUpdatePending] = useState<boolean>(false)
  const { t } = useTranslation()
  const [pages, { screen: terms }, UseBiometry, developer, PINCreate, Settings, Language, Onboarding] = useServices([
    TOKENS.SCREEN_ONBOARDING_PAGES,
    TOKENS.SCREEN_TERMS,
    TOKENS.SCREEN_USE_BIOMETRY,
    TOKENS.SCREEN_DEVELOPER,
    TOKENS.SCREEN_PIN_CREATE,
    TOKENS.SCREEN_SETTINGS,
    TOKENS.SCREEN_LANGUAGE,
    TOKENS.SCREEN_ONBOARDING,
  ])
  const defaultStackOptions = useDefaultStackOptions(theme)
  const OnboardingTheme = theme.OnboardingTheme
  const carousel = createCarouselStyle(OnboardingTheme)

  useEffect(() => {
    const handleBiometry = DeviceEventEmitter.addListener(EventTypes.BIOMETRY_UPDATE, (value: boolean) => {
      setBiometryUpdatePending(value)
    })

    return () => {
      handleBiometry.remove()
    }
  }, [])

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.Settings}
        component={Settings}
        options={{ title: t('Screens.Settings'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.NameWallet}
        component={NameWallet}
        options={{ title: t('Screens.NameWallet'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Language}
        component={Language}
        options={{ title: t('Screens.Language'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.DataRetention}
        component={DataRetention}
        options={{ title: t('Screens.DataRetention'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Tours}
        component={Tours}
        options={{ title: t('Screens.Tours'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.UseBiometry}
        component={UseBiometry}
        options={{
          title: t('Screens.Biometry'),
          headerLeft: biometryUpdatePending ? () => null : undefined,
          headerBackTestID: testIdWithKey('Back'),
        }}
      />
      {/* TODO: Find a way to resolve issues with StackScreen type in component below */}
      {/* Note that component has been inlined to make '@ts-ignore' work for 'component' prop */}
      {/* @ts-ignore */}
      <Stack.Screen name={Screens.CreatePIN} component={PINCreate}
                    options={{ title: t('Screens.ChangePIN'), headerBackTestID: testIdWithKey('Back') }}/>
      <Stack.Screen
        name={Screens.UsePushNotifications}
        component={PushNotification}
        options={{ title: t('Screens.UsePushNotifications'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Terms}
        component={terms}
        options={{ title: t('Screens.Terms'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Developer}
        component={developer}
        options={{ title: t('Screens.Developer'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen name={Screens.Onboarding} options={{ headerShown: false }}>
        {(props) => (
          <Onboarding
            {...props}
            nextButtonText={t('Global.Next')}
            previousButtonText={t('Global.Back')}
            pages={pages(() => null, OnboardingTheme)}
            style={carousel}
            disableSkip={true}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={Screens.HistorySettings}
        component={HistorySettings}
        options={{ title: t('Screens.HistorySettings'), headerBackTestID: testIdWithKey('Back') }}
      />
    </Stack.Navigator>
  )
}

export default SettingStack
