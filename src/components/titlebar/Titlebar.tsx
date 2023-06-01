import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { platform } from '@tauri-apps/api/os';
import { appWindow } from '@tauri-apps/api/window';
import '../css/titlebar.css';

import { EChampions } from '../../imports/enums/lol';
import { IPageState, ISelectedChamps } from '../../imports/interfaces';

import { caretDownIcon, refreshIcon, minIcon, maxIcon, closeIcon, settingsIconAngled } from '../../imports/icons';

import { TitlebarNavButton, TitlebarNavButtonToggle } from './TitlebarNavigationButton';
import TitlebarControlsButton from './TitlebarControlsButton';

const platformName = await platform();

const Titlebar: React.FC<{
    pageState: IPageState,
    fNavigatePage: (page: string) => void
    fNavigateDirection: (dir: number) => void,
    fRefreshPlayers: () => void
}> = ({ pageState, fNavigatePage, fNavigateDirection, fRefreshPlayers }) => {
    const location = useLocation();
    const { t } = useTranslation('common');

    return (
        <div
            data-tauri-drag-region={true}
            className="titlebar"
            onClick={(e) => {e.preventDefault(); e.stopPropagation()}} >
            <div className={`titlebar-inner ${platformName === "darwin" ? "titlebar-padding-windows" : null}`}>
                <div className={`refresh-group ${location.pathname === "/settings" ? "refresh-group-disabled" : null}`}>
                    <div className={`titlebar-button-group`}>
                        <TitlebarNavButton
                            buttonIcon={refreshIcon}
                            buttonClasses={`nav-refresh nav-button`}
                            onClick={() => fRefreshPlayers()} />
                        <span className='refresh-text noselect'>{t('titlebar.lastRefresh', { insert: '8:34 PM' })}</span>
                        <img src={caretDownIcon} alt="icon" className="titlebar-refresh-caret" />
                    </div>
                </div>

                <div className='controls-group'>
                    <TitlebarNavButtonToggle
                        buttonIcon={settingsIconAngled}
                        buttonToggled={location.pathname === "/settings"}
                        buttonClasses={`nav-settings nav-button ${location.pathname === "/settings" ? "nav-button-toggled" : null}`}
                        onToggle={() => fNavigatePage("/settings")} />

                    {platformName === "win32" ?
                        <div className={`controls-container`}>
                            <TitlebarControlsButton buttonIcon={minIcon} buttonId={"titlebar-minimize"} onClick={() => appWindow.minimize()} />
                            <TitlebarControlsButton buttonIcon={maxIcon} buttonId={"titlebar-maximize"} onClick={() => appWindow.toggleMaximize()} />
                            <TitlebarControlsButton buttonIcon={closeIcon} buttonId={"titlebar-close"} onClick={() => appWindow.close()} />
                        </div>
                    : null}
                </div>
            </div>
        </div>
    )
}

export default Titlebar