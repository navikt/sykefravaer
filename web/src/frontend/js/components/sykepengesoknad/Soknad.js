import React, { PropTypes } from 'react';
import Oppsummering from './Oppsummering/Oppsummering';
import { Utvidbar } from 'digisyfo-npm';

const Soknad = ({ ledetekster, sykepengesoknad, apentUtdrag = true }) => {
    return (<div>
        <div className="blokk">
            <Utvidbar tittel="Oppsummering" erApen={apentUtdrag} Overskrift="h2">
                <Oppsummering ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
            </Utvidbar>
        </div>
        <div className="panel blokk js-vaer-klar-over-at">
            <p>Vær klar over at</p>
            <ul>
                <li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li>
                <li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li>
                <li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li>
                <li>fristen for å søke sykepenger er som hovedregel 3 måneder</li>
            </ul>
        </div>
    </div>);
};

Soknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
    apentUtdrag: PropTypes.bool,
};

export default Soknad;
