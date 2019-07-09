import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import {
    motePt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import { visDato, visKlokkeslett } from '../../../utils/datoUtils';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';

const Kvittering = (
    {
        mote,
        deltakertype = BRUKER,
    }) => {
    const tidsted = `${visDato(mote.bekreftetAlternativ.tid).toLowerCase()} kl. ${visKlokkeslett(mote.bekreftetAlternativ.tid)} i ${mote.bekreftetAlternativ.sted}`;
    const innloggetBruker = mote.deltakere.filter((deltaker) => {
        return deltaker.type === deltakertype;
    })[0];

    const nokkel = deltakertype === BRUKER
        ? 'mote.kvittering.bekreftet.ring.arbeidstaker'
        : 'mote.kvittering.bekreftet.ring.arbeidsgiver';
    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{getLedetekst('mote.kvittering.bekreftet.tittel')}</h1>
        </header>
        <div className="panel">
            <h2>{getLedetekst('mote.kvittering.bekreftet.hei')} {innloggetBruker.navn}</h2>
            <div className="blokk">
                <p>{getLedetekst('mote.kvittering.bekreftet.introtekst', { '%TIDSTED%': tidsted })}</p>
                <p>{getLedetekst(nokkel)}</p>
                <p>{getLedetekst('mote.kvittering.bekreftet.hilsen')}</p>
            </div>
        </div>
    </div>);
};

Kvittering.propTypes = {
    mote: motePt,
    deltakertype: moteplanleggerDeltakertypePt,
};

export default Kvittering;
