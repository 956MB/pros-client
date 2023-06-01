import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ETooltip } from '../../imports/enums/ui';
import '../css/sidebar.css';

import { ISidebarButton } from "../../imports/interfaces";
import {useInit} from "../../imports/initializers";

const SidebarButton: React.FC<{
    extraClass: string,
    buttonProps: ISidebarButton
}> = ({ extraClass, buttonProps }) => {
    const { t } = useTranslation('common');
    const location = useLocation();

    return (
        <div
            id={buttonProps.id}
            className={`${buttonProps.disabled ? 'sidebar-button-disabled' : ''} sidebar-button ${location.pathname === buttonProps.page ? 'sidebar-button-active' : ''} ${ETooltip.TOOLTIP} ${extraClass}`}
            onClick={buttonProps.action}
        >
            {/* { buttonProps.notif ? <div className={`notification-dot`}></div> : null } */}
            <img src={buttonProps.icon} alt="icon" />
            <span className={`${location.pathname === buttonProps.page ? ETooltip.RIGHT : ETooltip.RIGHTDELAY} right-far noselect`}>{`${t(buttonProps.title)}`}</span>
        </div>
    )
}

export default SidebarButton;