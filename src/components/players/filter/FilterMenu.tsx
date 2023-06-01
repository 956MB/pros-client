import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { EFilterType } from "../../../imports/enums/ui";
import { IFilterItems } from "../../../imports/interfaces";
import { filterTranslationPath } from "../../../imports/utils";
import SearchBar from "../../Searchbar";
import { FilterMenuItem } from "./FilterMenuItem";
import '../../css/filters.css';

const FilterMenu: React.FC<{
    searchAvailable: boolean,
    filterItems: IFilterItems,
    filterType: EFilterType,
    activeFilters: string[] | number[],
    fToggleFilter: (type: EFilterType, filter: string) => void,
    fToggleMenuClose: (e: Event, source: string) => void
}> = ({ searchAvailable, filterItems, filterType, activeFilters, fToggleFilter, fToggleMenuClose }) => {
    const { t } = useTranslation('common');
    const [inputValue, setInputValue] = useState<string>("");
    const fInputChange = (e: any) => {
        const { value } = e.target;
        setInputValue(value as string);
    };

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, callback: () => void) => {
        e.preventDefault(); e.stopPropagation();
        callback();
    }

    return (
        <div
            className={`card-menu`} style={{ top: 28, right: 0 }} >
            {searchAvailable ?
                <div className={`card-menu-search-container`}>
                    <SearchBar
                        searchDisabled={false}
                        value={inputValue}
                        fOnChange={fInputChange}
                        fClearSearch={() => setInputValue("")}/>

                    <span className={`reset-filter-button`}>{t(`${"filters.reset"}`)}</span>
                </div>
            : null}
            <div className={`card-menu-item-container card-menu-${filterType}`}>
                {React.Children.toArray(
                    filterItems.map((filterItem, i) => (
                        <FilterMenuItem
                            itemProps={filterItem}
                            filterType={filterType}
                            activeFilters={activeFilters}
                            fMenuClickAction={(event) => {
                                stopPropagation(event, () => fToggleFilter(filterType, filterTranslationPath(filterItem.text, `${filterType}.`)))
                            }}/>
                )))}
            </div>
        </div>
    )
}

export {
    FilterMenu
}