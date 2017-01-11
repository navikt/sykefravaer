import React, { PropTypes } from 'react';
import SoknaderTeaser from './SoknaderTeaser';

const SoknaderTeasere = ({ soknader, ledetekster, className, tittel = '', tomListeTekst, id }) => {
    return (<div className="blokk--l">
        <header className="inngangspanelerHeader">
            <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                (soknader.length ? soknader.map((soknad, idx) => {
                    return <SoknaderTeaser key={idx} soknad={soknad} ledetekster={ledetekster} />;
                }) : <p className="panel typo-infotekst">{tomListeTekst}</p>)
            }
        </div>
    </div>);
};

SoknaderTeasere.propTypes = {
    soknader: PropTypes.array,
    ledetekster: PropTypes.object,
    className: PropTypes.string,
    tittel: PropTypes.string,
    tomListeTekst: PropTypes.string,
    id: PropTypes.string,
};

export default SoknaderTeasere;
