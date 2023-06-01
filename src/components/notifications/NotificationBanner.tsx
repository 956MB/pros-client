import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../css/notifications.css';
import { INotification, INotificationPlayer } from '../../imports/interfaces';

import { SettingsContext } from '../../context/SettingsContext';

const NotificationBanner: React.FC<{
    notificationContent: INotificationPlayer,
    fCloseAction: () => void
}> = ({ notificationContent, fCloseAction }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds, showRandomSkins } = useContext(SettingsContext);

    const [notificationHovered, setNotificationHovered] = useState<boolean>(false);
    const [notificationIntervalActive, setNotificationIntervalActive] = useState<boolean>(false);
    const [notificationInterval, setNotificationInterval] = useState<number>(5);

    useEffect(() => {
        if (notificationIntervalActive && notificationContent.visible) {
            let interval = setInterval(() => {
                setNotificationInterval(notificationInterval - 1);
                if (notificationInterval === 0) { setNotificationInterval(5); }
            }, 1000)

            return () => {
                clearInterval(interval);
            };
        }
    });

    return (
        <div
            className={`notification-banner ${(!notificationContent.visible || notificationContent.player == undefined) ? "notif-off" : ""}`}
            onMouseEnter={() => setNotificationHovered(true)}
            onMouseLeave={() => setNotificationHovered(false)}>

            { notificationContent.player ?
                <div className={`notification-inner`}>
                    <div
                        className='notification-photo noselect'
                        style={{ backgroundImage: `url(src/assets/logos/color/${notificationContent.player.playerInfo.team.short}.png)` }}>
                    </div>

                    <div className={`notification-banner-text-container`}>
                        <span className={`notification-banner-name noselect`}>{showSummonerIds ? notificationContent.player.playerAccount.summonerName : notificationContent.player.playerInfo.playerName}</span>
                        <span className={`notification-banner-text noselect`}>{t(`notifications.gameStart`)}</span>
                    </div>
                </div>
            : null}

            { !notificationHovered
            ?
            <div className={`notification-close`}>
                <span>{`${notificationInterval}s`}</span>
            </div>
            :
            <div className={`notification-close`}>
                <img src="/src/assets/icons/UIcons/fi-rs-cross-small.svg" alt="icon"></img>
            </div>
            }
        </div>
    )
}

export default NotificationBanner