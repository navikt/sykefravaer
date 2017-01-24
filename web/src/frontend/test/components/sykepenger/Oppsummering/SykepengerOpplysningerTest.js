import React from 'react';

export const SoknadBool = (bool) => {
    return (<div className="soknadbool">
        <img src="" alt="Avkrysset" />
        <span>
            {(() => {
                if (bool) {
                    return "Ja"
                }
                if (bool === false) {
                    return "Nei"
                }
                return "Ikke besvart";
            })()}
        </span>
    </div>);
}