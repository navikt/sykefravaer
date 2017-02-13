import React, { PropTypes } from 'react';
import Oppsummering from './Oppsummering/Oppsummering';
import { Utvidbar } from 'digisyfo-npm';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';

const Soknad = ({ ledetekster, sykepengesoknad, apentUtdrag = true }) => {
    return (<div>
        <div className="blokk">
            <Utvidbar tittel={getLedetekst('sykepengesoknad.oppsummering.tittel', ledetekster)} erApen={apentUtdrag} Overskrift="h2">
                <Oppsummering ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
            </Utvidbar>
        </div>
        <div
            className="panel blokk js-vaer-klar-over-at"
            dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.oppsummering.vaer-klar-over-at', ledetekster)} />
    </div>);
};

Soknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
    apentUtdrag: PropTypes.bool,
};

export default Soknad;
