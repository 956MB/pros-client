import { IAppReleaseChange, IAppReleaseChanges, IBackground, IBackgroundInfo, ICQLeaderboardEntry, ICQPage, ILanguageResources, IPageState, IPlayer, IPlayerGroups, IPlayers, ISettingsItem, ISettingsItems, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelection, ISettingsItemValueSelections, ISettingsItemValueSelector, ISettingsPage, ISettingsPageLanguage, ISettingsSection, ISettingsSectionEntries, ISettingsSectionEntry, ISidebarButton, ISummoner, IRoleGroups, IFilterButton, IFilterItem, IFilterItems, IFilterPreviews } from "./interfaces";
import { EChampions, ERegions, ERoles, getChampionFromId } from "./enums/lol";
import { EChangeType, EFilterType } from "./enums/ui"
import { readDir, BaseDirectory, exists } from '@tauri-apps/api/fs';

import Rand, {PRNG} from 'rand-seed';

export function unull() { return () => null }
export function ending(sec: number, _true: string): string | null { return sec >= 1800 ? _true : null }
export function isEven(num: number) { return num % 2 == 0; }
export function isOdd(num: number) { return Math.abs(num % 2) == 1; }
export function noWhitespace(rem: string): string { return rem.replace(/\s/g, ""); }
export function noPunc(rem: string): string { return rem.replace(/\'/g, ""); }

export function arrayTypeString(array: any): boolean {
    return Array.isArray(array) && typeof array[0] === "string";
}

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function removeExtension(file: string): IBackgroundInfo {
    const re = /\.[^/.]+$/;
    const ext = file.split('.').pop();
    return { name: file.replace(re, ""), ext: ext! };
}

export function filterTranslationPath(path: string, filter: string): string {
    return path.replace(filter, "");
}

export function secondsToTime(secs: number): string {
    let dminutes = secs % (60 * 60);
    let minutes = Math.floor(dminutes / 60);
    let dseconds = dminutes % 60;
    let seconds = Math.ceil(dseconds);

    return `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

export function replaceVars(str: string, rep: { [key: string]: string }) {
    let ret = str;
    for (let x in rep) {
        ret = ret.replace(new RegExp(escapeRegExp(x), 'g'), rep[x]);
    }
    return ret;
};

export function replaceIssueTag(text: string): string {
    const pattern = /#\d+/g;
    const found = text.match(pattern);

    if (found && found.length >= 1) {
        const issue = found[0];
        // TODO: Change link to Pros repo
        const rep = text.replace(pattern, `<a title=https://github.com/desktop/desktop/issues/${issue.substring(1)} href=https://github.com/desktop/desktop/issues/${issue.substring(1)} target="_blank" rel="noopener noreferrer">${issue}</a>`);
        return rep;
    }
    return text;
}

export async function checkLiveBackground(champ: string): Promise<IBackgroundInfo> {
    const bgInfo = removeExtension(champ);
    const live = await readDir(`assets/dragontail/live/`, { dir: BaseDirectory.Resource, recursive: true });
    for (const entry of live) {
        if (entry.name === `${bgInfo.name}.webm`) { return {name: bgInfo.name, ext: '.webm'}; }
    }
    return {name: bgInfo.name, ext: bgInfo.ext};
}

export function cutUnderscore(str: string): string {
    return str.split("_")[0];
}

export function formPlayerImage(team: string, player: string): string {
    return `${team.toUpperCase()}_${player}`;
}

function ifShort(short: string, long: string, isShort: boolean): string {
    return isShort == true ? short : long;
}

export function ifLiveBackground(background: string): boolean {
    return background.includes(".mp4") || background.includes(".webm");
}

export function firstLastClass(index: number, len: number, first: string, last: string): string {
    return `${index == 0 ? first : ""} ${index == len-1 ? last : ""}`
}

export function sortLanguages(langs: ILanguageResources): ILanguageResources {
    const first = ["br_BA", "en_UK", "en_US"];
    langs.sort((a, b) => a.text.localeCompare(b.text));
    first.forEach((lang) => {
        langs.sort((x, y) =>  x.lang == lang ? -1 : y.lang == lang ? 1 : 0 );
    })

    return langs;
}

// NOTE: Gets

export function currentYearN(): number {
    return (new Date()).getFullYear();
}

export const LANGS = [ "English, US", "English, UK", "Svenska", "Suomi", "한국어", "日本語", "Braille" ];
export function getLanguageStatic(lang: number): string {
    return LANGS.at(lang)!;
}
export const THEMES = [ "dark", "light", "oled", "system" ];
export function getThemeString(theme: number): string {
    return THEMES.at(theme)!;
}
export const SCALES = [ "100%", "90%", "75%", "50%" ];
export function getScaleString(scale: number): string {
    return SCALES.at(scale)!;
}

export function getEntryIndexClass(idx: number, length: number): string {
    if (idx == 0) { return "entry-first"; }
    if (idx == length-1) { return "entry-last"; }
    return "";
}

export async function getFallbackPhoto(player: string, year: number): Promise<string> {
    for (let i = 0; i < 3; i++) {
        let uYear = year - i;
        let check = await exists(`assets/photos/${uYear}/${player}_${uYear}.webp`, { dir: BaseDirectory.Resource });
        if (check) {
            console.log(`[load] photo: \"assets/photos/${uYear}/${player}_${uYear}.webp\"`);
            return `${uYear}/${player}_${uYear}.webp`;
        }
    }
    console.log(`[load] photo, fallback: \"${player}\", ${year}`);
    return "fallback.webp";
}

export function whichStream(stream: string): string {
    return stream.includes("twitch") ? 'Twitch' : 'Afreeca';
}

export function filterBy(players: IPlayers, expression: (filter: IPlayer) => boolean): IPlayers {
    return players.filter(expression);
}

export const groupByKey = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);

export function sortByKey(record: Record<string, IPlayer[]>, sortArr: string[]): IPlayerGroups {
    const result = Object.keys(record).map((key) => {
        return { key: key, players: record[key as keyof typeof record] as IPlayers };
    });
    
    const sorted = result.sort((a, b) => sortArr.indexOf(a.key) - sortArr.indexOf(b.key));
    return sorted as IPlayerGroups;
}

export function getGroupsLen(groups: IPlayerGroups): number {
    let count: number = 0;
    groups.forEach((group) => count += group.players.length);
    return count;
}

export function getRoleGroups(players: IPlayers): IRoleGroups {
    let topC = 0;
    let jungleC = 0;
    let middleC = 0;
    let bottomC = 0;
    let supportC = 0;

    players.map((player) => {
        switch (player.playerInfo.role) {
            case ERoles.TOP: topC += 1; break;
            case ERoles.JUNGLE: jungleC += 1; break;
            case ERoles.MIDDLE: middleC += 1; break;
            case ERoles.BOTTOM: bottomC += 1; break;
            case ERoles.SUPPORT: supportC += 1; break;
            default: break;
        }
    })

    return [{role: ERoles.TOP, count: topC}, {role: ERoles.JUNGLE, count: jungleC}, {role: ERoles.MIDDLE, count: middleC}, {role: ERoles.BOTTOM, count: bottomC}, {role: ERoles.SUPPORT, count: supportC}];
}

export function mapEnum(enumerable: any, type: string, fn: Function): any[] {
    // get all the members of the enum
    let enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key]);
    // we are only interested in the numeric identifiers as these represent the values
    let enumValues: any[] = enumMembers.filter(v => typeof v === type);
    // now map through the enum values
    return enumValues.map((m, i) => fn(m, i));
}

export function mapEnumKeys(enumerable: any): string[] {
    let enumMembers: string[] = Object.keys(enumerable).map(key => enumerable[key]);
    return enumMembers;
}

export function sliceMap(map: any[], min: number, max: number): any[] {
    return map.slice(min, max);
}

export function included(list: string[], check: string): boolean {
    return list.includes(check);
}

// NOTE: Pages:

export function isPageActive(current: number, page: number): boolean { return current == page; }

export function checkNavBackward(state: IPageState): boolean {
    return (state.pages.length >= 2 && state.currentPage > 0);
}
export function checkNavForward(state: IPageState): boolean {
    return (state.pages.length >= 2 && state.currentPage < state.pages.length-1);
}
export function checkPreviousBack(state: IPageState, newPage: string): boolean {
    const next = state.currentPage-1;
    return (next >= 0 && state.pages.at(next) === newPage);
}
export function checkPreviousForward(state: IPageState, newPage: string): boolean {
    const next = state.currentPage+1;
    return (next <= state.pages.length-1 && state.pages.at(next) === newPage);
}

// NOTE: Translation:

export function oMode(mode: string): string { return `modes.${mode}` }
export function oRole(role: string): string { return `roles.${role}` }
export function oRegion(region: string): string { return `regions.${region}` }
export function sTitle(page: string): string { return `settings.pages.${page}.title` }
export function sAdd(): string { return `settings.pages.language.add` }
export function sItemTitle(page: string, item: string): string { return `settings.pages.${page}.items.${item}.title` }
export function sItemDescription(page: string, item: string): string { return `settings.pages.${page}.items.${item}.description` }
export function pAbout(item: string): string { return `settings.pages.about.${item}` }
export function cqTitle(page: string): string { return `cq.pages.${page}.title` }
export function cqControls(item: string): string { return `cq.pages.leaderboards.controls.${item}` }

// NOTE: Form interfaces:

export function FormSettingsPage(index: number, type: string, title: string, items?: ISettingsItems, disabled?: boolean): ISettingsPage {
    return { index: index, type: type, title: sTitle(title), items: items ? items : [], disabled: disabled ? disabled : false }
}
export function FormSettingsPageLang(index: number, type: string, title: string, selected: number, items?: ISettingsItems, disabled?: boolean): ISettingsPageLanguage {
    return { index: index, type: type, title: sTitle(title), selected: selected, items: items ? items : [], disabled: disabled ? disabled : false }
}
export function SettingsItemTitle(title: string, secondaryAction: () => void): ISettingsItem { return { title: title, itemValue: { type: "title", value: false }, secondaryAction: secondaryAction }; }
export function SettingsItemSpacer(title?: string): ISettingsItem { return { title: title ? title : "", itemValue: { type: "spacer", value: false } }; }
export function SettingsItemBoolean(section: string, key: string, value: boolean, children?: ISettingsItems, secondaryAction?: () => void): ISettingsItem {
    return {
        title: sItemTitle(section, key),
        description: sItemDescription(section, key),
        itemValue: { type: 'boolean', value: value, key: key } as ISettingsItemValueBool,
        childValues: children,
        secondaryAction: secondaryAction
    }
}
export function ItemValueSelection(index: number, section: string, value: string, extra: string, ignoreTranslation: boolean): ISettingsItemValueSelection {
    return { index: index, text: ignoreTranslation ? value : sItemTitle(section, value), extra: extra };
}
export function SettingsItemSelector(section: string, key: string, value: number, selections: string[], extras?: string[], ignoreTranslation: boolean = false): ISettingsItem {
    return {
        title: key === 'appLanguage' ? sAdd() : sItemTitle(section, key), key: key, itemValue: {
            type: 'selector', key: key, value: value, options: selections.map((value, i) => { return ItemValueSelection(i, section, value, extras ? extras[i] : '', ignoreTranslation) }) as ISettingsItemValueSelections
        } as ISettingsItemValueSelector
    }
}
export function SettingsItemLanguage(value: number, text: string, lang: string): ISettingsItem {
    return {
        itemValue: { type: "lang", value: value, text: text, lang: lang as string } as ISettingsItemValueLanguage
    }
}
export function FormSettingsSection(type: string, title: string, entries?: ISettingsSectionEntries, initOpen?: boolean): ISettingsSection {
    return { type: type, title: title, initOpen: initOpen ? initOpen : false, entries: entries ? entries : [] }
}
export function SectionEntryCredit(name: string, link: string): ISettingsSectionEntry {
    return { name: name, link: link }
}
export function SettingsEntryChange(version: string, date: string, changes?: IAppReleaseChanges): ISettingsSectionEntry {
    return { version: version, date: date, changes: changes ? changes : [] } as ISettingsSectionEntry;
}
export function SettingsEntryRelease(type: EChangeType, change: string, issues?: string[]): IAppReleaseChange {
    return { type: type, change: change, issues: issues ? issues : [] } as IAppReleaseChange;
}

export function FormSidebarButton(id: string, title: string, icon: string, page: string, disabled: boolean, action: () => void, notif?: boolean): ISidebarButton {
    return { id: id, title: title, icon: icon, page: page, disabled: disabled, notif: notif ? notif : false, action: action };
}

export function FormCQPage(index: number, title: string, url?: string): ICQPage {
    return { index: index, title: cqTitle(title), url: url ? url : "" }
}
export function FormCQLeaderboardEntry(rank: number, lp: number, player: ISummoner): ICQLeaderboardEntry {
    return { rank: rank, lp: lp, playerInfo: player };
}

// NOTE: Filters:

export function GetRoleFilterItems(): IFilterItems {
    return Object.keys(ERoles).map(role => FormFilterItem(oRole(role).toLowerCase(), role.toLowerCase(), "assets/icons/lanes/" + role + ".png")) as IFilterItems;
}
export function GetRegionFilterItems(): IFilterItems {
    return Object.keys(ERegions).map(region => FormFilterItem(oRegion(region).toLowerCase(), region.toLowerCase())) as IFilterItems;
}
export function GetChampionFilterItems(): IFilterItems {
    return Object.values(EChampions).filter((v) => !isNaN(Number(v))).map((champion) => {
        const champ = getChampionFromId(champion as number);
        return FormFilterItem(champ?.name ?? "", champ?.name ?? "");
    }) as IFilterItems;
}

export function FormFilterButton(type: EFilterType, items: IFilterItems): IFilterButton {
    return { type: type, text: type as string, items: items};
}
export function FormFilterItem(text: string, value: string | number, image?: string): IFilterItem {
    return { image: image ? image : undefined, text: text, value: value};
}

export function FallbackActiveFiltersZero(type: EFilterType): IFilterPreviews {
    return {type: type, activeItems: [], fallbackLength: 0};
}

export const ROLE_ORDER = ["top", "jungle", "middle", "bottom", "support"];
export const REGION_ORDER = ["na", "euw", "eun", "oce", "kr", "jp", "br", "ru"];
export function SortFilterStrings(filters: string[], order: string[]): string[] {
    return filters.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// NOTE: Random:

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomNumberSeed(champ: string, min: number, max: number): number {
    const rand = new Rand(champ, PRNG.mulberry32);
    return Math.floor(rand.next() * (max - min + 1)) + min;
}

export function randomKDA(): string {
    return `${randomNumber(0, 10)}/${randomNumber(0, 10)}/${randomNumber(0, 10)}`;
}

export function randomEnum<T extends object>(useEnum: T, filter: EChampions[]): T[keyof T] {
    const enumValues = Object.keys(useEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

export async function randomSkin(champ: string): Promise<string> {
    const champLower = champ.toLowerCase();
    const all = await readDir(`assets/dragontail/loading/`, { dir: BaseDirectory.Resource, recursive: true });
    const matching = all.filter(champ => champ.name?.toLowerCase().includes(champLower));
    const entry = matching.at(randomNumberSeed(champLower, 0, matching.length - 1))?.name;
    const num = removeExtension(entry ?? `${champ}_0.jpg`).name.split('_').pop();
    return num ?? "0";
}

export function randomActive(): boolean {
    const notRandomNumbers = [1, 1, 2, 2, 3, 3, 4];
    const idx = Math.floor(Math.random() * notRandomNumbers.length);
    return (notRandomNumbers[idx] != 4);
}

export async function getRandomBackground(override?: IBackground): Promise<IBackground> {
    if (!override) {
        const dir = randomNumber(0, 1) == 0 ? "splash" : "random";
        const bgs = await readDir(`assets/dragontail/${dir}/`, { dir: BaseDirectory.Resource, recursive: true });
        let entry = bgs.at(randomNumber(0, bgs.length - 1))?.name;
        const checkBG = await checkLiveBackground(entry!);
        const ifLive = checkBG.ext === '.webm';
    
        console.log(`DEBUG: Random background selected [\"${checkBG.name}\", live: ${ifLive}]`);
    
        let bgType = ifLive ? "live" : dir;
        let bgName = checkBG.name;
        let bgExt = checkBG.ext;

        return { type: bgType, name: bgName, ext: bgExt }
    }

    return { type: override.type, name: override.name, ext: override.ext }
}

export const arrayRandom = <T extends unknown> (arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
};
export const pickNRandom = <T extends unknown> (arr: T[], n: number): T[] => {
    const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};