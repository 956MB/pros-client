import React, { useState, useReducer, useContext } from 'react';
import '../css/accounts.css';

import {IPlayer, ISummoner, ISummonerAccount} from '../../imports/interfaces';
import { SettingsContext } from '../../context/SettingsContext';
import { arrayRandom, noWhitespace } from "../../imports/utils";
import { ETooltip } from '../../imports/enums/ui';

const AccountsCard: React.FC<{
    playerProps: ISummoner,
}> = ({ playerProps }) => {
    const { showSummonerIds } = useContext(SettingsContext);

    return (
        <div className={`accounts-outer`}>
            <div className={`accounts-card`}>
                <div className={`accounts-info-section`}>
                    <div className={`accounts-info-container`}>
                        <div className={`accounts-info-team-logo ${playerProps.playerInfo.team.short.toLowerCase()}-logo ${ETooltip.TOOLTIP}`} style={{ backgroundImage: `url(src/assets/logos/color/${playerProps.playerInfo.team.short.toLowerCase()}.png)` }}>
                            <span className={`${ETooltip.LEFTDELAY}`}>{playerProps.playerInfo.team.long}</span>
                        </div>
                        <div className={`accounts-info-text-container`}>
                            <span className={`accounts-info-name ${playerProps.playerInfo.playerName.toLowerCase()} select`}>{playerProps.playerInfo.playerName}</span>
                        </div>
                    </div>
                    <div className={`accounts-photo-container`}>
                        <div className='player-photo noselect' style={{ backgroundImage: `url(src/assets/photos/${playerProps.playerInfo.playerImage})` }}></div>
                    </div>
                </div>

                <div className={`accounts-list-section`}>
                    {React.Children.toArray(
                        playerProps.playerAccounts.slice(0, 6).map((account) =>
                            <AccountEntry
                                accountProps={account} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

const AccountEntry: React.FC<{
    accountProps: ISummonerAccount,
}> = ({ accountProps }) => {
    const { showSummonerIds } = useContext(SettingsContext);
    const [testRank, setTestRank] = useState<string>("Challenger");

    return (
        <div className={`account-entry-container`}>
            <img className={`entry-profile-icon noselect`} src={`src/assets/dragontail/profileicon/${accountProps.profileIcon}.png`} alt={`profileicon`}></img>
            <div className={`entry-info-container`}>
                <span className={`entry-account-name select`}>{accountProps.summonerName}</span>
                <div className={`entry-sub-container`}>
                    <span className={`entry-account-rank ${noWhitespace(testRank)}-rank noselect`}>{testRank}</span>
                    <span className={`entry-account-sub entry-sub-dot noselect`}>{`·`}</span>
                    <span className={`entry-account-sub entry-sub-normal noselect`}>{accountProps.region.toUpperCase()}</span>
                </div>
            </div>
        </div>
    )
}

export default AccountsCard;