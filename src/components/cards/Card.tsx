import React, { useState, useReducer, useContext } from 'react';
import '../css/card.css';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { secondsToTime, randomNumber, noPunc } from '../../imports/utils';
import { IMenuOrigin, IPlayer, ICardStates, IReducerAction } from '../../imports/interfaces';

import { ECardReducerStates } from '../../imports/enums/states';
import { EButtonImages, EEMessages, ETooltip } from '../../imports/enums/ui';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../../context/SettingsContext';
import { clockIconQuarterPast, clockIconHalfPast, clockIconQuarterTo, clockIconOclock } from '../../imports/icons';

import { CardMenu } from './CardMenu';

const cardReducer = (state: ICardStates, action: IReducerAction): ICardStates => {
    switch (action.type) {
        case ECardReducerStates.LEVEL: return { ...state, level: action.payload as number };
        case ECardReducerStates.GAME_TIME: return { ...state, gameTime: action.payload as number };
        case ECardReducerStates.BACKGROUND_DIR: return { ...state, backgroundDir: action.payload as string };
        case ECardReducerStates.MENU_ORIGIN: return { ...state, menuOrigin: action.payload as IMenuOrigin };
        case ECardReducerStates.CARD_PRESSED: return { ...state, cardPressed: action.payload as boolean };
        default: return state;
    }
}

const Card: React.FC<{
    playerProps: IPlayer,
    globalInterval: number,
    menuOpen: boolean,
    endOfGroup: boolean,
    fHandleMenuOpen: (set: number) => void,
    fHandlePlayerFavorited: (name: string) => void
}> = ({ playerProps, globalInterval, menuOpen, endOfGroup, fHandleMenuOpen, fHandlePlayerFavorited }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds, showRandomSkins } = useContext(SettingsContext);
    const [playerFavorited, setPlayerFavorited] = useState<boolean>(playerProps.favorite);
    const [champ, setChamp] = useState<string>(playerProps.gameInfo.champion.name);

    const [state, dispatch] = useReducer(cardReducer, {
        level: randomNumber(30, 500),
        gameTime: playerProps.gameInfo.gameTime,
        backgroundDir: "centered",
        menuOrigin: { x: 0, y: 0 },
        cardPressed: false
    })

    const getGameTimeIcon = (seconds: number): string => {
        if (seconds > 0 && seconds < 600) { return clockIconQuarterPast; }
        else if (seconds >= 600 && seconds < 1200) { return clockIconHalfPast; }
        else if (seconds >= 1200 && seconds < 2100) { return clockIconQuarterTo; }

        return clockIconOclock;
    }

    const toggleMenuClosed = (e: any) => {
        e.stopPropagation();
        if (menuOpen) { fHandleMenuOpen(-1); }
    }
    const toggleMenuOpen = (e: any) => {
        // TODO: detect if menu being opened will be outside viewport, change menu x/y to show inside
        e.preventDefault(); e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        
        if (playerProps.active) {
            dispatch({ type: ECardReducerStates.MENU_ORIGIN, payload: { x: newX, y: newY + 5 } });
            fHandleMenuOpen(playerProps.id);
        }
    }

    const cardRef = useDetectClickOutside({ onTriggered: toggleMenuClosed });

    return (
        <div className={`card-outer`}>
            {(menuOpen)
                ? <CardMenu
                    player={playerProps}
                    favorited={playerFavorited}
                    fToggleFavorited={() => fHandlePlayerFavorited(playerProps.playerAccount.summonerName)}
                    menuX={state.menuOrigin.x}
                    menuY={state.menuOrigin.y} /> : null}

            <div
                className={`player-card ${!playerProps.active ? 'card-unavailable' : ''} ${menuOpen ? 'player-card-clicked' : ''}`}
                onClick={toggleMenuOpen}
                onMouseDown={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: true })}
                onMouseUp={() => dispatch({ type: ECardReducerStates.CARD_PRESSED, payload: false })}
                ref={cardRef}
            >
                <div className={`corner-logo ${playerProps.gameInfo.isChampionsQueue ? 'corner-cq' : ''}`}>
                    <img src={`src/assets/icons/lanes/${playerProps.playerInfo.role}.png`} alt="role" className={`card-role card-role-${playerProps.playerInfo.role} noselect`} />
                    <span className='text-sub-region noselect'>{playerProps.playerAccount.region}</span>
                </div>

                <div className={`loading-dots ${ETooltip.TOOLTIP}`}>
                    <h1 className="loading-dot dot-one">.</h1>
                    <h1 className="loading-dot dot-two">.</h1>
                    <h1 className="loading-dot dot-three">.</h1>
                    <span className={`${playerProps.active ? EButtonImages.NULL : ETooltip.BOTTOM}`}>{t(EEMessages.UNAVAILABLE, { insert: playerProps.playerInfo.playerName })}</span>
                </div>

                <div
                    className='card-photo noselect'
                    style={{backgroundImage:
                        `url(src/assets/photos/${playerProps.playerInfo.playerImage})`
                    }}></div>

                <div
                    className={`${state.backgroundDir === "centered" ? 'card-image' : 'card-image-cutout'} ${playerProps.gameInfo.isChampionsQueue ? 'card-image-cq' : ''}`}
                    style={{backgroundImage: `
                        ${playerProps.gameInfo.isChampionsQueue ?
                            'linear-gradient(to bottom, transparent, transparent),'
                        : ''}
                        url(http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${noPunc(champ)}_0.jpg)
                        `
                    }}
                ></div>

                <div className='card-content'>
                    <div className='text-container'>
                        <div className={`summoner-container`}>
                            <img src={`src/assets/logos/color/${playerProps.playerInfo.team.short}.png`} alt="team-logo-small" className={`card-logo-small ${playerProps.playerInfo.team.short}-small noselect`} />
                            <span className='text-summoner'>
                                {showSummonerIds ? playerProps.playerAccount.summonerName : playerProps.playerInfo.playerName}
                            </span>
                        </div>
                        <div className='text-sub-container'>
                            <img src={`${getGameTimeIcon(state.gameTime + globalInterval)}`} alt="game-time" className={`card-icon-small noselect`} />
                            <span className='text-sub noselect'>{`${secondsToTime(state.gameTime + globalInterval)}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;