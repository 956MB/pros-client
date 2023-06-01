import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/cq.css';

import { ECQData } from '../../imports/enums/lol';
import { ICQPages } from '../../imports/interfaces';
import { FormCQPage, isPageActive, replaceVars } from '../../imports/utils';
import { SettingsPageButton } from '../settings/SettingsPage';
import { CQPageLeaderboards, CQPageMatches, CQPageStreams } from './ChampionsQueuePages';

const ChampionsQueue: React.FC<{

}> = ({ }) => {
    const { t } = useTranslation('common');

    const [pageActive, setPageActive] = useState<number>(0);
    const [cqPages, setCqPages] = useState<ICQPages>([
        FormCQPage(0, 'streams'),
        FormCQPage(1, 'leaderboards', replaceVars(ECQData.URL, { '${DATA}': "leaderboards" })),
        FormCQPage(2, 'matches', replaceVars(ECQData.URL, { '${DATA}': "matches" })),
    ])
    const FPageSwitch = (active: number) => { setPageActive(active); }

    return (
        <div className='cq-container noselect'>
            <div className='cq-scroll'>
                <div className='cq-inner'>
                    <div className='cq-topbar-container'>
                        <div className='cq-page-button-container'>
                            {React.Children.toArray(
                                cqPages.map((page, i) => (
                                    <SettingsPageButton
                                        pageActive={isPageActive(pageActive, i)}
                                        buttonProps={{ index: 0, text: page.title, disabled: false }}
                                        FPageSwitch={() => FPageSwitch(i)} />
                                ))
                            )}
                        </div>
                    </div>

                    <div className='cq-page-container'>
                        {pageActive == 0 ?
                            <CQPageStreams pageProps={cqPages[0]} /> : null}
                        {pageActive == 1 ?
                            <CQPageLeaderboards pageProps={cqPages[1]} /> : null}
                        {pageActive == 2 ?
                            <CQPageMatches pageProps={cqPages[2]} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    ChampionsQueue,
}