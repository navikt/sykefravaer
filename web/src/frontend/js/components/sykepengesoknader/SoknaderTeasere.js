import React, { PropTypes } from 'react';
import SoknadTeaser from './SoknadTeaser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const SoknaderTeasere = ({ soknader, className, tittel = '', tomListeTekst, id }) => {
    return (<div className="blokk--l">
        <header className="inngangspanelerHeader">
            <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                (soknader.length ? [...soknader]
                    .map((soknad, idx) => {
                        return <SoknadTeaser key={idx} soknad={soknad} />;
                    }) : <p className="panel typo-infotekst">{tomListeTekst}</p>)
            }
        </div>
    </div>);
};

SoknaderTeasere.propTypes = {
    soknader: PropTypes.arrayOf(sykepengesoknadPt),
    className: PropTypes.string,
    tittel: PropTypes.string,
    tomListeTekst: PropTypes.string,
    id: PropTypes.string,
};

export default SoknaderTeasere;
