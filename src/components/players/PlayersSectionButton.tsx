import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { IRoleGroup } from '../../imports/interfaces';
import { ERoles } from '../../imports/enums/lol';

const PlayersSectionButton: React.FC<{
    roleGroup: IRoleGroup,
    buttonToggled: boolean,
    fToggleRole: (role: ERoles) => void
}> = ({ roleGroup, buttonToggled, fToggleRole }) => {
    const { t } = useTranslation('common');

    return (
        <div
            className={`section-button ${buttonToggled ? 'button-toggled' : ''}`}
            onClick={() => fToggleRole(roleGroup.role)}>

            <img src={`src/assets/icons/lanes/${roleGroup.role}.png`} alt="role-button" className={`button-role button-role-${roleGroup.role} noselect`} />

            <div className={`players-section-badge`}>
                <span className={`noselect`}>{roleGroup.count}</span>
            </div>
        </div>
    )
}

export default PlayersSectionButton;