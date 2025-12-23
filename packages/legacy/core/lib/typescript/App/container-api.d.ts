import { Agent, BaseLogger, BasicMessageRecord, ProofExchangeRecord, CredentialExchangeRecord as CredentialRecord } from '@credo-ts/core';
import { IndyVdrPoolConfig } from '@credo-ts/indy-vdr';
import { ProofRequestTemplate } from '@hyperledger/aries-bifold-verifier';
import { OCABundleResolverType } from '@hyperledger/aries-oca/build/legacy';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { DependencyContainer } from 'tsyringe';
import { Button } from './components/buttons/Button-api';
import { ReducerAction } from './contexts/reducers/store';
import { IHistoryManager } from './modules/history';
import Onboarding from './screens/Onboarding';
import { AttestationMonitor } from './types/attestation';
import { GenericFn } from './types/fn';
import { AuthenticateStackParams, ScreenOptionsType } from './types/navigators';
import { CustomNotification, CustomNotificationRecord } from './types/notification';
import CredentialCard from './components/misc/CredentialCard';
import Settings from './screens/Settings';
import { Config } from './types/config';
import { EmptyListProps } from './components/misc/EmptyList';
import { NotificationListItemProps } from './components/listItems/NotificationListItem';
import { PINCreateHeaderProps } from './components/misc/PINCreateHeader';
import Connection from './screens/Connection';
import ContactDetails from "./screens/ContactDetails";
import PINEnter from './screens/PINEnter';
import PINCreate from './screens/PINCreate';
import Language from './screens/Language';
import AttemptLockout from './screens/AttemptLockout';
import ProofDetails from './screens/ProofDetails';
import ListContacts from './screens/ListContacts';
import WhatAreContacts from './screens/WhatAreContacts';
import Chat from './screens/Chat';
export type FN_ONBOARDING_DONE = (dispatch: React.Dispatch<ReducerAction<unknown>>, navigation: StackNavigationProp<AuthenticateStackParams>) => GenericFn;
type LoadStateFn = (dispatch: React.Dispatch<ReducerAction<unknown>>) => Promise<void>;
type ProofRequestTemplateFn = (useDevTemplates: boolean) => Array<ProofRequestTemplate>;
type HOOK_USE_DEEPLINKS = () => void;
export declare const PROOF_TOKENS: {
    readonly GROUP_BY_REFERENT: "proof.groupByReferant";
    readonly CRED_HELP_ACTION_OVERRIDES: "proof.credHelpActionOverride";
};
export declare const SCREEN_TOKENS: {
    readonly SCREEN_PREFACE: "screen.preface";
    readonly SCREEN_TERMS: "screen.terms";
    readonly SCREEN_ONBOARDING: "screen.onboarding";
    readonly SCREEN_DEVELOPER: "screen.developer";
    readonly SCREEN_SETTINGS: "screen.settings";
    readonly SCREEN_CONNECTION: "screen.connection";
    readonly SCREEN_CONNECTION_DETAILS: "screen.connection.details";
    readonly SCREEN_CONNECTION_LIST: "screen.connection.list";
    readonly SCREEN_ONBOARDING_ITEM: "screen.onboarding.item";
    readonly SCREEN_CREDENTIAL_LIST: "screen.credential.list";
    readonly SCREEN_CREDENTIAL_DETAILS: "screen.credential.details";
    readonly SCREEN_CREDENTIAL_OFFER: "screen.credential.offer";
    readonly SCREEN_PROOF_REQUEST: "screen.proof.request";
    readonly SCREEN_ONBOARDING_PAGES: "screen.onboarding.pages";
    readonly SCREEN_SPLASH: "screen.splash";
    readonly SCREEN_SCAN: "screen.scan";
    readonly SCREEN_USE_BIOMETRY: "screen.use-biometry";
    readonly SCREEN_PIN_CREATE: "screen.pin-create";
    readonly SCREEN_PIN_ENTER: "screen.pin-enter";
    readonly SCREEN_ATTEMPT_LOCKOUT: "screen.attempt-lockout";
    readonly SCREEN_LANGUAGE: "screen.language";
    readonly SCREEN_PROOF_DETAILS: "screen.proof.details";
    readonly SCREEN_WHAT_ARE_CONTACTS: "screen.what-are-contacts";
    readonly SCREEN_CHAT: "screen.chat";
};
export declare const COMPONENT_TOKENS: {
    readonly COMPONENT_HOME_HEADER: "component.home.header";
    readonly COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST: "component.home.notifications-empty-list";
    readonly COMPONENT_HOME_FOOTER: "component.home.footer";
    readonly COMPONENT_CRED_EMPTY_LIST: "component.cred.empty-list";
    readonly COMPONENT_RECORD: "component.record";
    readonly COMPONENT_PIN_CREATE_HEADER: "component.pin-create-header";
};
export declare const NOTIFICATION_TOKENS: {
    readonly NOTIFICATIONS: "notification.list";
    readonly NOTIFICATIONS_LIST_ITEM: "notification.list-item";
};
export declare const STACK_TOKENS: {
    readonly STACK_ONBOARDING: "stack.onboarding";
    readonly STACK_TAB: "stack.tab";
    readonly STACK_HOME: "stack.home";
    readonly STACK_CREDENTIAL: "stack.credential";
};
export declare const FN_TOKENS: {
    readonly FN_ONBOARDING_DONE: "fn.onboardingDone";
    readonly COMPONENT_CRED_LIST_HEADER_RIGHT: "fn.credListHeaderRight";
    readonly COMPONENT_CRED_LIST_OPTIONS: "fn.credListOptions";
};
export declare const HOOK_TOKENS: {
    readonly HOOK_USE_DEEPLINKS: "hook.useDeeplinks";
};
export declare const HISTORY_TOKENS: {
    readonly FN_LOAD_HISTORY: "fn.loadHistory";
    readonly HISTORY_ENABLED: "history.enabled";
};
export declare const COMP_TOKENS: {
    readonly COMP_BUTTON: "comp.button";
    readonly COMP_CREDENTIAL_CARD: "comp.credentialCard";
};
export declare const SERVICE_TOKENS: {
    readonly SERVICE_TERMS: "screen.terms";
};
export declare const LOAD_STATE_TOKENS: {
    readonly LOAD_STATE: "state.load";
};
export declare const OBJECT_TOKENS: {
    readonly OBJECT_ONBOARDING_CONFIG: "object.onboarding-config";
};
export declare const CACHE_TOKENS: {
    readonly CACHE_CRED_DEFS: "cache.cred-defs";
    readonly CACHE_SCHEMAS: "cache.schemas";
};
export declare const UTILITY_TOKENS: {
    readonly UTIL_LOGGER: "utility.logger";
    readonly UTIL_OCA_RESOLVER: "utility.oca-resolver";
    readonly UTIL_LEDGERS: "utility.ledgers";
    readonly UTIL_PROOF_TEMPLATE: "utility.proof-template";
    readonly UTIL_ATTESTATION_MONITOR: "utility.attestation-monitor";
};
export declare const CONFIG_TOKENS: {
    readonly CONFIG: "config";
};
export declare const TOKENS: {
    readonly FN_LOAD_HISTORY: "fn.loadHistory";
    readonly HISTORY_ENABLED: "history.enabled";
    readonly CONFIG: "config";
    readonly UTIL_LOGGER: "utility.logger";
    readonly UTIL_OCA_RESOLVER: "utility.oca-resolver";
    readonly UTIL_LEDGERS: "utility.ledgers";
    readonly UTIL_PROOF_TEMPLATE: "utility.proof-template";
    readonly UTIL_ATTESTATION_MONITOR: "utility.attestation-monitor";
    readonly CACHE_CRED_DEFS: "cache.cred-defs";
    readonly CACHE_SCHEMAS: "cache.schemas";
    readonly OBJECT_ONBOARDING_CONFIG: "object.onboarding-config";
    readonly LOAD_STATE: "state.load";
    readonly COMP_BUTTON: "comp.button";
    readonly COMP_CREDENTIAL_CARD: "comp.credentialCard";
    readonly HOOK_USE_DEEPLINKS: "hook.useDeeplinks";
    readonly FN_ONBOARDING_DONE: "fn.onboardingDone";
    readonly COMPONENT_CRED_LIST_HEADER_RIGHT: "fn.credListHeaderRight";
    readonly COMPONENT_CRED_LIST_OPTIONS: "fn.credListOptions";
    readonly NOTIFICATIONS: "notification.list";
    readonly NOTIFICATIONS_LIST_ITEM: "notification.list-item";
    readonly STACK_ONBOARDING: "stack.onboarding";
    readonly STACK_TAB: "stack.tab";
    readonly STACK_HOME: "stack.home";
    readonly STACK_CREDENTIAL: "stack.credential";
    readonly SERVICE_TERMS: "screen.terms";
    readonly SCREEN_PREFACE: "screen.preface";
    readonly SCREEN_TERMS: "screen.terms";
    readonly SCREEN_ONBOARDING: "screen.onboarding";
    readonly SCREEN_DEVELOPER: "screen.developer";
    readonly SCREEN_SETTINGS: "screen.settings";
    readonly SCREEN_CONNECTION: "screen.connection";
    readonly SCREEN_CONNECTION_DETAILS: "screen.connection.details";
    readonly SCREEN_CONNECTION_LIST: "screen.connection.list";
    readonly SCREEN_ONBOARDING_ITEM: "screen.onboarding.item";
    readonly SCREEN_CREDENTIAL_LIST: "screen.credential.list";
    readonly SCREEN_CREDENTIAL_DETAILS: "screen.credential.details";
    readonly SCREEN_CREDENTIAL_OFFER: "screen.credential.offer";
    readonly SCREEN_PROOF_REQUEST: "screen.proof.request";
    readonly SCREEN_ONBOARDING_PAGES: "screen.onboarding.pages";
    readonly SCREEN_SPLASH: "screen.splash";
    readonly SCREEN_SCAN: "screen.scan";
    readonly SCREEN_USE_BIOMETRY: "screen.use-biometry";
    readonly SCREEN_PIN_CREATE: "screen.pin-create";
    readonly SCREEN_PIN_ENTER: "screen.pin-enter";
    readonly SCREEN_ATTEMPT_LOCKOUT: "screen.attempt-lockout";
    readonly SCREEN_LANGUAGE: "screen.language";
    readonly SCREEN_PROOF_DETAILS: "screen.proof.details";
    readonly SCREEN_WHAT_ARE_CONTACTS: "screen.what-are-contacts";
    readonly SCREEN_CHAT: "screen.chat";
    readonly COMPONENT_HOME_HEADER: "component.home.header";
    readonly COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST: "component.home.notifications-empty-list";
    readonly COMPONENT_HOME_FOOTER: "component.home.footer";
    readonly COMPONENT_CRED_EMPTY_LIST: "component.cred.empty-list";
    readonly COMPONENT_RECORD: "component.record";
    readonly COMPONENT_PIN_CREATE_HEADER: "component.pin-create-header";
    readonly GROUP_BY_REFERENT: "proof.groupByReferant";
    readonly CRED_HELP_ACTION_OVERRIDES: "proof.credHelpActionOverride";
};
export type FN_HISTORY_MANAGER = (agent: Agent<any>) => IHistoryManager;
export type TokenMapping = {
    [TOKENS.CRED_HELP_ACTION_OVERRIDES]: {
        credDefIds: string[];
        schemaIds: string[];
        action: (navigation: any) => void;
    }[];
    [TOKENS.GROUP_BY_REFERENT]: boolean;
    [TOKENS.SCREEN_PREFACE]: React.FC;
    [TOKENS.STACK_ONBOARDING]: React.FC;
    [TOKENS.STACK_TAB]: React.FC;
    [TOKENS.STACK_HOME]: React.FC;
    [TOKENS.STACK_CREDENTIAL]: React.FC;
    [TOKENS.SCREEN_TERMS]: {
        screen: React.FC;
        version: boolean | string;
    };
    [TOKENS.SCREEN_DEVELOPER]: React.FC;
    [TOKENS.SCREEN_ONBOARDING_PAGES]: (onTutorialCompleted: GenericFn, OnboardingTheme: any) => Array<Element>;
    [TOKENS.SCREEN_SPLASH]: React.FC;
    [TOKENS.SCREEN_SCAN]: React.FC;
    [TOKENS.SCREEN_USE_BIOMETRY]: React.FC;
    [TOKENS.SCREEN_ONBOARDING]: typeof Onboarding;
    [TOKENS.SCREEN_SETTINGS]: typeof Settings;
    [TOKENS.SCREEN_CONNECTION]: typeof Connection;
    [TOKENS.SCREEN_CONNECTION_DETAILS]: typeof ContactDetails;
    [TOKENS.SCREEN_CONNECTION_LIST]: typeof ListContacts;
    [TOKENS.SCREEN_CREDENTIAL_LIST]: React.FC;
    [TOKENS.SCREEN_CREDENTIAL_DETAILS]: React.FC;
    [TOKENS.SCREEN_CREDENTIAL_OFFER]: React.FC;
    [TOKENS.SCREEN_PROOF_REQUEST]: React.FC;
    [TOKENS.SCREEN_PIN_CREATE]: typeof PINCreate;
    [TOKENS.SCREEN_PIN_ENTER]: typeof PINEnter;
    [TOKENS.SCREEN_ATTEMPT_LOCKOUT]: typeof AttemptLockout;
    [TOKENS.SCREEN_LANGUAGE]: typeof Language;
    [TOKENS.SCREEN_PROOF_DETAILS]: typeof ProofDetails;
    [TOKENS.SCREEN_WHAT_ARE_CONTACTS]: typeof WhatAreContacts;
    [TOKENS.SCREEN_CHAT]: typeof Chat;
    [TOKENS.FN_ONBOARDING_DONE]: FN_ONBOARDING_DONE;
    [TOKENS.LOAD_STATE]: LoadStateFn;
    [TOKENS.COMP_BUTTON]: Button;
    [TOKENS.COMP_CREDENTIAL_CARD]: typeof CredentialCard;
    [TOKENS.NOTIFICATIONS]: {
        useNotifications: () => Array<BasicMessageRecord | CredentialRecord | ProofExchangeRecord | CustomNotificationRecord>;
        customNotificationConfig?: CustomNotification;
    };
    [TOKENS.NOTIFICATIONS_LIST_ITEM]: React.FC<NotificationListItemProps>;
    [TOKENS.OBJECT_ONBOARDING_CONFIG]: ScreenOptionsType;
    [TOKENS.COMPONENT_PIN_CREATE_HEADER]: React.FC<PINCreateHeaderProps>;
    [TOKENS.CACHE_CRED_DEFS]: {
        did: string;
        id: string;
    }[];
    [TOKENS.CACHE_SCHEMAS]: {
        did: string;
        id: string;
    }[];
    [TOKENS.UTIL_LOGGER]: BaseLogger;
    [TOKENS.UTIL_OCA_RESOLVER]: OCABundleResolverType;
    [TOKENS.UTIL_LEDGERS]: IndyVdrPoolConfig[];
    [TOKENS.UTIL_PROOF_TEMPLATE]: ProofRequestTemplateFn | undefined;
    [TOKENS.UTIL_ATTESTATION_MONITOR]: AttestationMonitor;
    [TOKENS.FN_LOAD_HISTORY]: FN_HISTORY_MANAGER;
    [TOKENS.HOOK_USE_DEEPLINKS]: HOOK_USE_DEEPLINKS;
    [TOKENS.HISTORY_ENABLED]: boolean;
    [TOKENS.CONFIG]: Config;
    [TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT]: React.FC;
    [TOKENS.COMPONENT_CRED_LIST_OPTIONS]: React.FC;
    [TOKENS.COMPONENT_HOME_HEADER]: React.FC;
    [TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST]: React.FC;
    [TOKENS.COMPONENT_HOME_FOOTER]: React.FC;
    [TOKENS.COMPONENT_CRED_EMPTY_LIST]: React.FC<EmptyListProps>;
    [TOKENS.COMPONENT_RECORD]: React.FC;
};
export interface Container {
    init(): Container;
    resolve<K extends keyof TokenMapping>(token: K): TokenMapping[K];
    resolveAll<K extends keyof TokenMapping, T extends K[]>(tokens: [...T]): {
        [I in keyof T]: TokenMapping[T[I]];
    };
    get container(): DependencyContainer;
}
export declare const ContainerContext: React.Context<Container | undefined>;
export declare const ContainerProvider: React.Provider<Container | undefined>;
export declare const useContainer: () => Container;
export declare const useServices: <K extends keyof TokenMapping, T extends K[]>(tokens: [...T]) => { [I in keyof T]: TokenMapping[T[I]]; };
export {};
//# sourceMappingURL=container-api.d.ts.map