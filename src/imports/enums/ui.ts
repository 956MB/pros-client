
export enum EChangeType {
    FIXED = 'FIXED',
    IMPROVED = 'IMPROVED',
    ADDED = 'ADDED',
    REMOVED = 'REMOVED'
}

export enum ETooltip {
    TOOLTIP = 'tooltip',
    LEFT = 'tooltip-text tooltip-left',
    RIGHT = 'tooltip-text tooltip-right',
    TOP = 'tooltip-text tooltip-top',
    BOTTOM = 'tooltip-text tooltip-bottom',
    LEFTDELAY = 'tooltip-text-delay tooltip-left',
    RIGHTDELAY = 'tooltip-text-delay tooltip-right',
    TOPDELAY = 'tooltip-text-delay tooltip-top',
    BOTTOMDELAY = 'tooltip-text-delay tooltip-bottom'
}

export enum EAboutSections {
    REGION = 'Region:',
    MODE = 'Mode:',
    ROLE = 'Role:',
    CHAMPIONS = 'Champions:'
}

export enum EFilterType {
    SORTGROUP = "sortGroup",
    REGION = 'regions',
    TEAM = 'teams',
    ROLE = 'roles',
    CHAMPION = 'champions',
}
export const EAnyFilterType = EFilterType.SORTGROUP || EFilterType.REGION || EFilterType.TEAM || EFilterType.ROLE || EFilterType.CHAMPION;

export enum EButtonImages {
    NULL = 'image-null',
    NONE = 'image-none',
    FLAG = 'image-flag',
    ICON = 'image-icon',
    WORLD = 'image-world',
    ROLE = 'image-role',
    CHAMP = 'image-champ',
    RIGHT = 'image-right'
}

export enum EEMessages {
    ESC = 'ESC',
    UNAVAILABLE = 'tooltips.playerUnavailable',
    NONE_LOADED = 'tooltips.noPlayersLoaded'
}

export enum ELanguages {
    en_US = 'en_US',
    en_UK = 'en_UK',
    sv_SV = 'sv_SV',
    fi_FI = 'fi_FI',
    kr_KR = 'kr_KR',
    ja_JP = 'ja_JP',
    br_BA = 'br_BA'
}