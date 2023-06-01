import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SidebarButton from "./SidebarButton";
import '../css/sidebar.css';

import { IPlayer, IPlayers, ISidebarButton, ISidebarButtons } from "../../imports/interfaces";
import { FormSidebarButton } from "../../imports/utils";

import { searchIcon, trophyIcon, playersIcon, historyIcon, settingsIcon, cqIconWhite, cqIconPurple } from "../../imports/icons";
import SidebarFavorite from "./SidebarFavorite";

const Sidebar: React.FC<{
    favorites: IPlayers,
    fNavigatePage: (page: string) => void
}> = ({ favorites, fNavigatePage }) => {
    const { t } = useTranslation('common');
    const [pagesButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sb-live", "sidebar.live", searchIcon, "/", false, () => fNavigatePage("/"), true),
        FormSidebarButton("sb-cq", "sidebar.cq", cqIconWhite, "/champsqueue", false, () => fNavigatePage("/champsqueue")),
        FormSidebarButton("sb-players", "sidebar.players", playersIcon, "/players", true, () => fNavigatePage("/players")),
    ])
    const [lowerButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sb-settings", "sidebar.settings", settingsIcon, "/settings", false, () => fNavigatePage("/settings"))
    ])

    const [intervalActive, setIntervalActive] = useState<boolean>(false);
    const [gameInterval, setGameInterval] = useState<number>(0);

    useEffect(() => {
        if (intervalActive) {
            let interval = setInterval(() => {
                setGameInterval(gameInterval + 1);
            }, 1000)

            return () => {
                clearInterval(interval);
            };
        }
    });

    return (
        <div className={`settings-sidebar`} >
            {/* <div className={`sidebar-logo`}></div> */}
            <div className={`sidebar-group pages-group`}>
                {React.Children.toArray(
                    pagesButtons.map((button, i) => (
                        <SidebarButton
                            extraClass={``}
                            // extraClass={`${i == pagesButtons.length-1 ? 'borders-both' : 'borders-top'}`}
                            buttonProps={button} />
                    ))
                )}
            </div>

            <div className={`sidebar-group settings-group`}>
                {React.Children.toArray(
                    lowerButtons.map((button) => (
                        <SidebarButton
                            extraClass=""
                            // extraClass="borders-top"
                            buttonProps={button} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Sidebar;