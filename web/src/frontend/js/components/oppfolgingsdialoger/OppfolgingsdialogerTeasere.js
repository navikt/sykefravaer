import React, { PropTypes } from 'react';
import OppfolgingsdialogerTeaser from './OppfolgingsdialogerTeaser';

const OppfolgingsTeasere = ({ oppfolgingsdialoger, className, tittel = '', ingenOppfolgingsdialogerMelding, id }) => {
    return (<div className="blokk--l">
        <header>
            <h2>{tittel}</h2>
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                (oppfolgingsdialoger.length ? oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
                    return <OppfolgingsdialogerTeaser oppfolgingsdialog={oppfolgingsdialog} key={idx} />;
                }) : <p className="panel typo-infotekst">{ingenOppfolgingsdialogerMelding}</p>)
            }
        </div>
    </div>);
};

OppfolgingsTeasere.propTypes = {
    oppfolgingsdialoger: PropTypes.array,
    className: PropTypes.string,
    tittel: PropTypes.string,
    ingenOppfolgingsdialogerMelding: PropTypes.string,
    id: PropTypes.string,
};

export default OppfolgingsTeasere;
