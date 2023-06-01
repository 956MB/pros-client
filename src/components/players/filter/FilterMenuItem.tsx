import React, { } from "react";
import { useTranslation } from "react-i18next";
import { EFilterType } from "../../../imports/enums/ui";
import { checkIcon } from "../../../imports/icons";
import { IFilterItem } from "../../../imports/interfaces";
import { arrayTypeString, filterTranslationPath } from "../../../imports/utils";
import '../../css/filters.css';

const FilterMenuItem: React.FC<{
    itemProps: IFilterItem,
    filterType: EFilterType,
    activeFilters: string[] | number[],
    fMenuClickAction: (e: any) => void
}> = ({ itemProps, filterType, activeFilters, fMenuClickAction }) => {
    const { t } = useTranslation('common');

    const getFilterText = (filterKey: string) => {
        if (filterType == EFilterType.ROLE) { return t(`${filterKey.toLowerCase()}`); }
        else if (filterType == EFilterType.REGION) { return t(`${filterKey.toLowerCase()}`); }
        else if (filterType == EFilterType.CHAMPION) { return `${filterKey}`; }
    }
    const ifFilterInactive = (filter: IFilterItem) => {
        if (arrayTypeString(activeFilters)) {
            const activeFiltersString = activeFilters as string[];
            return (activeFiltersString.length >= 1 && !activeFiltersString.includes(filter.value as string))
        } else {
            const activeFiltersNumber = activeFilters as number[];
            return (activeFiltersNumber.length >= 1 && !activeFiltersNumber.includes(filter.value as number))
        }
    }

    return (
        <div
            className={`${ifFilterInactive(itemProps) ? "card-menu-button-dimmed" : "card-menu-button"} noselect}`}
            onClick={(event) => fMenuClickAction(event)} >
                
            {itemProps.image != undefined ? <img src={`src/${itemProps.image}`} alt="filter-image" className={`filter-image filter-image-${filterTranslationPath(itemProps.text, `${filterType}.`)} noselect`} /> : null}

            <span className='noselect'>{getFilterText(itemProps.text)}</span>

            <img src={checkIcon} alt="filter-active-icon" className={`filter-icon noselect`} />
        </div>
    )
}

export {
    FilterMenuItem
}