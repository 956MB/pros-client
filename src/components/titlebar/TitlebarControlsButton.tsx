import React from 'react';

const TitlebarControlsButton: React.FC<{
    buttonIcon: string,
    buttonId: string,
    onClick: () => void
}> = ({ buttonIcon, buttonId, onClick }) => {

    return (
        <button
            className="titlebar-controls-button"
            id={buttonId}
            onClick={onClick}>
            <img src={buttonIcon} />
        </button>
    )
}

export default TitlebarControlsButton;