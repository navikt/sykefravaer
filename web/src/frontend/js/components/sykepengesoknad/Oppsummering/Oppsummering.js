import React, { PropTypes } from 'react';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import { Avkrysset } from './opplysninger';
import { getLedetekst } from 'digisyfo-npm';

const Oppsummering = ({ sykepengesoknad, ledetekster }) => {
    return (<div>
        <div className="oppsummering__bolk">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.bekreft-ansvar.label', ledetekster)} />
        </div>
        <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

Oppsummering.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Oppsummering;
