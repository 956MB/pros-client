import {useContext, useEffect, useState} from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Titlebar from './components/titlebar/Titlebar';
import Settings from "./components/settings/Settings";
import { IBackground, IPlayers, IPageState, IPlayer, INotificationPlayer } from "./imports/interfaces";

import { EChampions, ERegions, ERoles, getChampionFromId, getRegion } from "./imports/enums/lol";
import { getRandomBackground, randomEnum, randomNumber, arrayRandom, getThemeString, SortFilterStrings, ROLE_ORDER, REGION_ORDER } from "./imports/utils";
import "./imports/prototypes"
import { Players } from "./components/players/Players";
import PlayerAccounts from "./components/players/PlayerAccounts";

import { PlayersContext } from "./context/PlayerContext";
import { SettingsContext } from "./context/SettingsContext";
import { useTranslation } from "react-i18next";
import { useInit } from "./imports/initializers";
import { ChampionsQueue } from "./components/cq/ChampionsQueue";
import NotificationBanner from "./components/notifications/NotificationBanner";

import { EFilterType } from "./imports/enums/ui";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation('common');

    const [intervalActive, setIntervalActive] = useState<boolean>(false);
    const [globalInterval, setGlobalInterval] = useState<number>(0);
    const { regionFilter, modeFilter, roleFilter, teamFilter, accountsLoaded, allSummoners, updateContextFilter } = useContext(PlayersContext);
    const { appTheme, useBackground, liveBackground, autoRefresh, randomBackground } = useContext(SettingsContext);
    
    const [filterRoles, setFilterRoles] = useState<ERoles[]>([]);
    const [filterRegions, setFilterRegions] = useState<ERegions[]>([]);
    const [filterChampions, setFilterChampions] = useState<EChampions[]>([]);
    const [playersAll, setPlayersAll] = useState<IPlayers>([]);
    const [playersKey, setPlayersKey] = useState<number>(0);
    const [accountsKey, setAccountsKey] = useState<number>(1);
    const [notification, setNotification] = useState<INotificationPlayer>({visible: true, player: undefined});

    const [pageState, setPageState] = useState<IPageState>({ currentPage: 0, pages: ["/"] });
    const fNavigateDirection = (dir: number, replace: boolean = false) => {
        setPageState({ currentPage: pageState.currentPage + dir, pages: pageState.pages });
        navigate(dir);
    }
    const fNavigatePage = (page: string) => {
        setPageState({ currentPage: pageState.currentPage + 1, pages: [...pageState.pages, page] });
        navigate(page, { replace: false });
    }

    const refreshPlayers = () => {
        setGlobalInterval(0);
        setPlayersAll([]);
        loopPlayers();
    }
    const favoritePlayerToggle = (name: string) => {
        const updatedPlayers = playersAll.map((player) =>
            (player.playerAccount.summonerName === name) ? {...player, favorite: !player.favorite } : player
        );

        setPlayersAll(updatedPlayers);
        setPlayersKey(playersKey + 1);
        setAccountsKey(accountsKey + 1);
    }
    const setStartingFilters = () => {
        setFilterRoles(SortFilterStrings(roleFilter, ROLE_ORDER) as ERoles[]);
        setFilterRegions(SortFilterStrings(regionFilter, REGION_ORDER) as ERegions[]);
    }
    const updateContextFiltersCallback = (type: EFilterType, filters: any[], callback: () => void) => {
        updateContextFilter(type, filters);
        callback();
    }
    const fToggleFilter = (type: EFilterType, filterValue: string) => {
        const filters: string[] = type === EFilterType.ROLE ? filterRoles : filterRegions;
        const value = filterValue as ERoles | ERegions;

        if (filters.includes(value) && filters.length <= 1) { return; }

        if (type === EFilterType.ROLE) {
            const nRoleFilters = SortFilterStrings(
                filters.includes(value) ? filters.filter((ritem) => ritem !== value) : [...filters, value as ERoles]
            , ROLE_ORDER) as ERoles[];
            updateContextFiltersCallback(EFilterType.ROLE, nRoleFilters, () => setFilterRoles(nRoleFilters));
        }
        if (type === EFilterType.REGION) {
            const nRegionFilters = SortFilterStrings(
                filters.includes(value) ? filters.filter((ritem) => ritem !== value) : [...filters, value as ERegions]
            , REGION_ORDER) as ERegions[];
            updateContextFiltersCallback(EFilterType.REGION, nRegionFilters, () => setFilterRegions(nRegionFilters))
        }
    }

    const loopPlayers = async () => {
        // TODO: Using dummy data for now until I setup API calls
        await Promise.all(allSummoners.filterTeams(teamFilter).filterRoles(filterRoles).filterRandomize().filterUniquePlayers(0, 20).map(async (summoner, ip) => {
            let accounts = summoner.playerAccounts.filterRegions(filterRegions);
            let selectedAccount = arrayRandom(accounts);
            let randomC = getChampionFromId(randomEnum(EChampions, []))!;
            let playerI = {
                id: ip,
                active: true,
                favorite: ip <= 2, // TESTING:
                playerInfo: summoner.playerInfo,
                playerAccount: selectedAccount,
                gameInfo: {
                    champion: randomC,
                    region: getRegion(selectedAccount.region).use,
                    encryptionKey: "",
                    gameId: "",
                    gameTime: randomNumber(60, 1800), // TESTING:
                    isChampionsQueue: randomNumber(0, 3) == 0 // TESTING:
                }
            } as IPlayer;

            setPlayersAll(prevPlayers => [...prevPlayers, playerI]);
        })).then(() => {
            setPlayersKey(playersKey + 1);
            setNotification({visible: true, player: playersAll.at(0)})
        });
    }

    useInit(() => {
        setStartingFilters();
        if (autoRefresh) { refreshPlayers(); }
    });
    useEffect(() => {
        if (intervalActive) {
            let interval = setInterval(() => {
                setGlobalInterval(globalInterval + 1);
            }, 1000)

            return () => {
                clearInterval(interval);
            };
        }
    }, [globalInterval]);

    useHotkeys('ctrl+,', location.pathname !== '/settings' ? () => fNavigatePage("/settings") : () => {});

    return (
        <div
            className={`app theme-${getThemeString(appTheme)} ${i18n.language}`}
            onContextMenu={(e) => {
                e.preventDefault();
            }}>

            <Titlebar
                pageState={pageState}
                fNavigatePage={fNavigatePage}
                fNavigateDirection={fNavigateDirection}
                fRefreshPlayers={refreshPlayers} />

            <Routes>
                <Route path='/' element={
                    <Players
                        key={playersKey}
                        globalInterval={globalInterval}
                        players={playersAll}
                        filterRoles={filterRoles}
                        filterRegions={filterRegions}
                        filterChampions={filterChampions}
                        fToggleFilter={fToggleFilter}
                        fHandlePlayerFavorited={favoritePlayerToggle} />
                } />
                <Route path='/champsqueue' element={
                    <ChampionsQueue/>
                } />
                <Route path='/players' element={
                    <PlayerAccounts
                        key={accountsKey}
                        players={allSummoners} />
                } />
                <Route path='/settings' element={
                    <Settings
                        fRefreshBackground={() => {}}
                        fNavigatePage={fNavigatePage} />
                } />
            </Routes>

        </div>
    );
}


export default App