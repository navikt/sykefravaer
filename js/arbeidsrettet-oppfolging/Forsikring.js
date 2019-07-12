import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const Forsikring = () => (
    <ArbeidsrettetOppfolgingRad tittel={getLedetekst('ao.forsikring.tittel')}>
        <div
            dangerouslySetInnerHTML={getHtmlLedetekst('ao.forsikring.tekst')} />
    </ArbeidsrettetOppfolgingRad>
);

export default Forsikring;
