import { ISummoner, ISummonerAccount } from "./interfaces";
import { ERegions, ERoles, ETeams } from "./enums/lol";
import random from 'random'

// NOTE: Prototypes:

declare global {
    interface Array<T> {
        filterRegions(regions: ERegions[]): Array<T>;
        filterTeams(teams: ETeams[]): Array<T>;
        filterRoles(roles: ERoles[]): Array<T>;
        filterUniquePlayers(min?: number, max?: number): Array<T>;
        filterRandomize(): Array<T>;
    }
}
if (!Array.prototype.filterRegions) {
    Array.prototype.filterRegions = function (this: ISummonerAccount[], regions: ERegions[]): ISummonerAccount[] {
        if (this.length <= 0) { return this; }
        return this.filter((player) => (regions.length >= 1) ? regions.includes(player.region as ERegions) : this);
    }
}
if (!Array.prototype.filterTeams) {
    Array.prototype.filterTeams = function (this: ISummoner[], teams: ETeams[]): ISummoner[] {
        if (this.length <= 0) { return this; }
        return this.filter((player) => (teams.length >= 1) ? teams.includes(player.playerInfo.team.code as ETeams) : this);
    }
}
if (!Array.prototype.filterRoles) {
    Array.prototype.filterRoles = function (this: ISummoner[], roles: ERoles[]): ISummoner[] {
        if (this.length <= 0) { return this; }
        return this.filter((player) => (roles.length >= 1) ? roles.includes(player.playerInfo.role as ERoles) : this);
    }
}
if (!Array.prototype.filterUniquePlayers) {
    Array.prototype.filterUniquePlayers = function (this: ISummoner[], min: number, max: number): ISummoner[] {
        const unique = [...new Map(this.map(item => [item.playerInfo.playerName, item])).values()];
        return unique.slice(min, max);
    }
}
if (!Array.prototype.filterRandomize) {
    Array.prototype.filterRandomize = function (this: ISummoner[]): ISummoner[] {
        return this.sort(() => 0.5 - random.float())
    }
}