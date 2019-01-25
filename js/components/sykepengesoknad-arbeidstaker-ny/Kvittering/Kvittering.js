import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnholdGronnHake } from '../../IllustrertInnhold';
import Sidetopp from '../../Sidetopp';

const Kvittering = () => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.tittel')} />
        <div className="panel">
            <IllustrertInnholdGronnHake>
                <h2 className="panel__tittel">Søknaden er sendt!</h2>
                <p>Dette er en plassholder for kvittering.</p>
            </IllustrertInnholdGronnHake>
        </div>
    </div>);
};

export default Kvittering;
