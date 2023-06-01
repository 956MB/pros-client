import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser';
import '../css/settings.css';

import { firstLastClass, pAbout, replaceIssueTag } from "../../imports/utils";
import { ISettingsSectionEntry, ISettingsSectionEntryPackage, ISettingsSectionEntryChange } from "../../imports/interfaces";
import { EChangeType } from "../../imports/enums/ui";
import { downIcon } from "../../imports/icons";

const SettingsSectionEntryCredit: React.FC<{
    positionClass: string,
    sectionEntry: ISettingsSectionEntry
}> = ({ positionClass, sectionEntry }) => {
    const [t] = useTranslation('common');

    return (
        <div className={`settings-about-section-entry ${positionClass}`}>
            <span className="settings-about-section-entry-name select">{sectionEntry.name}</span>
            <span className="settings-about-section-entry-reason noselect">{`${t(pAbout(`thanks.${sectionEntry.name}`))}`}</span>
            <a href={sectionEntry.link} target="_blank" rel="noopener noreferrer" className={`settings-about-section-entry-link select`}>{sectionEntry.link}</a>
        </div>
    )
}

const SettingsSectionEntryChange: React.FC<{
    index: number,
    positionClass: string,
    sectionEntry: ISettingsSectionEntryChange
}> = ({ index, positionClass, sectionEntry }) => {
    const [t] = useTranslation('common');
    const [entryOpen, setEntryOpen] = useState<boolean>(index == 0);

    return (
        <div className={`settings-about-section-entry-change ${entryOpen ? 'entry-open' : ''} ${positionClass} margin-lr-18`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                
                <img src={downIcon} alt="" className='settings-about-section-entry-chevron value-right noselect' />
                {/* TODO: May need to calculate container size if verison numbers are eventually too long */}
                <div className={`entry-change-version-container`}>
                    <span className="settings-about-section-entry-version-change noselect">{sectionEntry.version}</span>
                </div>

                <div className={`entry-change-date-container`}>
                    <span className="settings-about-section-entry-date-change noselect">{sectionEntry.date}</span>
                </div>
                {sectionEntry.changes.length >= 1 ?
                    <span className="settings-about-section-entry-line-change noselect">{sectionEntry.changes.at(0)?.change}</span> : null}
            </div>

            <div className={`settings-about-entry-content`}>
                {React.Children.toArray(
                    sectionEntry.changes.map((change, i) => (
                        <div className={`settings-entry-change-content ${firstLastClass(i, sectionEntry.changes.length, "first-entry", "last-entry")}`}>
                            <div className={`entry-change-tag-container`}>
                                {change.type === EChangeType.FIXED ? <span className="entry-tag entry-tag-fixed select">{t(`tags.${EChangeType.FIXED}`)}</span> : null}
                                {change.type === EChangeType.IMPROVED ? <span className="entry-tag entry-tag-improved select">{t(`tags.${EChangeType.IMPROVED}`)}</span> : null}
                                {change.type === EChangeType.ADDED ? <span className="entry-tag entry-tag-added select">{t(`tags.${EChangeType.ADDED}`)}</span> : null}
                                {change.type === EChangeType.REMOVED ? <span className="entry-tag entry-tag-removed select">{t(`tags.${EChangeType.REMOVED}`)}</span> : null}
                            </div>

                            <span className={`entry-change-text select`}>{parse(replaceIssueTag(change.change))}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

const SettingsSectionEntryPackage: React.FC<{
    positionClass: string,
    sectionEntry: ISettingsSectionEntryPackage
}> = ({ positionClass, sectionEntry }) => {
    const [entryOpen, setEntryOpen] = useState<boolean>(false);

    return (
        <div className={`settings-about-section-entry-package ${entryOpen ? 'entry-open' : ''} ${positionClass} margin-lr-18`}>
            <div
                className={`settings-about-entry-inner`}
                onClick={() => setEntryOpen(!entryOpen)}
            >
                <img src={downIcon} alt="" className='settings-about-section-entry-chevron value-right noselect' />
                <span className="settings-about-section-entry-name-package noselect">{sectionEntry.name}</span>
                <span className="settings-about-section-entry-verison-package noselect">{`${sectionEntry.version}`}</span>
            </div>

            <div className={`settings-about-entry-content`}>
                {/* <div className="settings-about-entry-title-container">
                    <div className="settings-about-entry-content-name select">{sectionEntry.name}</div>
                    <div className="settings-about-entry-content-version select">{sectionEntry.version}</div>
                </div> */}
                {sectionEntry.link ? <div className="settings-about-entry-content-link select">{sectionEntry.link}</div> : null}
                {sectionEntry.license && sectionEntry.license != "" ? <div className="settings-about-entry-content-license select">{sectionEntry.license}</div> : null}
            </div>
        </div>
    )
}

export {
    SettingsSectionEntryCredit,
    SettingsSectionEntryChange,
    SettingsSectionEntryPackage
}