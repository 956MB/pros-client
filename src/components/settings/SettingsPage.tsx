import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser';

import '../css/settings.css';
import { ISettingsItemValueLanguage, ISettingsPage, ISettingsPageButton, ISettingsPageLanguage } from "../../imports/interfaces";
import { SettingsItem, SettingsItemLanguage, SettingsItemSpacerElement, SettingsItemTitleElement } from "./SettingsItem";

const SettingsPage: React.FC<{
    pageProps: ISettingsPage,
    pageActive?: boolean,
}> = ({ pageProps, pageActive }) => {
    const [t, i18n] = useTranslation('common');
    const langPage = pageProps as ISettingsPageLanguage;
    const [langSelected, setLangSelected] = useState<number>(-1);

    const fLangSelect = (set: number) => {
        setLangSelected(set);
    }

    return (
        <div className={`${pageProps.type === 'lang' ? 'settings-page-lang' : 'settings-page'}`}>
            {React.Children.toArray(
                pageProps.items.map((item, i) => {
                    if (item.itemValue.type === 'title') { return <SettingsItemTitleElement settingsItem={item} /> }
                    if (item.itemValue.type === 'spacer') { return <SettingsItemSpacerElement /> }

                    const valueLang = item.itemValue as ISettingsItemValueLanguage
                    return pageProps.type === 'lang'
                        ?
                        <SettingsItemLanguage
                            itemValue={item.itemValue as ISettingsItemValueLanguage}
                            langSelected={i18n.language === valueLang.lang ? valueLang.value : -1}
                            fLangSelect={fLangSelect}></SettingsItemLanguage>
                        :
                        <SettingsItem
                            settingsItem={item}
                            itemZIndex={pageProps.items.length - i}></SettingsItem>
                })
            )}

            {pageProps.type === 'lang' ?
                <div className="add-language-notice">
                    <span>{t(`settings.pages.language.question`)}</span>
                    <span>{parse(t(`settings.pages.language.add`))}</span>
                </div>
            :   null}
        </div>
    )
}

const SettingsPageButton: React.FC<{
    pageActive: boolean,
    buttonProps: ISettingsPageButton,
    FPageSwitch: (active: number) => void
}> = ({ pageActive, buttonProps, FPageSwitch }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`settings-page-button ${pageActive ? 'page-button-active' : ''} ${buttonProps.disabled ? 'page-button-disabled' : ''}`} onClick={() => FPageSwitch(buttonProps.index)}>
            <div className='page-button-inner'>
                <span className='page-button-text transition-0_08s'>{t(buttonProps.text)}</span>
                {/* <span className='page-button-text transition-0_08s'>{t(buttonProps.text)}</span> */}
                <div className="page-border-bottom"></div>
            </div>
        </div>
    )
}

export {
    SettingsPage,
    SettingsPageButton
}