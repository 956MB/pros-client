import React, { useState } from 'react';

const TitlebarNavButton: React.FC<{
    buttonIcon: string,
    iconAlternate?: string,
    buttonClasses: string,
    onClick: () => void
}> = ({ buttonIcon, iconAlternate, buttonClasses, onClick }) => {
    const [buttonHovered, setButtonHovered] = useState<boolean>(false);

    return (
        <button
            className={`titlebar-button nav-group-button ${buttonClasses} noselect`}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={onClick}>
            <img src={iconAlternate && buttonHovered ? iconAlternate : buttonIcon} alt="icon" id="titlebar-nav-button" />
        </button>
    )
}

const TitlebarNavButtonToggle: React.FC<{
    buttonIcon: string,
    buttonClasses: string,
    buttonToggled: boolean,
    onToggle: () => void,
}> = ({ buttonIcon, buttonToggled, buttonClasses, onToggle }) => {
    const [buttonHovered, setButtonHovered] = useState<boolean>(false);

    return (
        <button
            className={`titlebar-button nav-group-button ${buttonClasses} noselect`}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={() => onToggle()}>
            <img src={buttonIcon} alt="icon" id="titlebar-nav-button" />
        </button>
    )
}

export {
    TitlebarNavButton,
    TitlebarNavButtonToggle
}