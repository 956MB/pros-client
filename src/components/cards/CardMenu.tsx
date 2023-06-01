
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import '../css/card.css';

import { IPlayer } from "../../imports/interfaces";
import { SettingsContext } from '../../context/SettingsContext';
import { whichStream } from "../../imports/utils";

const CardMenu: React.FC<{
    player: IPlayer,
    favorited: boolean,
    fToggleFavorited: () => void,
    menuX: number,
    menuY: number
}> = ({ player, favorited, fToggleFavorited, menuX, menuY }) => {
    const { t } = useTranslation('common');
    const { showSummonerIds } = useContext(SettingsContext);
    const [ toggleBounce, setToggleBounce ] = useState<boolean>(false);

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, callback: () => void) => {
        e.preventDefault(); e.stopPropagation();
        callback();
    }
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const triggerBounce = () => {
        setToggleBounce(true);
        setInterval(() => {
            setToggleBounce(false);
        }, 200)
    }

    return (
        <div className={`card-menu`} style={{ top: menuY, left: menuX }}>
            <span className='card-menu-title noselect'>{`${showSummonerIds ? player.playerAccount.summonerName : player.playerInfo.playerName}`}</span>

            <div className={`card-menu-spacer`}>
                <div className='menu-divider'></div>
            </div>

            <div className="card-menu-upper">
                <div className='card-menu-button menu-button-disabled' onClick={(event) => stopPropagation(event, () => {})}>
                    <div className='menu-icon-container'>
                        <div className={`tv-icon tvNormal`}></div>
                    </div>
                    <span className='noselect'>{t('menus.spectate')}</span>
                </div>
                
                {player.playerInfo.stream === "" ? null
                    :
                <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => openInNewTab(player.playerInfo.stream))}>
                        <div className='menu-icon-container'>
                            <div className={`arrow-icon arrowNormal`}></div>
                        </div>
                    <span className='noselect'>{t(whichStream(player.playerInfo.stream))}</span>
                </div>}
            </div>

            <div className="card-menu-lower">
                <div className='card-menu-button' onClick={(event) => stopPropagation(event, () => {
                    fToggleFavorited(); triggerBounce()
                    })}>
                    <div className='menu-icon-container'>
                        <div className={`heart-icon ${favorited ? 'heartFavorited' : 'heartUnfavorited'} ${toggleBounce ? 'icon-bounce' : 'icon-normal'}`}></div>
                    </div>
                    <span className='noselect'>{t(favorited ? 'menus.unfavorite' : 'menus.favorite')}</span>
                </div>
            </div>
        </div>
    )
}

export {
    CardMenu
}