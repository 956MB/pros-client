import React, { } from 'react';
import './css/searchbar.css';

import { useTranslation } from 'react-i18next';
import { closeIcon, searchIcon } from '../imports/icons';

const SearchBar: React.FC<{
    searchDisabled: boolean,
    value: string,
    fOnChange: (e: any) => void,
    fClearSearch: () => void
}> = ({ searchDisabled, value, fOnChange, fClearSearch }) => {
    const { t } = useTranslation('common');
    const stopPropagation = (e: any) => {
        e.preventDefault(); e.stopPropagation();
    }

    return (
        <div
            className={`search-bar ${(value === '') ? '' : 'search-bar-active'} ${searchDisabled ? 'search-disabled' : ''}`}
            onClick={(e) => stopPropagation(e)}>
                <div
                    className={`icon-container ${(value === '') ? '' : 'icon-clickable'}`}
                    onClick={(value === '') ? () => null : fClearSearch}>
                        <img
                            src={`${(value === '') ? searchIcon : closeIcon}`}
                            className={`${(value === '') ? 'search-icon' : 'close-icon'}`} />
                </div>
                <input
                    type="text"
                    id="fname"
                    name="search"
                    value={value}
                    onFocus={(e) => stopPropagation(e)}
                    onChange={fOnChange}
                    placeholder={t(`titlebar.${location.pathname === '/settings' ? 'searchSettingsPlaceholder' : 'searchPlayersPlaceholder'}`)}
                    spellCheck="false"></input>
        </div>
    )
}

export default SearchBar