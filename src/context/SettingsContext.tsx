
import React, { createContext, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { Store } from 'tauri-plugin-store-api';

import { ILanguageResources, IReducerAction, ISettingsStates } from "../imports/interfaces";
import { ESettingsStates as SS } from "../imports/enums/states";
import { ELanguages } from "../imports/enums/ui"
import { sortLanguages, mapEnum, mapEnumKeys } from "../imports/utils";
import { useInit } from '../imports/initializers';

// TODO: Overhaul these settings.

const SS_DEFAULTS = [
    0,      // LIST_LAYOUT
    false,  // AUTO_REFRESH
    5,      // REFRESH_INTERVAL
    true,   // SHOW_SUMMONER_IDS
    false,  // SHOW_RANDOM_SKINS
    false,  // SHOW_TEAM_LOGOS
    true,   // SHOW_UNAVAILABLE
    0,      // APP_THEME
    0,      // APP_SCALE
    false,  // OPEN_ON_STARTUP
    true,   // MINIMIZE_TO_TRAY
    false,  // HARDWARE_ACCELERATION
    true,   // ANIMATIONS
    false,  // USE_BACKGROUND
    true,   // RANDOM_BACKGROUND
    false,  // LIVE_BACKGROUND
    false,  // KEYBOARD_MODE
    true,   // NOTIFICATIONS
    0       // APP_LANGUAGE
];
const BOOLS: string[] = [ SS.AUTO_REFRESH, SS.SHOW_SUMMONER_IDS, SS.SHOW_RANDOM_SKINS, SS.SHOW_TEAM_LOGOS, SS.SHOW_UNAVAILABLE, SS.OPEN_ON_STARTUP, SS.MINIMIZE_TO_TRAY, SS.HARDWARE_ACCELERATION, SS.ANIMATIONS, SS.USE_BACKGROUND, SS.RANDOM_BACKGROUND, SS.LIVE_BACKGROUND, SS.KEYBOARD_MODE, SS.NOTIFICATIONS ];
const NUMS: string[] = [ SS.LIST_LAYOUT, SS.REFRESH_INTERVAL, SS.APP_THEME, SS.APP_SCALE, SS.APP_LANGUAGE ];
const LANGS = mapEnumKeys(ELanguages);

export const SettingsContext = createContext({
    listLayout: 0,
    autoRefresh: false,
    refreshInterval: 5,
    showSummonerIds: true,
    showRandomSkins: false,
    showTeamLogos: false,
    showUnavailable: true,
    appTheme: 0,
    appScale: 0,
    openOnStartup: false,
    minimizeToTray: true,
    hardwareAcceleration: false,
    showAnimations: true,
    useBackground: false,
    randomBackground: true,
    liveBackground: false,
    keyboardMode: false,
    notifications: true,
    appLanguage: 0,
    langs: [] as ILanguageResources,
    updateSetting: (key: string, val: any) => { },
    getSetting: (key: string): any => { }
})

const settingsReducer = (state: ISettingsStates, action: IReducerAction): ISettingsStates => {
    if (BOOLS.includes(action.type)) { return { ...state, [action.type]: action.payload as boolean } };
    if (NUMS.includes(action.type)) { return { ...state, [action.type]: action.payload as number } };

    return state;
}

const SettingsProvider: React.FC<{
    langs: ILanguageResources,
    children: React.ReactNode
}> = ({ langs, children }) => {
    const settingsStore = new Store('.settings.dat');
    const { i18n } = useTranslation('common');

    const [state, dispatch] = useReducer(settingsReducer, {
        listLayout: 0, autoRefresh: false, refreshInterval: 5, showSummonerIds: true, showRandomSkins: false, showTeamLogos: false, showUnavailable: true, appTheme: 0, appScale: 0, openOnStartup: false, minimizeToTray: true, hardwareAcceleration: false, showAnimations: true, useBackground: false, randomBackground: true, liveBackground: false, keyboardMode: false, notifications: true, appLanguage: 0
    });
    const [_langs, setLangs] = useState(sortLanguages(langs));

    useInit(() => {
        const initSettings = async () => {
            settingsStore.load();
            // settingsStore.reset();

            mapEnum(SS, "string", async (redState: SS, i: number) => {
                const value = await settingsStore.get(redState);
                dispatch({ type: redState, payload: checkSet(redState, value, SS_DEFAULTS[i]) });

                // Sets stored language from save
                if (redState == SS.APP_LANGUAGE) {
                    const savedLang = _langs.map((lang) => lang.lang).at(value as number);
                    i18n.changeLanguage(savedLang);
                }
            })
            

            settingsStore.save();
        };

        const checkSet = (key: string, val: any, def: any): any => {
            if (val == null) {
                settingsStore.set(key, def);
                return def;
            }
            return val;
        }

        initSettings();
    });

    const updateSetting = (key: string, val: any): void => {
        dispatch({ type: key, payload: val });

        settingsStore.set(key, val);
        settingsStore.save();
    }

    const getSetting = async (key: string): Promise<any> => {
        const setting = await settingsStore.get(key);
        return setting;
    }

    return (
        <SettingsContext.Provider value={{
            listLayout: state.listLayout,
            autoRefresh: state.autoRefresh,
            refreshInterval: state.refreshInterval,
            showSummonerIds: state.showSummonerIds,
            showRandomSkins: state.showRandomSkins,
            showTeamLogos: state.showTeamLogos,
            showUnavailable: state.showUnavailable,
            appTheme: state.appTheme,
            appScale: state.appScale,
            openOnStartup: state.openOnStartup,
            minimizeToTray: state.minimizeToTray,
            hardwareAcceleration: state.hardwareAcceleration,
            showAnimations: state.showAnimations,
            useBackground: state.useBackground,
            randomBackground: state.randomBackground,
            liveBackground: state.liveBackground,
            keyboardMode: state.keyboardMode,
            notifications: state.notifications,
            appLanguage: state.appLanguage,
            langs: _langs,

            updateSetting, getSetting,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;