import React, { createContext, useState } from "react";

import { ISummoner, ISummonerAccount, ISummonerAccounts } from "../imports/interfaces";
import { EChampions, EGroupBy, EModes, ERegions, ERoles, ETeams } from "../imports/enums/lol";
import { useInit } from '../imports/initializers';

// JSON imports for testing vvv
import * as KR from '../data/players/lck.json';
import {currentYearN, getFallbackPhoto} from "../imports/utils";
import { getTeamInfo } from "../imports/enums/lol";
import { EFilterType } from "../imports/enums/ui";

interface IPlayersContext {
    regionFilter: ERegions[];
    modeFilter: EModes[];
    roleFilter: ERoles[];
    teamFilter: ETeams[];
    championFilter: EChampions[];
    groupBy: EGroupBy;
    accountsLoaded: boolean;
    allSummoners: ISummoner[];
    updateContextFilter: (update: EFilterType, newFilter: any[], reset?: boolean) => void;
    updateGroup: (newGroup: EGroupBy) => void;
}

export const PlayersContext = createContext<IPlayersContext>({
    regionFilter: [],
    modeFilter: [],
    roleFilter: [],
    teamFilter: [],
    championFilter: [],
    groupBy: EGroupBy.NONE,
    accountsLoaded: false,
    allSummoners: [],
    updateContextFilter: () => null,
    updateGroup: () => null,
})

const PlayerProvider: React.FC<{
    initPlayers: boolean,
    children: React.ReactNode
}> = ({ initPlayers, children }) => {
    const [regionFilter, setRegionFilter] = useState<ERegions[]>([ERegions.KR, ERegions.NA]);
    const [modeFilter, setModeFilter] = useState<EModes[]>([]);
    const [roleFilter, setRoleFilter] = useState<ERoles[]>([ERoles.MIDDLE, ERoles.JUNGLE, ERoles.TOP]);
    const [teamFilter, setTeamFilter] = useState<ETeams[]>([]);
    const [championFilter, setChampionFilter] = useState<EChampions[]>([]);
    
    const [groupBy, setGroupBy] = useState<EGroupBy>(EGroupBy.NONE);
    const [accountsLoaded, setAccountsLoaded] = useState<boolean>(false);
    const [allSummoners, setAllSummoners] = useState<ISummoner[]>([]);

    useInit(() => {
        const loadPlayers = async () => {
            if (!accountsLoaded) {
                const year = currentYearN();
                for (const p in KR.players) {
                    let player = KR.players[p];

                    // checking if player has accounts to use, otherwise skip
                    if (player.accounts && player.accounts.length) {
                        let playerAccounts: ISummonerAccounts = []
                        for (const a in player.accounts) {
                            let account = player.accounts[a];
                            if (account.id != undefined && account.puuid != undefined && account.name != undefined) {
                                let newAccount: ISummonerAccount = {} as ISummonerAccount;
                                newAccount.summonerName = account.name;
                                newAccount.summonerId = account.id;
                                newAccount.summonerPuuid = account.puuid;
                                newAccount.region = account.region;
                                newAccount.profileIcon = account.profileIcon;
                                playerAccounts.push(newAccount);
                            }
                        }

                        let teamInfo = getTeamInfo(player.team);
                        let playerAccountI: ISummoner = {
                            playerInfo: {
                                playerName: player.player as string,
                                playerImage: await getFallbackPhoto(player.player, year),
                                team: teamInfo,
                                role: player.role as string,
                                stream: player.stream as string
                            },
                            playerAccounts: playerAccounts,
                        }

                        setAllSummoners(prevAccounts => [...prevAccounts, playerAccountI]);
                    }
                }
    
                setAccountsLoaded(true);
            }
        }

        if (initPlayers) {
            loadPlayers();
        }
    });

    const updateContextFilter = (update: EFilterType, newFilter: any[], reset?: boolean): void => {
        switch (update) {
            case EFilterType.REGION: setRegionFilter(reset ? [] : newFilter as ERegions[]); break;
            case EFilterType.ROLE: setRoleFilter(reset ? [] : newFilter as ERoles[]); break;
            case EFilterType.TEAM: setTeamFilter(reset ? [] : newFilter as ETeams[]); break;
        }
        // console.log("[called] updateContextFilter:", update, newFilter);
    }
    const updateGroup = (newGroup: EGroupBy): void => {
        setGroupBy(newGroup);
    }

    return (
        <PlayersContext.Provider value={{
            regionFilter,
            modeFilter,
            roleFilter,
            teamFilter,
            championFilter,
            groupBy,
            accountsLoaded,
            allSummoners,
            updateContextFilter,
            updateGroup
        }}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayerProvider;