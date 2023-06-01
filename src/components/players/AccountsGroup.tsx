import React, { useState, useReducer, useContext } from 'react';
import '../css/accounts.css';

import { IPlayerGroupInfo, IPlayers, ISummoners } from "../../imports/interfaces";
import RenderIfVisible from 'react-render-if-visible'
import AccountsCard from '../cards/AccountsCard';

const ACCOUNTS_CARD_HEIGHT = 180;

const AccountsGroup: React.FC<{
    players: ISummoners
}> = ({ players }) => {

    return (
        <div className={`accounts-group`}>
            <div className={`accounts-grid`}>
                {React.Children.toArray(
                    players.map((player) =>
                        <RenderIfVisible defaultHeight={ACCOUNTS_CARD_HEIGHT}>
                            <AccountsCard
                                playerProps={player} />
                        </RenderIfVisible>
                    )
                )}
            </div>
        </div>
    )
}

export default AccountsGroup;