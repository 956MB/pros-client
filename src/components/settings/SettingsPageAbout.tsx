import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { FormSettingsSection, pAbout, SectionEntryCredit, SettingsEntryChange, SettingsEntryRelease } from "../../imports/utils";
import { ISettingsSectionChangeEntries, ISettingsSectionEntries, ISettingsSectionEntry, ISettingsSectionEntryChange, ISettingsSectionPackageEntries, ISettingsSections } from "../../imports/interfaces";
import { EChangeType, ETooltip } from "../../imports/enums/ui";
import '../css/settings.css';

import { SettingsSection } from "./SettingsSection";
import appPackages from "../../imports/licenses";
import { getProductName } from "../../package-info";

const SettingsPageAbout: React.FC<{
    pageActive: boolean,
}> = ({ pageActive }) => {
    const [t] = useTranslation('common');

    const [sections, setSections] = useState<ISettingsSections>([
        FormSettingsSection("change", "changelog", [
            SettingsEntryChange("3.0.7-beta1", "August 30th, 2022", [
                SettingsEntryRelease(EChangeType.ADDED, "Add Warp terminal integration for macOS - #14329. Thanks @lhvy!"),
                SettingsEntryRelease(EChangeType.ADDED, "Add context menu to the Current Branch and Current Repository toolbar - #13148. Thanks @uttiya10!"),
                SettingsEntryRelease(EChangeType.FIXED, "Older versions of Sublime Text and SlickEdit are also recognized as external editors - #15117. Thanks @vbwx!"),
                SettingsEntryRelease(EChangeType.IMPROVED, "Display a banner when we have a pretext release note to highlight the new feature - #14620"),
                SettingsEntryRelease(EChangeType.REMOVED, "Outdated new drag and drop and split diff new feature callouts removed - #14463")
            ]),
            SettingsEntryChange("3.0.6", "August 24th, 2022", [
                SettingsEntryRelease(EChangeType.FIXED, "Do not show login prompt when repositories are fetched - #15163"),
            ]),
        ], true),
        FormSettingsSection("package", "package",
            appPackages.map((_package) => {
                return _package;
            })
        ),
        FormSettingsSection("credit", "thanks.title", [
            SectionEntryCredit("Jason Chan", "https://www.artstation.com/jasonchan"),
            SectionEntryCredit("Sephi Lash", "https://www.artstation.com/sephilash"),
            SectionEntryCredit("Adrien Gonzalez", "https://www.artstation.com/adrieng"),
            SectionEntryCredit("Riot Games", "https://www.riotgames.com"),
            SectionEntryCredit("Metafy.gg", "https://metafy.gg/")
        ], true),
    ]);

    return (
        <div className={`settings-page-about ${pageActive ? 'page-active' : ''}`}>
            <div className='settings-about-title-container'>
                <span className='settings-about-title-text select'>{getProductName()}</span>
                <a href="https://github.com/956MB/PROSPEC" target="_blank" rel="noopener noreferrer" className="settings-about-button">
                    <span>{t(pAbout("github"))}</span>
                </a>
                <div className="settings-about-button-accent">
                    <span>{t(pAbout("checkForUpdates"))}</span>
                </div>
            </div>
            <div className={`settings-about-version-container ${ETooltip.TOOLTIP}`}>
                <span className={`settings-about-version-text noselect`}>{`v1.1.92.647.ga4397eb7 (Windows 64-bit)`}</span>
                <span className={`${ETooltip.RIGHT} right-close noselect`}>{t(`tooltips.copy`)}</span>
            </div>

            <div className={`settings-about-description`}>
                <span className="select">{t(pAbout(`description`))}</span>
            </div>

            {React.Children.toArray(
                sections.map((section) => (
                    <SettingsSection
                        sectionType={section.type}
                        sectionTitle={t(pAbout(section.title))}
                        sectionEntries={section.entries} />
                ))
            )}
        </div>
    )
}

export {
    SettingsPageAbout
}