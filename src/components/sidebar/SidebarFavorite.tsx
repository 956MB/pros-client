import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ETooltip } from '../../imports/enums/ui';
import '../css/sidebar.css';

import { IPlayer, ISidebarButton } from "../../imports/interfaces";
import { secondsToTime } from "../../imports/utils";

const SidebarFavorite: React.FC<{
    extraClass: string,
    buttonProps: ISidebarButton,
    favoriteProps: IPlayer,
    globalInterval: number
}> = ({ extraClass, buttonProps, favoriteProps, globalInterval }) => {

    return (
        <div
            className={`favorite-button`}
            onClick={buttonProps.action}
        >
            <span className='favorite-game-timer-text noselect'>{`${secondsToTime(favoriteProps.gameInfo.gameTime + globalInterval)}`}</span>
            {/* <img src={`src/assets/photos/${favoriteProps.summoner.playerImage}`} alt="player" /> */}
            <div
                className={`favorite-champ-bg`}
                // style={{ backgroundImage: `url(src/assets/dragontail/champion/${favoriteProps.champion.name}.png)` }}
                // style={{ backgroundColor: `rgb(${favoriteProps.summoner.team.accent})`}}
                >
            </div>
        </div>
    )
}

export default SidebarFavorite;