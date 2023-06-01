import React, { useState, useEffect, useReducer, useContext } from 'react';
import '../css/accounts.css';

import { IPlayerGroups, IPlayers, ISummoner, ISummoners } from '../../imports/interfaces';
import PlayersSection from "./PlayersSection";
import AccountsGroup from './AccountsGroup';

const PlayerAccounts: React.FC<{
    players: ISummoners
}> = ({ players }) => {
    const [useAccountsState, setUseAccountsState] = useState<ISummoners>(players);

    useEffect(() => {
        if (useAccountsState) {
            setUseAccountsState(players);
        }
    }, [useAccountsState]);

    return (
        <div className={`accounts-container`}>
            <div className={`accounts-scroll`}>
                <PlayersSection sectionIndex={0} sectionTitle={`titles.accounts`} sectionTotal={players.length} sectionEmptyMessage={`tooltips.noFavorites`} />

                {players.length >= 1 ?
                    <AccountsGroup
                        players={players} />
                : null}
            </div>
        </div>
    )
}

export default PlayerAccounts;