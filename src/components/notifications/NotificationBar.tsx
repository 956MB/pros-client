import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../css/notifications.css';
import { INotification } from '../../imports/interfaces';
import parse from 'html-react-parser';

const NotificationBar: React.FC<{
    notificationContent: INotification
}> = ({ notificationContent }) => {
    const [notificationHovered, setNotificationHovered] = useState<boolean>(false);
    const fCloseNotification = () => {
        console.log("test print")
    }

    return (
        <div
            className={`notification-bar ${!notificationContent.visible ? "notif-off" : ""}`}
            onMouseEnter={() => setNotificationHovered(true)}
            onMouseLeave={() => setNotificationHovered(false)}>
            <span className={`notification-content-text noselect`}>{parse(notificationContent.content)}</span>

            { !notificationHovered
                ?
                <div className={`notification-close`}>
                    <span>{`3s`}</span>
                </div>
                :
                <div className={`notification-close`}>
                    <img src="/src/assets/icons/UIcons/fi-bs-cross-small.svg" alt="icon"></img>
                </div>
            }
        </div>
    )
}

export default NotificationBar