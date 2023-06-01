import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { IPlayerGroupInfo, IPlayerGroups, IPlayers, IRoleGroups } from "../../imports/interfaces";
import Card from "../cards/Card";
import { EGroupBy, ERegions, ERoles, getGroupInfoFromKey } from "../../imports/enums/lol";
import { ETooltip } from "../../imports/enums/ui";
import { SettingsContext } from "../../context/SettingsContext";
import { useInit } from '../../imports/initializers';

import RenderIfVisible from 'react-render-if-visible'
const CARD_HEIGHT = 227;

const PlayersGroup: React.FC<{
    groups: IPlayerGroups,
    globalInterval: number,
    menuOpen: number,
    filterRoles?: ERoles[],
    filterRegions?: ERegions[],
    fHandleMenuOpen: (set: number) => void,
    fHandlePlayerFavorited: (name: string) => void
}> = ({ groups, globalInterval, menuOpen, filterRoles, filterRegions, fHandleMenuOpen, fHandlePlayerFavorited }) => {
    const { t } = useTranslation('common');
    const { showUnavailable } = useContext(SettingsContext);

    const [groupCollapsed, setGroupCollapsed] = useState<boolean>(false);
    const [groupInfo, setGroupInfo] = useState<IPlayerGroupInfo>({} as IPlayerGroupInfo);

    return (
        <div className={`pros-group ${groupInfo.type === EGroupBy.NONE ? 'unsorted-group' : ''} ${groupCollapsed ? 'group-collapsed' : ''} ${menuOpen != -1 ? 'dim-group' : ''}`}>
            <div className={`pros-grid ${groupCollapsed ? 'pros-hidden' : ''}`}>
                {React.Children.toArray(
                    groups.map((group, gi) => (
                        group.players.map((player, pi) => (
                            ((!showUnavailable && !player.active) || (!player.favorite && (filterRoles && !filterRoles.includes(player.playerInfo.role as ERoles)))) ? null :
                            <RenderIfVisible defaultHeight={CARD_HEIGHT}>
                                <Card
                                    playerProps={player}
                                    globalInterval={globalInterval}
                                    menuOpen={menuOpen == player.id}
                                    endOfGroup={pi == group.players.length-1}
                                    fHandleMenuOpen={fHandleMenuOpen}
                                    fHandlePlayerFavorited={fHandlePlayerFavorited} />
                            
                            </RenderIfVisible>
                        ))
                    ))
                )}
            </div>
        </div>
    )

}

export default PlayersGroup;