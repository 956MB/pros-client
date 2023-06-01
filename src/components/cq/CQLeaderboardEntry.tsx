import React, { useContext, useState } from 'react';

import { isOdd } from "../../imports/utils";
import { ICQLeaderboardEntry } from "../../imports/interfaces";

const CQLeaderboardEntry: React.FC<{
    entryIndex: number,
    entryProps: ICQLeaderboardEntry
}> = ({ entryIndex, entryProps }) => {

    return (
        <div className={`cq-leaderboard-entry ${entryIndex == 0 ? 'leaderboard-entry-leader' : (`leaderboard-entry-${isOdd(entryIndex) ? 'odd' : 'even'}`)} `}>
            <CQLeaderboardControl size={'medium'}
                element={<span className={`entry-rank-text ${entryIndex == 0 ? 'rank-text-leader' : (`rank-text-${isOdd(entryIndex+1) ? 'odd' : 'even'}`)} noselect`}>{entryIndex + 1}</span>}/>
            <div className='controls-divider'></div>
            <CQLeaderboardControl size={'small'}
                element={<span className={`entry-lp-text ${entryIndex == 0 ? 'lp-text-leader' : ''} noselect`}>{entryProps.lp.toLocaleString()}</span>}/>
            <div className='controls-divider'></div>
            <CQLeaderboardControl size={'100'}
                element={<></>}/>
            <div className='controls-divider'></div>
            <CQLeaderboardControl size={'40'}
                element={<></>}/>
        </div>
    );
};

const CQLeaderboardControl: React.FC<{
    size: string,
    element: JSX.Element
}> = ({ size, element }) => {

    return (
        <div className={`control-item-${size}`}>
            {element}
        </div>
    );
};

export {
    CQLeaderboardEntry,
    CQLeaderboardControl,
}
{/* <span className={`item-key-${index}`}>{text}</span> */}