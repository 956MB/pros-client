import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import '../css/settings.css';
import { ESettingsStates, ESettingsSections } from '../../imports/enums/states';
import {ISettingsItems, ISettingsItemValueLanguage, ISettingsPages} from '../../imports/interfaces';
import { SettingsItemBoolean, SettingsItemSpacer, SettingsItemSelector, FormSettingsPage, FormSettingsPageLang, isPageActive, THEMES, SCALES, SettingsItemTitle } from '../../imports/utils';
import { SettingsItem, SettingsItemLanguage, SettingsItemSpacerElement, SettingsItemTitleElement } from "./SettingsItem";

import { SettingsContext } from "../../context/SettingsContext";

import { SettingsPage, SettingsPageButton } from './SettingsPage';
import { SettingsPageAbout } from './SettingsPageAbout';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useLocation } from 'react-router-dom';

const Settings: React.FC<{
    fRefreshBackground: () => void,
    fNavigatePage: (page: string) => void
}> = ({ fRefreshBackground, fNavigatePage }) => {
    const { langs } = useContext(SettingsContext);
    const [isMounted, setIsMounted] = useState(true);

    const navigatePageCallback = () => {
        setIsMounted(false);
        setTimeout(() => {
            fNavigatePage("/");
        }, 150);
    }
    const ref = useDetectClickOutside({
        onTriggered: () =>  navigatePageCallback(),
        disableClick: true,
        triggerKeys: ['Escape'],
    });

    const [settings, setSettings] = useState<ISettingsItems>([
        SettingsItemTitle('settings.title', () =>  navigatePageCallback()),
        SettingsItemSpacer('settings.pages.language.title'),
        SettingsItemSelector(ESettingsSections.APPLICATION, ESettingsStates.APP_LANGUAGE, 0, langs.map((lang) => lang.text), langs.map((lang) => lang.lang), true),
        SettingsItemSpacer('settings.pages.application.title'),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.OPEN_ON_STARTUP, false),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.MINIMIZE_TO_TRAY, true),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.HARDWARE_ACCELERATION, false),
        SettingsItemSpacer('settings.pages.accessability.title'),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.ANIMATIONS, true),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.KEYBOARD_MODE, false),
        SettingsItemBoolean(ESettingsSections.APPLICATION, ESettingsStates.NOTIFICATIONS, true),
        SettingsItemSpacer('settings.pages.content.title'),
        SettingsItemBoolean(ESettingsSections.CONTENT, ESettingsStates.AUTO_REFRESH, false),
        SettingsItemSelector(ESettingsSections.CONTENT, ESettingsStates.LIST_LAYOUT, 0, [
            "card", "list"
        ]),
        SettingsItemBoolean(ESettingsSections.CONTENT, ESettingsStates.SHOW_SUMMONER_IDS, true),
        SettingsItemBoolean(ESettingsSections.CONTENT, ESettingsStates.SHOW_UNAVAILABLE, true)
    ]);

    return (
        <AnimatePresence>
            {isMounted && (
                <motion.div
                    ref={ref}
                    key="settings-modal"
                    className='settings-outer'
                    initial={{ opacity: 0, scale: 1.10 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.10 }}
                    transition={{ type: "spring", damping: 15, stiffness: 250, duration: 0.055 }}
                >
                    <SettingsInner
                        settingsItems={settings} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const SettingsInner: React.FC<{
    settingsItems: ISettingsItems
}> = ({ settingsItems }) => {
    const { t } = useTranslation('common');
    const [pageActive, setPageActive] = useState<number>(0);
    const FPageSwitch = (active: number) => { setPageActive(active); }

    return (
        <div className={`settings-inner`} >
            <div className='settings-content'>
                <div className='settings-page-container'>
                    {React.Children.toArray(
                        settingsItems.map((item, i) => {
                            if (item.itemValue.type === 'title') { return <SettingsItemTitleElement settingsItem={item} /> }
                            if (item.itemValue.type === 'spacer') { return <SettingsItemSpacerElement settingsItem={item} /> }

                            return <SettingsItem
                                settingsItem={item}
                                itemZIndex={settingsItems.length - i}></SettingsItem>
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings