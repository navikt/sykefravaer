import React, { PropTypes } from 'react';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import { Avkrysset } from './opplysninger';

const Oppsummering = ({ sykepengesoknad, ledetekster }) => {
    return (<div>
        <div className="oppsummering__bolk">
            <Avkrysset tekst="Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar." />
        </div>
        <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} />
        <AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

Oppsummering.propTypes = {
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default Oppsummering;
