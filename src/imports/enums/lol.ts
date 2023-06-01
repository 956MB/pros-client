import { IChampion, ITeamInfo, IRegion, IPlayerGroupInfo } from "../interfaces";

export enum ELeagues {
    LCK = 'LCK',
    LPL = 'LPL',
    LCS = 'LCS',
    LJL = 'LJL',
    LLA = 'LLA',
    LEC = 'LEC',
}

export enum ERegions {
    NA = 'na',
    EUW = 'euw',
    EUN = 'eun',
    OCE = 'oce',
    KR = 'kr',
    JP = 'jp',
    BR = 'br',
    RU = 'ru'
}

export enum EModes {
    ALL = 'all',
    RANKED_SOLODUO = 'rankedSoloDuo',
    RANKED_FLEX = 'rankedFlex',
    NORMAL_DRAFT = 'normalDraft',
    NORMAL_BLIND = 'normalBlind',
    URF = 'URF',
    ARAM = 'ARAM'
}

export enum ERoles {
    TOP = 'top',
    JUNGLE = 'jungle',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
    SUPPORT = 'support'
}

export enum EGroupBy {
    NONE = 'NONE',
    ROLE = 'ROLE',
    TEAM = 'TEAM',
    CHAMPION = 'CHAMPION'
}

export enum ECQData {
    URL = 'https://d1fodqbtqsx6d3.cloudfront.net/${DATA}.json',
    MATCHES = 'matches',
    LEADERBOARDS = 'leaderboards'
}

export enum ETeams {
    // TODO: go back and check abbreviations
    TF = 361, // Team Flash
    // NOTE: LCS:
    _100T = 29, // 100 Thieves
    IMT = 212, // Immortals
    CLG = 459, // Counter Logic Gaming
    EG = 267, // Evil Geniuses
    FLY = 677, // FlyQuest
    TL = 237, // Team Liquid
    TSM = 117, // TSM
    C9 = 196, // Cloud9
    DIG = 230, // Dignitas
    GG = 453, // Golden Guardians
    // NOTE: LEC:
    KOI = 206, // KOI
    RGE = 903, // Rogue
    MAD = 154, // MAD Lions
    G2 = 202, // G2 Esports
    FNC = 328, // Fnatic
    VIT = 431, // Team Vitality
    AST = 619, // Astralis
    BDS = 297, // Team BDS
    MSF = 562, // Misfits Gaming
    EXC = 407, // exceL Esports
    SK = 256, // SK Gaming
    // NOTE: LCK:
    T1 = 523, // T1
    DK = 636, // DWG Gaming
    KT = 679, // KT Rolster
    NS = 718, // Nongshim RedForce
    BRO = 730, // Fredit BRION
    GEN = 445, // Gen.G
    DRX = 918, // DRX
    LSB = 526, // Liiv SANDBOX
    HLE = 339, // Hanwha Life Esports
    KDF = 813, // Kwangdong Freecs
    // NOTE: LPL:
    LNG = 186, // LNG Esports
    TES = 394, // Top Esports
    JDG = 37, // JD Gaming
    EDG = 159, // EDward Gaming
    RA = 499, // Rare Atom
    LGD = 646, // LGD Gaming
    FPX = 105, // FunPlus Phoenix
    OMG = 107, // Oh My God
    IG = 584, // Invictus Gaming
    AL = 379, // Anyone's Legend
    BBG = 969, // Bilibili Gaming
    RNG = 635, // Royal Never Give Up
    WE = 759, // Team World Elite
    TT = 378, // ThunderTalk Gaming
    UP = 231, // Ultra Prime
    V5 = 817, // Victory Five
    WG = 103, // Weibo Gaming
    // NOTE: CBLOL:
    FLG = 857, // Flamengo Los Grandes
    FUR = 781, // FURIA Esports
    INTZ = 578, // INTZ e-Sports
    RED = 382, // RED Canids
    PNG = 586, // paiN Gaming
    LLL = 155, // LOUD
    KBM = 364, // KaBuM! e-Sports
    MIN = 374, // Netshoes Miners
    VL = 396, // Vorax Liberty
    RE = 820, // Rensga Esports
    // NOTE: LCL:
    DA = 106, // Dragon Army
    CC = 475, // CrowCrowd
    OBG = 565, // One Breath Gaming
    // NOTE: LJL:
    AXIZ = 838, // AXIZ
    BC = 218, // Burning Core
    CGA = 15, // Crest Gaming Act
    DFM = 696, // DetonatioN FocusMe
    SBH = 177, // Fukuoka SoftBank Hawks gaming
    RJ = 884, // Rascal Jester
    SG = 555, // Sengoku Gaming
    V3 = 816, // V3 Esports
    // NOTE: LLA:
    R7 = 95, // Rainbow7
    AK = 735, // All Knights
    ES = 347, // Estral Esports
    INF = 805, // Infinity eSports
    ISG = 743, // Isurus Gaming
    AZE = 915, // Team Aze
    XTEN = 904, // XTEN Esports
    // NOTE: LCO:
    CEC = 978, // Chiefs Esports Club
    MAM = 371, // MAMMOTH
    ORDER = 828, // ORDER
    PEACE = 930, // PEACE
    PGG = 24, // Pentanet.GG
    // NOTE: PCS:
    PSG = 7, // PSG Talon
    BG = 683, // Beyond Gaming
    CTBC = 484, // CTBC Flying Oyster
    JT = 182, // J Team
    // NOTE: TCL:
    _5R = 687, // 5 Ronin
    BEC = 11, // Besiktas e-Sports Club
    DP = 74, // Dark Passage
    FE = 335, // Fenerbahçe Esports
    GLA = 115, // Galakticos
    GLE = 607, // Galatasaray Esports
    IWC = 990, // Istanbul Wild Cats
    NASR = 553, // NASR eSports Turkey
    SMB = 923, // SuperMassive Blaze
    TA = 369, // Team AURORA
    // NOTE: VCS:
    CE = 179, // CERBERUS Esports
    GAM = 165, // GAM Esports
    SGB = 806, // Saigon Buffalo
    TS = 865, // Team Secret
}

export enum ETeamNames {
    // NOTE: LCS:
    _100T_SHORT = '100T',
    _100T_LONG = '100 Thieves',
    C9_SHORT = 'C9',
    C9_LONG = 'Cloud 9',
    CLG_SHORT = 'CLG',
    CLG_LONG = 'Counter Logic Gaming',
    DIG_SHORT = 'DIG',
    DIG_LONG = 'Dignitas',
    EG_SHORT = 'EG',
    EG_LONG = 'Evil Geniuses',
    FLY_SHORT = 'FLY',
    FLY_LONG = 'Flyquest',
    GG_SHORT = 'GG',
    GG_LONG = 'Golden Guardians',
    IMT_SHORT = 'IMT',
    IMT_LONG = 'Immortals',
    TL_SHORT = 'TL',
    TL_LONG = 'Team Liquid',
    TSM_SHORT = 'TSM',
    TSM_LONG = 'Team Solo Mid',
    // NOTE: LCK:
    DRX_SHORT = 'DRX',
    DRX_LONG = 'DRX',
    DK_SHORT = 'DK',
    DK_LONG = 'DWG KIA',
    BRO_SHORT = 'BRO',
    BRO_LONG = 'Fredit BRION',
    GEN_SHORT = 'GEN',
    GEN_LONG = 'Gen.G',
    HLE_SHORT = 'HLE',
    HLE_LONG = 'Hanwha Life',
    KT_SHORT = 'KT',
    KT_LONG = 'KT Rolster',
    KDF_SHORT = 'KDF',
    KDF_LONG = 'Kwangdong Freecs',
    LSB_SHORT = 'LSB',
    LSB_LONG = 'Liiv SANDBOX',
    NS_SHORT = 'NS',
    NS_LONG = 'NS RedForce',
    T1_SHORT = 'T1',
    T1_LONG = 'T1'
}

export function getGroupInfoFromKey(key: any): IPlayerGroupInfo {
    if ((key as string) === EGroupBy.NONE) {
        return { type: EGroupBy.NONE, image: "", text: ""};
    }
    if (Object.values(ERoles).includes(key as ERoles)) {
        return { type: "icon", image: `icons/lanes/${key as string}.png`, text: key as string};
    }

    const keys = Object.keys(ETeams).filter(k => typeof ETeams[k as any] === "number");
    const values = keys.map(k => ETeams[k as any].toString());
    if (values.includes(key as string)) {
        switch(key) {
            case ETeams.DRX.toString(): return { type: "logo", image: `logos/drx.png`, text: ETeamNames.DRX_SHORT};
            case ETeams.DK.toString(): return { type: "logo", image: `logos/dk.png`, text: ETeamNames.DK_SHORT};
            case ETeams.BRO.toString(): return { type: "logo", image: `logos/bro.png`, text: ETeamNames.BRO_SHORT};
            case ETeams.GEN.toString(): return { type: "logo", image: `logos/gen.png`, text: ETeamNames.GEN_SHORT};
            case ETeams.HLE.toString(): return { type: "logo", image: `logos/hle.png`, text: ETeamNames.HLE_SHORT};
            case ETeams.KT.toString(): return { type: "logo", image: `logos/kt.png`, text: ETeamNames.KT_SHORT};
            case ETeams.KDF.toString(): return { type: "logo", image: `logos/kdf.png`, text: ETeamNames.KDF_SHORT};
            case ETeams.LSB.toString(): return { type: "logo", image: `logos/lsb.png`, text: ETeamNames.LSB_SHORT};
            case ETeams.NS.toString(): return { type: "logo", image: `logos/ns.png`, text: ETeamNames.NS_SHORT};
            case ETeams.T1.toString(): return { type: "logo", image: `logos/t1.png`, text: ETeamNames.T1_SHORT};
        }
    }

    return { type: EGroupBy.NONE, image: "", text: ""};
}

export enum EChampions {
    AATROX = 266,
    AHRI = 103,
    AKALI = 84,
    AKSHAN = 166,
    ALISTAR = 12,
    AMUMU = 32,
    ANIVIA = 34,
    ANNIE = 1,
    APHELIOS = 523,
    ASHE = 22,
    AURELIONSOL = 136,
    AZIR = 268,
    BARD = 432,
    BELVETH = 200,
    BLITZCRANK = 53,
    BRAND = 63,
    BRAUM = 201,
    CAITLYN = 51,
    CAMILLE = 164,
    CASSIOPEIA = 69,
    CHOGATH = 31,
    CORKI = 42,
    DARIUS = 122,
    DIANA = 131,
    DRAVEN = 119,
    DRMUNDO = 36,
    EKKO = 245,
    ELISE = 60,
    EVELYNN = 28,
    EZREAL = 81,
    FIDDLESTICKS = 9,
    FIORA = 114,
    FIZZ = 105,
    GALIO = 3,
    GANGPLANK = 41,
    GAREN = 86,
    GNAR = 150,
    GRAGAS = 79,
    GRAVES = 104,
    GWEN = 887,
    HECARIM = 120,
    HEIMERDINGER = 74,
    ILLAOI = 420,
    IRELIA = 39,
    IVERN = 427,
    JANNA = 40,
    JARVANIV = 59,
    JAX = 24,
    JAYCE = 126,
    JHIN = 202,
    JINX = 222,
    KAISA = 145,
    KALISTA = 429,
    KARMA = 43,
    KARTHUS = 30,
    KASSADIN = 38,
    KATARINA = 55,
    KAYLE = 10,
    KAYN = 141,
    KENNEN = 85,
    KHAZIX = 121,
    KINDRED = 203,
    KLED = 240,
    KOGMAW = 96,
    KSANTE = 897,
    LEBLANC = 7,
    LEESIN = 64,
    LEONA = 89,
    LILLIA = 876,
    LISSANDRA = 127,
    LUCIAN = 236,
    LULU = 117,
    LUX = 99,
    MALPHITE = 54,
    MALZAHAR = 90,
    MAOKAI = 57,
    MASTERYI = 11,
    MISSFORTUNE = 21,
    WUKONG = 62,
    MORDEKAISER = 82,
    MORGANA = 25,
    NAMI = 267,
    NASUS = 75,
    NAUTILUS = 111,
    NEEKO = 518,
    NIDALEE = 76,
    NILAH = 895,
    NOCTURNE = 56,
    NUNU = 20,
    OLAF = 2,
    ORIANNA = 61,
    ORNN = 516,
    PANTHEON = 80,
    POPPY = 78,
    PYKE = 555,
    QIYANA = 246,
    QUINN = 133,
    RAKAN = 497,
    RAMMUS = 33,
    REKSAI = 421,
    RELL = 526,
    RENATAGLASC = 888,
    RENEKTON = 58,
    RENGAR = 107,
    RIVEN = 92,
    RUMBLE = 68,
    RYZE = 13,
    SAMIRA = 360,
    SEJUANI = 113,
    SENNA = 235,
    SERAPHINE = 147,
    SETT = 875,
    SHACO = 35,
    SHEN = 98,
    SHYVANA = 102,
    SINGED = 27,
    SION = 14,
    SIVIR = 15,
    SKARNER = 72,
    SONA = 37,
    SORAKA = 16,
    SWAIN = 50,
    SYLAS = 517,
    SYNDRA = 134,
    TAHMKENCH = 223,
    TALIYAH = 163,
    TALON = 91,
    TARIC = 44,
    TEEMO = 17,
    THRESH = 412,
    TRISTANA = 18,
    TRUNDLE = 48,
    TRYNDAMERE = 23,
    TWISTEDFATE = 4,
    TWITCH = 29,
    UDYR = 77,
    URGOT = 6,
    VARUS = 110,
    VAYNE = 67,
    VEIGAR = 45,
    VELKOZ = 161,
    VEX = 711,
    VI = 254,
    VIEGO = 234,
    VIKTOR = 112,
    VLADIMIR = 8,
    VOLIBEAR = 106,
    WARWICK = 19,
    XAYAH = 498,
    XERATH = 101,
    XINZHAO = 5,
    YASUO = 157,
    YONE = 777,
    YORICK = 83,
    YUUMI = 350,
    ZAC = 154,
    ZED = 238,
    ZERI = 221,
    ZIGGS = 115,
    ZILEAN = 26,
    ZOE = 142,
    ZYRA = 143
}

export function getRegion(regionE: string): IRegion {
    switch (regionE) {
        case ERegions.NA: return { use: "NA1", display: "NA" };
        case ERegions.EUW: return { use: "EUW1", display: "EUW" };
        case ERegions.EUN: return { use: "EUN1", display: "EUN" };
        case ERegions.OCE: return { use: "OC1", display: "OCE" };
        case ERegions.KR: return { use: "KR", display: "KR" };
        case ERegions.JP: return { use: "JP1", display: "JP" };
        case ERegions.BR: return { use: "BR1", display: "BR" };
        case ERegions.RU: return { use: "RU", display: "RU" };
        default: return { use: "", display: "World" };
    }
}

export function getTeamInfo(team: ETeamNames | ETeams): ITeamInfo {
    if (team === ETeams._100T || team === ETeamNames._100T_SHORT) { return {code: ETeams._100T, short: ETeamNames._100T_SHORT, long: ETeamNames._100T_LONG, accent: ""}; }
    if (team === ETeams.C9 || team === ETeamNames.C9_SHORT) { return {code: ETeams.C9, short: ETeamNames.C9_SHORT, long: ETeamNames.C9_LONG, accent: ""}; }
    if (team === ETeams.CLG || team === ETeamNames.CLG_SHORT) { return {code: ETeams.CLG, short: ETeamNames.CLG_SHORT, long: ETeamNames.CLG_LONG, accent: ""}; }
    if (team === ETeams.DIG || team === ETeamNames.DIG_SHORT) { return {code: ETeams.DIG, short: ETeamNames.DIG_SHORT, long: ETeamNames.DIG_LONG, accent: ""}; }
    if (team === ETeams.EG || team === ETeamNames.EG_SHORT) { return {code: ETeams.EG, short: ETeamNames.EG_SHORT, long: ETeamNames.EG_LONG, accent: ""}; }
    if (team === ETeams.FLY || team === ETeamNames.FLY_SHORT) { return {code: ETeams.FLY, short: ETeamNames.FLY_SHORT, long: ETeamNames.FLY_LONG, accent: ""}; }
    if (team === ETeams.GG || team === ETeamNames.GG_SHORT) { return {code: ETeams.GG, short: ETeamNames.GG_SHORT, long: ETeamNames.GG_LONG, accent: ""}; }
    if (team === ETeams.IMT || team === ETeamNames.IMT_SHORT) { return {code: ETeams.IMT, short: ETeamNames.IMT_SHORT, long: ETeamNames.IMT_LONG, accent: ""}; }
    if (team === ETeams.TL || team === ETeamNames.TL_SHORT) { return {code: ETeams.TL, short: ETeamNames.TL_SHORT, long: ETeamNames.TL_LONG, accent: ""}; }
    if (team === ETeams.TSM || team === ETeamNames.TSM_SHORT) { return {code: ETeams.TSM, short: ETeamNames.TSM_SHORT, long: ETeamNames.TSM_LONG, accent: ""}; }
    
    if (team === ETeams.DRX || team === ETeamNames.DRX_SHORT) { return {code: ETeams.DRX, short: ETeamNames.DRX_SHORT, long: ETeamNames.DRX_LONG, accent: ""}; }
    if (team === ETeams.DK || team === ETeamNames.DK_SHORT) { return {code: ETeams.DK, short: ETeamNames.DK_SHORT, long: ETeamNames.DK_LONG, accent: ""}; }
    if (team === ETeams.BRO || team === ETeamNames.BRO_SHORT) { return {code: ETeams.BRO, short: ETeamNames.BRO_SHORT, long: ETeamNames.BRO_LONG, accent: ""}; }
    if (team === ETeams.GEN || team === ETeamNames.GEN_SHORT) { return {code: ETeams.GEN, short: ETeamNames.GEN_SHORT, long: ETeamNames.GEN_LONG, accent: ""}; }
    if (team === ETeams.HLE || team === ETeamNames.HLE_SHORT) { return {code: ETeams.HLE, short: ETeamNames.HLE_SHORT, long: ETeamNames.HLE_LONG, accent: ""}; }
    if (team === ETeams.KT || team === ETeamNames.KT_SHORT) { return {code: ETeams.KT, short: ETeamNames.KT_SHORT, long: ETeamNames.KT_LONG, accent: ""}; }
    if (team === ETeams.KDF || team === ETeamNames.KDF_SHORT) { return {code: ETeams.KDF, short: ETeamNames.KDF_SHORT, long: ETeamNames.KDF_LONG, accent: ""}; }
    if (team === ETeams.LSB || team === ETeamNames.LSB_SHORT) { return {code: ETeams.LSB, short: ETeamNames.LSB_SHORT, long: ETeamNames.LSB_LONG, accent: ""}; }
    if (team === ETeams.NS || team === ETeamNames.NS_SHORT) { return {code: ETeams.NS, short: ETeamNames.NS_SHORT, long: ETeamNames.NS_LONG, accent: ""}; }
    if (team === ETeams.T1 || team === ETeamNames.T1_SHORT) { return {code: ETeams.T1, short: ETeamNames.T1_SHORT, long: ETeamNames.T1_LONG, accent: ""}; }
    
    return {code: -1, short: "", long: "", accent: ""};
}

export function getChampionFromId(champion: number): IChampion | undefined {
    switch (champion) {
        case EChampions.AATROX: return { name: "Aatrox", color: "247, 71, 69" }
        case EChampions.AHRI: return { name: "Ahri", color: "68, 77, 205" }
        case EChampions.AKALI: return { name: "Akali", color: "45, 119, 87" }
        case EChampions.AKSHAN: return { name: "Akshan", color: "255, 217, 111" }
        case EChampions.ALISTAR: return { name: "Alistar", color: "83, 57, 134" }
        case EChampions.AMUMU: return { name: "Amumu", color: "132, 227, 118" }
        case EChampions.ANIVIA: return { name: "Anivia", color: "22, 141, 197" }
        case EChampions.ANNIE: return { name: "Annie", color: "255, 166, 0" }
        case EChampions.APHELIOS: return { name: "Aphelios", color: "152, 215, 239" }
        case EChampions.ASHE: return { name: "Ashe", color: "32, 51, 253" }
        case EChampions.AURELIONSOL: return { name: "AurelionSol", color: "32, 51, 253" }
        case EChampions.AZIR: return { name: "Azir", color: "255, 166, 0" }
        case EChampions.BARD: return { name: "Bard", color: "255, 166, 0" }
        case EChampions.BELVETH: return { name: "Belveth", color: "102, 109, 201" }
        case EChampions.BLITZCRANK: return { name: "Blitzcrank", color: "255, 166, 0" }
        case EChampions.BRAND: return { name: "Brand", color: "255, 166, 0" }
        case EChampions.BRAUM: return { name: "Braum", color: "24, 178, 218" }
        case EChampions.CAITLYN: return { name: "Caitlyn", color: "24, 178, 218" }
        case EChampions.CAMILLE: return { name: "Camille", color: "251, 248, 246" }
        case EChampions.CASSIOPEIA: return { name: "Cassiopeia", color: "242, 187, 118" }
        case EChampions.CHOGATH: return { name: "Chogath", color: "128, 17, 47" }
        case EChampions.CORKI: return { name: "Corki", color: "255, 166, 0" }
        case EChampions.DARIUS: return { name: "Darius", color: "177, 5, 15" }
        case EChampions.DIANA: return { name: "Diana", color: "231, 233, 247" }
        case EChampions.DRAVEN: return { name: "Draven", color: "239, 182, 156" }
        case EChampions.DRMUNDO: return { name: "DrMundo", color: "155, 75, 208" }
        case EChampions.EKKO: return { name: "Ekko", color: "138, 220, 209" }
        case EChampions.ELISE: return { name: "Elise", color: "177, 5, 15" }
        case EChampions.EVELYNN: return { name: "Evelynn", color: "245, 64, 196" }
        case EChampions.EZREAL: return { name: "Ezreal", color: "249, 217, 141" }
        case EChampions.FIDDLESTICKS: return { name: "Fiddlesticks", color: "255, 166, 0" }
        case EChampions.FIORA: return { name: "Fiora", color: "204, 40, 95" }
        case EChampions.FIZZ: return { name: "Fizz", color: "117, 208, 227" }
        case EChampions.GALIO: return { name: "Galio", color: "251, 248, 244" }
        case EChampions.GANGPLANK: return { name: "Gangplank", color: "255, 210, 127" }
        case EChampions.GAREN: return { name: "Garen", color: "43, 79, 221" }
        case EChampions.GNAR: return { name: "Gnar", color: "211, 88, 50" }
        case EChampions.GRAGAS: return { name: "Gragas", color: "211, 60, 22" }
        case EChampions.GRAVES: return { name: "Graves", color: "177, 5, 15" }
        case EChampions.GWEN: return { name: "Gwen", color: "0, 213, 255" }
        case EChampions.HECARIM: return { name: "Hecarim", color: "0, 255, 216" }
        case EChampions.HEIMERDINGER: return { name: "Heimerdinger", color: "255, 166, 0" }
        case EChampions.ILLAOI: return { name: "Illaoi", color: "251, 251, 246" }
        case EChampions.IRELIA: return { name: "Irelia", color: "157, 123, 255" }
        case EChampions.IVERN: return { name: "Ivern", color: "187, 208, 10" }
        case EChampions.JANNA: return { name: "Janna", color: "234, 249, 249" }
        case EChampions.JARVANIV: return { name: "JarvanIV", color: "230, 170, 59" }
        case EChampions.JAX: return { name: "Jax", color: "118, 34, 186" }
        case EChampions.JAYCE: return { name: "Jayce", color: "189, 29, 15" }
        case EChampions.JHIN: return { name: "Jhin", color: "241, 251, 254" }
        case EChampions.JINX: return { name: "Jinx", color: "187, 12, 173" }
        case EChampions.KAISA: return { name: "Kaisa", color: "135, 66, 184" }
        case EChampions.KALISTA: return { name: "Kalista", color: "0, 194, 219" }
        case EChampions.KARMA: return { name: "Karma", color: "69, 205, 151" }
        case EChampions.KARTHUS: return { name: "Karthus", color: "201, 250, 255" }
        case EChampions.KASSADIN: return { name: "Kassadin", color: "118, 34, 186" }
        case EChampions.KATARINA: return { name: "Katarina", color: "177, 5, 15" }
        case EChampions.KAYLE: return { name: "Kayle", color: "255, 166, 0" }
        case EChampions.KAYN: return { name: "Kayn", color: "184, 51, 51" }
        case EChampions.KENNEN: return { name: "Kennen", color: "243, 97, 255" }
        case EChampions.KHAZIX: return { name: "Khazix", color: "117, 12, 178" }
        case EChampions.KINDRED: return { name: "Kindred", color: "3, 139, 235" }
        case EChampions.KLED: return { name: "Kled", color: "255, 166, 0" }
        case EChampions.KOGMAW: return { name: "KogMaw", color: "255, 219, 208" }
        case EChampions.KSANTE: return { name: "K'Sante", color: "255, 219, 208" }
        case EChampions.LEBLANC: return { name: "Leblanc", color: "135, 66, 184" }
        case EChampions.LEESIN: return { name: "LeeSin", color: "177, 5, 15" }
        case EChampions.LEONA: return { name: "Leona", color: "255, 166, 0" }
        case EChampions.LILLIA: return { name: "Lillia", color: "243, 97, 255" }
        case EChampions.LISSANDRA: return { name: "Lissandra", color: "3, 139, 235" }
        case EChampions.LUCIAN: return { name: "Lucian", color: "255, 240, 234" }
        case EChampions.LULU: return { name: "Lulu", color: "243, 97, 255" }
        case EChampions.LUX: return { name: "Lux", color: "255, 166, 0" }
        case EChampions.MALPHITE: return { name: "Malphite", color: "255, 118, 110" }
        case EChampions.MALZAHAR: return { name: "Malzahar", color: "117, 12, 178" }
        case EChampions.MAOKAI: return { name: "Maokai", color: "61, 180, 153" }
        case EChampions.MASTERYI: return { name: "MasterYi", color: "239, 255, 106" }
        case EChampions.MISSFORTUNE: return { name: "MissFortune", color: "211, 60, 22" }
        case EChampions.WUKONG: return { name: "MonkeyKing", color: "177, 5, 15" }
        case EChampions.MORDEKAISER: return { name: "Mordekaiser", color: "0, 255, 136" }
        case EChampions.MORGANA: return { name: "Morgana", color: "187, 12, 173" }
        case EChampions.NAMI: return { name: "Nami", color: "0, 182, 133" }
        case EChampions.NASUS: return { name: "Nasus", color: "117, 12, 178" }
        case EChampions.NAUTILUS: return { name: "Nautilus", color: "211, 60, 22" }
        case EChampions.NEEKO: return { name: "Neeko", color: "187, 12, 173" }
        case EChampions.NIDALEE: return { name: "Nidalee", color: "255, 166, 0" }
        case EChampions.NILAH: return { name: "Nilah", color: "195, 174, 255" }
        case EChampions.NOCTURNE: return { name: "Nocturne", color: "132, 0, 255" }
        case EChampions.NUNU: return { name: "Nunu", color: "0, 192, 255" }
        case EChampions.OLAF: return { name: "Olaf", color: "255, 166, 0" }
        case EChampions.ORIANNA: return { name: "Orianna", color: "237, 225, 255" }
        case EChampions.ORNN: return { name: "Ornn", color: "177, 5, 15" }
        case EChampions.PANTHEON: return { name: "Pantheon", color: "255, 252, 238" }
        case EChampions.POPPY: return { name: "Poppy", color: "255, 0, 98" }
        case EChampions.PYKE: return { name: "Pyke", color: "0, 255, 221" }
        case EChampions.QIYANA: return { name: "Qiyana", color: "250, 89, 12" }
        case EChampions.QUINN: return { name: "Quinn", color: "189, 119, 162" }
        case EChampions.RAKAN: return { name: "Rakan", color: "189, 119, 162" }
        case EChampions.RAMMUS: return { name: "Rammus", color: "255, 166, 0" }
        case EChampions.REKSAI: return { name: "RekSai", color: "0, 195, 235" }
        case EChampions.RELL: return { name: "Rell", color: "255, 166, 0" }
        case EChampions.RENATAGLASC: return { name: "Renata", color: "200, 30, 128" }
        case EChampions.RENEKTON: return { name: "Renekton", color: "201, 106, 24" }
        case EChampions.RENGAR: return { name: "Rengar", color: "157, 172, 168" }
        case EChampions.RIVEN: return { name: "Riven", color: "208, 247, 233" }
        case EChampions.RUMBLE: return { name: "Rumble", color: "200, 48, 14" }
        case EChampions.RYZE: return { name: "Ryze", color: "132, 101, 255" }
        case EChampions.SAMIRA: return { name: "Samira", color: "255, 201, 132" }
        case EChampions.SEJUANI: return { name: "Sejuani", color: "8, 116, 231" }
        case EChampions.SENNA: return { name: "Senna", color: "57, 223, 106" }
        case EChampions.SERAPHINE: return { name: "Seraphine", color: "243, 97, 255" }
        case EChampions.SETT: return { name: "Sett", color: "255, 93, 119" }
        case EChampions.SHACO: return { name: "Shaco", color: "177, 5, 15" }
        case EChampions.SHEN: return { name: "Shen", color: "102, 109, 201" }
        case EChampions.SHYVANA: return { name: "Shyvana", color: "177, 5, 15" }
        case EChampions.SINGED: return { name: "Singed", color: "92, 247, 85" }
        case EChampions.SION: return { name: "Sion", color: "177, 5, 15" }
        case EChampions.SIVIR: return { name: "Sivir", color: "255, 166, 0" }
        case EChampions.SKARNER: return { name: "Skarner", color: "134, 115, 255" }
        case EChampions.SONA: return { name: "Sona", color: "0, 195, 255" }
        case EChampions.SORAKA: return { name: "Soraka", color: "134, 115, 255" }
        case EChampions.SWAIN: return { name: "Swain", color: "255, 0, 0" }
        case EChampions.SYLAS: return { name: "Sylas", color: "132, 101, 255" }
        case EChampions.SYNDRA: return { name: "Syndra", color: "201, 66, 238" }
        case EChampions.TAHMKENCH: return { name: "TahmKench", color: "157, 172, 168" }
        case EChampions.TALIYAH: return { name: "Taliyah", color: "211, 60, 22" }
        case EChampions.TALON: return { name: "Talon", color: "110, 50, 125" }
        case EChampions.TARIC: return { name: "Taric", color: "134, 115, 255" }
        case EChampions.TEEMO: return { name: "Teemo", color: "255, 166, 0" }
        case EChampions.THRESH: return { name: "Thresh", color: "0, 255, 115" }
        case EChampions.TRISTANA: return { name: "Tristana", color: "134, 115, 255" }
        case EChampions.TRUNDLE: return { name: "Trundle", color: "173, 17, 127" }
        case EChampions.TRYNDAMERE: return { name: "Tryndamere", color: "78, 226, 172" }
        case EChampions.TWISTEDFATE: return { name: "TwistedFate", color: "82, 58, 87" }
        case EChampions.TWITCH: return { name: "Twitch", color: "92, 247, 85" }
        case EChampions.UDYR: return { name: "Udyr", color: "255, 166, 0" }
        case EChampions.URGOT: return { name: "Urgot", color: "0, 255, 115" }
        case EChampions.VARUS: return { name: "Varus", color: "222, 0, 84" }
        case EChampions.VAYNE: return { name: "Vayne", color: "255, 0, 212" }
        case EChampions.VEIGAR: return { name: "Veigar", color: "30, 0, 255" }
        case EChampions.VELKOZ: return { name: "Velkoz", color: "187, 12, 173" }
        case EChampions.VEX: return { name: "Vex", color: "0, 195, 255" }
        case EChampions.VI: return { name: "Vi", color: "230, 40, 104" }
        case EChampions.VIEGO: return { name: "Viego", color: "196, 253, 255" }
        case EChampions.VIKTOR: return { name: "Viktor", color: "255, 166, 0" }
        case EChampions.VLADIMIR: return { name: "Vladimir", color: "211, 60, 22" }
        case EChampions.VOLIBEAR: return { name: "Volibear", color: "7, 106, 255" }
        case EChampions.WARWICK: return { name: "Warwick", color: "92, 247, 85" }
        case EChampions.XAYAH: return { name: "Xayah", color: "177, 5, 15" }
        case EChampions.XERATH: return { name: "Xerath", color: "7, 106, 255" }
        case EChampions.XINZHAO: return { name: "XinZhao", color: "47, 51, 255" }
        case EChampions.YASUO: return { name: "Yasuo", color: "50, 142, 255" }
        case EChampions.YONE: return { name: "Yone", color: "177, 5, 15" }
        case EChampions.YORICK: return { name: "Yorick", color: "112, 228, 216" }
        case EChampions.YUUMI: return { name: "Yuumi", color: "202, 6, 137" }
        case EChampions.ZAC: return { name: "Zac", color: "0, 255, 115" }
        case EChampions.ZED: return { name: "Zed", color: "211, 60, 22" }
        case EChampions.ZERI: return { name: "Zeri", color: "142, 247, 85" }
        case EChampions.ZIGGS: return { name: "Ziggs", color: "255, 166, 0" }
        case EChampions.ZILEAN: return { name: "Zilean", color: "94, 223, 255" }
        case EChampions.ZOE: return { name: "Zoe", color: "255, 94, 106" }
        case EChampions.ZYRA: return { name: "Zyra", color: "211, 60, 22" }
        default: return undefined
    }
}