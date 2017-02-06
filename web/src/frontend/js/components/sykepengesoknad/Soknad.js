import React, { PropTypes } from 'react';
import Oppsummering from './Oppsummering/Oppsummering';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { Utvidbar } from 'digisyfo-npm';
import VaerKlarOverAt from './VaerKlarOverAt';

const Soknad = ({ ledetekster, sykepengesoknad, apentUtdrag = true }) => {
    return (<div>
        <div className="blokk">
            <Utvidbar tittel="Oppsummering" erApen={apentUtdrag}>
                <Oppsummering ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
            </Utvidbar>
        </div>
        <VaerKlarOverAt />
    </div>);
};

Soknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
    apentUtdrag: PropTypes.bool,
};

export default Soknad;
