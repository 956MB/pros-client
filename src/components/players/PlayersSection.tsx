import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { EChampions, ERegions, ERoles } from '../../imports/enums/lol';
import FilterButton from "./filter/FilterButton";
import { FormFilterButton, GetChampionFilterItems, GetRegionFilterItems, GetRoleFilterItems } from "../../imports/utils";
import { EFilterType } from "../../imports/enums/ui";

const PlayersSection: React.FC<{
    emptySection?: boolean,
    extraClass?: string,
    sectionIndex: number
    sectionTitle: string,
    sectionTotal: number,
    filterRoles?: ERoles[],
    filterRegions?: ERegions[],
    filterChampions?: EChampions[],
    sectionEmptyMessage: string,
    fToggleFilter?: (type: EFilterType, filterValue: string) => void
}> = ({ emptySection, extraClass, sectionIndex, sectionTitle, sectionTotal, filterRoles, filterRegions, filterChampions, sectionEmptyMessage, fToggleFilter }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`players-section ${sectionTotal <= 0 ? '' : 'sticky-section'} backdrop-blur-${sectionIndex}`}>
            <div className={`players-section-title-container`}>
                <span className={`players-section-title noselect`}>{t(sectionTitle)}</span>

                <div className={`players-section-badge`}>
                    <span className={`noselect`}>{sectionTotal}</span>
                </div>

                {emptySection ? null :
                    <div className={`players-section-filter-container ${filterRoles?.length ?? 0 >= 1 ? 'role-container-mod' : ''} ${extraClass}`}>
                        <FilterButton
                            filterProps={FormFilterButton(EFilterType.ROLE, GetRoleFilterItems())}
                            activeFilters={filterRoles ?? []}
                            fToggleFilter={fToggleFilter ? fToggleFilter : () => {}} />
                        <FilterButton
                            filterProps={FormFilterButton(EFilterType.REGION, GetRegionFilterItems())}
                            activeFilters={filterRegions ?? []}
                            fToggleFilter={fToggleFilter ? fToggleFilter : () => {}} />
                    </div>}
            </div>

            <div className='hor-divider'></div>

            {sectionTotal <= 0 ?
                <span className={`players-section-empty noselect`}>{t(sectionEmptyMessage)}</span>
            : null}
        </div>
    )
}

export default PlayersSection;