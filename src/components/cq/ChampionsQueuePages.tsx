import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/cq.css';

import { ICQLeaderboardEntries, ICQPage } from '../../imports/interfaces';
import { useInit } from '../../imports/initializers';
import { PlayersContext } from "../../context/PlayerContext";
import { cqControls, FormCQLeaderboardEntry, randomNumber } from '../../imports/utils';
import { CQLeaderboardEntry, CQLeaderboardControl } from './CQLeaderboardEntry';

const CQPageStreams: React.FC<{
    pageProps: ICQPage
}> = ({ pageProps }) => {

    useInit(() => {
        console.log(pageProps.url);
    });

    return (
        <div className={`cq-page cq-page-streams`}>
            
        </div>
    );
};

const CQPageLeaderboards: React.FC<{
    pageProps: ICQPage
}> = ({ pageProps }) => {
    const { t } = useTranslation('common');
    const { allSummoners } = useContext(PlayersContext);

    const [leaderboardLoaded, setLeaderboardLoaded] = useState<boolean>(false);
    const [leaderboardEntries, setLeaderboardEntries] = useState<ICQLeaderboardEntries>(
        allSummoners
            .filterRandomize().filterUniquePlayers(0, 25)
            .map((player, i) => FormCQLeaderboardEntry(i, randomNumber(2000, 2158), player))
    );

    useInit(() => {
        console.log(pageProps.url);
    });

    return (
        <div className={`cq-page cq-page-leaderboards`}>
            <div className='cq-leaderboard-controls-container'>
                <div className='cq-leaderboard-controls-inner'>
                    <CQLeaderboardControl size={'medium'}
                        element={<span className={`item-key noselect`}>{t(cqControls("rank"))}</span>}/>
                    <div className='controls-divider'></div>
                    <CQLeaderboardControl size={'small'}
                        element={<span className={`item-key noselect`}>{t(cqControls("lp"))}</span>}/>
                    <div className='controls-divider'></div>
                    <CQLeaderboardControl size={'100'}
                        element={<span className={`item-key noselect`}>{t(cqControls("name"))}</span>}/>
                    <div className='controls-divider'></div>
                    <CQLeaderboardControl size={'40'}
                        element={<span className={`item-key noselect`}>{t(cqControls("socials"))}</span>}/>
                </div>
            </div>
            <div className='cq-leaderboard-container'>
                {React.Children.toArray(
                    leaderboardEntries.map((entry, i) => (
                        <CQLeaderboardEntry entryIndex={i} entryProps={entry}/>
                    ))
                )}
            </div>
        </div>
    );
};

const CQPageMatches: React.FC<{
    pageProps: ICQPage
}> = ({ pageProps }) => {

    useInit(() => {
        console.log(pageProps.url);
    });

    return (
        <div className={`cq-page cq-page-matches`}>
            
        </div>
    );
};

export {
    CQPageStreams,
    CQPageLeaderboards,
    CQPageMatches
}