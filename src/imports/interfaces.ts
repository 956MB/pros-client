import { ERoles } from "./enums/lol";
import { EChangeType, EFilterType } from "./enums/ui";

// NOTE: Reducers

export interface IReducerAction {
    type: string;
    payload: any;
}

export interface ICardStates {
    level: number;
    gameTime: number;
    backgroundDir: string;
    menuOrigin: IMenuOrigin;
    cardPressed: boolean;
}

export interface ISettingsStates {
    listLayout: number;
    autoRefresh: boolean;
    refreshInterval: number;
    showSummonerIds: boolean;
    showRandomSkins: boolean;
    showTeamLogos: boolean;
    showUnavailable: boolean;
    appTheme: number;
    appScale: number;
    openOnStartup: boolean;
    minimizeToTray: boolean;
    hardwareAcceleration: boolean;
    showAnimations: boolean;
    useBackground: boolean;
    randomBackground: boolean;
    liveBackground: boolean;
    keyboardMode: boolean;
    notifications: boolean;
    appLanguage: number;
}

// NOTE: Objects

export interface IBackground {
    type: string;
    name: string;
    ext: string;
}

export interface IBackgroundInfo {
    name: string;
    ext: string;
}

export interface IPackages extends Array<IPackage>{}
export interface IPackage {
    name: string;
    version: string;
    link: string;
    license: string;
}

export interface IPlayers extends Array<IPlayer>{}
export interface IPlayer { 
    id: number;
    active: boolean;
    favorite: boolean;
    // skin: string;
    playerInfo: ISummonerInfo;
    playerAccount: ISummonerAccount;
    gameInfo: IGameInfo;
}

export interface IPlayerGroups extends Array<IPlayerGroup>{}
export interface IPlayerGroup {
    key: any;
    players: IPlayers;
}

export interface IPlayerGroupInfo {
    type: string;
    image: string;
    text: string;
}
  
export interface ISelectedChamps {
    champs: number[];
}

export interface ISummoners extends Array<ISummoner>{}
export interface ISummoner {
    playerInfo: ISummonerInfo;
    playerAccounts: ISummonerAccounts;
}

export interface ISummonerInfo {
    playerName: string;
    playerImage: string;
    team: ITeamInfo;
    role: string;
    stream: string;
}

export interface ISummonerAccounts extends Array<ISummonerAccount>{}
export interface ISummonerAccount {
    summonerName: string;
    summonerId: string;
    summonerPuuid: string;
    region: string;
    profileIcon: number;
}

export interface ITeamInfo {
    code: number;
    short: string;
    long: string;
    accent: string;
}

export interface IGameInfo {
    region: string;
    encryptionKey: string;
    gameId: string
    gameTime: number;
    isChampionsQueue: boolean;
    champion: IChampion;
}

export interface IChampion {
    name: string;
    color: string
}

export interface IRegion {
    use: string;
    display: string
}

export interface IRoleGroups extends Array<IRoleGroup>{}
export interface IRoleGroup {
    role: ERoles;
    count: number;
}

// NOTE: Spectator

export interface ISpectatorResult {
    status: boolean;
    file: string
}

// NOTE: Languages

export interface ILanguageResources extends Array<ILanguageResource>{}
export interface ILanguageResource {
    lang: string;
    text: string;
}

// NOTE: UI

export interface IPageState {
    currentPage: number;
    pages: string[]
}

export interface IMenuOrigin {
    x: number;
    y: number;
}

export interface ISidebarButtons extends Array<ISidebarButton>{}
export interface ISidebarButton {
    id: string;
    title: string;
    icon: string | undefined;
    page: string;
    disabled: boolean;
    action: (val?: any) => void;
    notif?: boolean;
}

// NOTE: Filters

export interface IFilterButtons extends Array<IFilterButton>{}
export interface IFilterButton {
    type: EFilterType;
    text: string;
    // activeFilters: string[];
    items: IFilterItems;
}

export interface IFilterItems extends Array<IFilterItem>{}
export interface IFilterItem {
    image?: string;
    text: string;
    value: string | number;
}

export interface IFilterPreviews {
    type: EFilterType;
    activeItems: string[];
    fallbackLength: number;
}

// NOTE: Settings

export interface ISettingsPages extends Array<ISettingsPage>{}
export interface ISettingsPage {
    index: number;
    type: string;
    title: string;
    items: ISettingsItems;
    disabled: boolean;
}

export interface ISettingsPageLanguage extends ISettingsPage {
    selected: number;
}

export interface ISettingsItems extends Array<ISettingsItem>{}
export interface ISettingsItem {
    title?: string;
    key?: string;
    description?: string;
    itemValue: ISettingsItemValue;
    childValues?: ISettingsItems;
    secondaryAction?: () => void;
}

export interface ISettingsItemValue {
    type: string;
    value: any;
    // setValue(v: any): boolean
}

export interface ISettingsItemValueBool extends Omit<ISettingsItemValue, 'value'> {
    value: boolean;
    key: string;
}

export interface ISettingsItemValueSelections extends Array<ISettingsItemValueSelection>{}
export interface ISettingsItemValueSelection {
    index: number;
    text: string;
    extra: string;
}

export interface ISettingsItemValueSelector extends Omit<ISettingsItemValue, 'value'> {
    key: string;
    value: number;
    options: ISettingsItemValueSelections;
    // setValue(v: string): boolean
}

export interface ISettingsItemValueLanguages extends Array<ISettingsItemValueLanguage>{}
export interface ISettingsItemValueLanguage extends Omit<ISettingsItemValue, 'value'> {
    value: number;
    text: string;
    lang: string;
}

export interface ISettingsPageButton {
    index: number;
    text: string;
    disabled: boolean;
}

// NOTE: Settings sections and entries (About)

export interface ISettingsSections extends Array<ISettingsSection>{}
export interface ISettingsSection {
    type: string;
    title: string;
    initOpen: boolean;
    entries: ISettingsSectionEntries;
}

export interface ISettingsSectionEntries extends Array<ISettingsSectionEntry>{}
export interface ISettingsSectionEntry {
    name?: string;
    link?: string;
}

export interface ISettingsSectionChangeEntries extends Array<ISettingsSectionEntryChange>{}
export interface ISettingsSectionEntryChange extends Omit<ISettingsSectionEntry, 'name' | 'link'> {
    version: string;
    date: string;
    changes: IAppReleaseChanges;
}

export interface ISettingsSectionPackageEntries extends Array<ISettingsSectionEntryPackage>{}
export interface ISettingsSectionEntryPackage extends Omit<ISettingsSectionEntry, 'name' | 'link'> {
    name: string;
    version: string;
    link?: string;
    license?: string;
}

export interface IAppReleaseChanges extends Array<IAppReleaseChange>{}
export interface IAppReleaseChange {
    type: EChangeType;
    change: string;
    issues: string[];
}

// NOTE: Notifications

export interface INotification {
    visible: boolean;
    content: string;
}
export interface INotificationPlayer {
    visible: boolean;
    player: IPlayer | undefined;
}

// NOTE: Champions queue

export interface ICQPages extends Array<ICQPage>{}
export interface ICQPage {
    index: number;
    title: string;
    url?: string;
}

export interface ICQLeaderboardEntries extends Array<ICQLeaderboardEntry>{}
export interface ICQLeaderboardEntry {
    rank: number;
    lp: number;
    playerInfo: ISummoner;
}

// NOTE: JSON

export  interface IJSONPlayers {
    players: IJSONPlayer[]
}
export  interface IJSONPlayer {
    player: string;
    team: number;
    league: string;
    role: string;
    stream: string;
    accounts: IJSONAccount[];
}
export  interface IJSONAccount {
    name: string;
    id: string;
    puuid: string;
    profileIcon: number;
    region: string;
}