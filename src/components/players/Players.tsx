import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IFilterButtons, IPlayerGroups, IPlayers, IRoleGroups } from '../../imports/interfaces';
import '../css/players.css';
import {filterBy, groupByKey, mapEnum, sortByKey, getGroupsLen, getRoleGroups, FormFilterButton, GetRoleFilterItems} from "../../imports/utils";
import PlayersGroup from './PlayersGroup';
import { PlayersContext } from "../../context/PlayerContext";
import { EChampions, EGroupBy, ERegions, ERoles, ETeams } from '../../imports/enums/lol';
import { EEMessages, EFilterType } from "../../imports/enums/ui"
import { useInit } from '../../imports/initializers';
import PlayersSection from './PlayersSection';

const ROLES_SORT = mapEnum(ERoles, "string", () => { }) as string[];
const TEAMS_SORT = mapEnum(ETeams, "number", (team: number) => { return team.toString() }) as string[];

const Players: React.FC<{
    globalInterval: number,
    players: IPlayers,
    filterRoles: ERoles[],
    filterRegions: ERegions[],
    filterChampions: EChampions[],
    fToggleFilter: (type: EFilterType, filterValue: string) => void,
    fHandlePlayerFavorited: (name: string) => void
}> = ({ globalInterval, players, filterRoles, filterRegions, filterChampions, fToggleFilter, fHandlePlayerFavorited }) => {
    const [usePlayersState, setUsePlayersState] = useState<IPlayers>(players);
    const [menuOpen, setMenuOpen] = useState<number>(-1);

    const [groupedFavCount, setGroupedFavCount] = useState<number>(0);
    const [groupedRestCount, setGroupedRestCount] = useState<number>(0);
    const [groupedPlayersFavorites, setGroupedPlayersFavorites] = useState<IPlayerGroups>([]);
    const [groupedPlayersRest, setGroupedPlayersRest] = useState<IPlayerGroups>([]);
    const { groupBy } = useContext(PlayersContext);

    const [roleGroups, setRoleGroups] = useState<IRoleGroups>([{role: ERoles.TOP, count: 0}, {role: ERoles.JUNGLE, count: 0}, {role: ERoles.MIDDLE, count: 0}, {role: ERoles.BOTTOM, count: 0}, {role: ERoles.SUPPORT, count: 0}]);

    const groupPlayers = () => {
        let pFavorites = filterBy(usePlayersState, p => p.favorite);
        let pRest = filterBy(usePlayersState, p => !p.favorite);
        let grouped: IPlayerGroups = [];

        if (groupBy == EGroupBy.ROLE) {
            grouped = sortByKey(groupByKey(pRest, player => player.playerInfo.role), ROLES_SORT);
        } else if (groupBy == EGroupBy.TEAM) {
            grouped = sortByKey(groupByKey(pRest, player => player.playerInfo.team.short), TEAMS_SORT);
        } else if (groupBy == EGroupBy.NONE) {
            grouped = [{ key: EGroupBy.NONE, players: pRest }] as IPlayerGroups;
        }

        setGroupedFavCount(pFavorites.length);
        setGroupedRestCount(pRest.length);
        setGroupedPlayersFavorites(pFavorites.length >= 1 ? [{ key: EGroupBy.NONE, players: pFavorites }] : []);
        setGroupedPlayersRest(grouped);
        setRoleGroups(getRoleGroups(grouped.map(groups => groups.players).flat()));
    };

    useEffect(() => {
        if (usePlayersState) {
            setUsePlayersState(players);
            groupPlayers();
        }
    }, [usePlayersState]);

    return (
        <div className='pros-container'>
            <div className='pros-scroll'>
                <PlayersSection
                    emptySection={true}
                    sectionIndex={0}
                    sectionTitle={`titles.favorites`}
                    sectionTotal={groupedFavCount}
                    sectionEmptyMessage={`tooltips.noFavorites`} />

                <PlayersGroup
                    groups={groupedPlayersFavorites}
                    globalInterval={globalInterval}
                    menuOpen={menuOpen}
                    fHandleMenuOpen={(set: number) => setMenuOpen(set)}
                    fHandlePlayerFavorited={fHandlePlayerFavorited} />

                <PlayersSection
                    extraClass={menuOpen != -1 ? 'section-container-disabled' : ''}
                    sectionIndex={1}
                    sectionTitle={`titles.all`}
                    sectionTotal={groupedRestCount}
                    filterRoles={filterRoles}
                    filterRegions={filterRegions}
                    sectionEmptyMessage={`tooltips.noPlayersLoaded`}
                    fToggleFilter={fToggleFilter} />

                <PlayersGroup
                    groups={groupedPlayersRest}
                    globalInterval={globalInterval}
                    menuOpen={menuOpen}
                    filterRoles={filterRoles}
                    filterRegions={filterRegions}
                    fHandleMenuOpen={(set: number) => setMenuOpen(set)}
                    fHandlePlayerFavorited={fHandlePlayerFavorited} />
            </div>
        </div>
    );
};

const PlayersNotLoaded: React.FC<{
}> = ({ }) => {
    const { t } = useTranslation('common');

    return (
        <Route path='/empty'>
            <div className={`players-empty noselect`}>
                <span>{t(`${EEMessages.NONE_LOADED}`)}</span>
            </div>
        </Route>
    )
}

export {
    Players,
    PlayersNotLoaded
}