import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import { IFilterButton } from '../../../imports/interfaces';
import { caretDownIcon } from "../../../imports/icons";
import { FilterMenu } from "./FilterMenu";
import { useDetectClickOutside } from "react-detect-click-outside";
import { EFilterType } from "../../../imports/enums/ui";
import '../../css/filters.css';

const FilterButton: React.FC<{
    searchAvailable?: boolean,
    filterProps: IFilterButton,
    activeFilters: string[] | number[],
    fToggleFilter: (type: EFilterType, filterValue: string) => void
}> = ({ searchAvailable, filterProps, activeFilters, fToggleFilter }) => {
    const { t } = useTranslation('common');

    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const toggleMenuClosed = (e: any) => {
        if (!filterOpen) { return; }
        e.preventDefault(); e.stopPropagation();
        setFilterOpen(false);
    }
    const buttonRef = useDetectClickOutside({
        onTriggered: (e) => { toggleMenuClosed(e); },
        triggerKeys: ['Escape'],
    });

    return (
        <div
            className={`filter-button ${filterProps.items.length <= 0 ? 'filter-button-disabled' : null} ${!filterOpen && activeFilters.length <= 0 ? 'filter-button-inactive' : null} ${filterProps.type == EFilterType.ROLE ? 'role-container-mod' : ''}`}
            onClick={(e) => setFilterOpen(!filterOpen)}
            ref={buttonRef}>

            {(filterOpen) ?
                <FilterMenu
                    searchAvailable={searchAvailable ? searchAvailable : false}
                    filterItems={filterProps.items}
                    filterType={filterProps.type}
                    activeFilters={activeFilters}
                    fToggleFilter={fToggleFilter}
                    fToggleMenuClose={toggleMenuClosed} /> : null}

            <span className={`filter-text noselect`}>{t(`filters.${filterProps.text}`).toUpperCase()}</span>

            {filterProps.type == EFilterType.ROLE && activeFilters.length >= 1 ?
                <div className={`filter-preview-role`}>
                    {React.Children.toArray(
                        (activeFilters as string[]).map((f, i) =>
                            <img src={`src/assets/icons/lanes/${f}.png`} className={`filter-preview-role-item role-item-${f}`} alt="icon" />
                        )
                    )}
                </div>
            : filterProps.type == EFilterType.REGION && activeFilters.length >= 1 ?
                <div className={`filter-preview-region`}>
                    {React.Children.toArray(
                        (activeFilters as string[]).map((f, i) =>
                            i <= activeFilters.length -2 ?
                                <div className={`${i <= activeFilters.length -2 ? "comma-seperator-container" : "empty-separator"}`}>
                                    <span className={`filter-active noselect`}>{`${f}`}</span>
                                    <span className={`comma noselect`}>{`,`}</span>
                                </div>
                            :
                                <span className={`filter-active noselect`}>{`${f}`}</span>
                        )
                    )}
                </div>
            : filterProps.type == EFilterType.CHAMPION && activeFilters.length >= 1 ?
                <span className={`filter-count noselect`}>{`${activeFilters.length}`}</span>
            : null}

            <img src={caretDownIcon} className={`${filterOpen ? "filter-icon-toggled" : null} noselect`} alt="icon" />
        </div>
    )
}

export default FilterButton;