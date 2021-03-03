import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '../digisyfoNpm';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const Forsikring = () => {
    return (
        <ArbeidsrettetOppfolgingRad tittel={getLedetekst('ao.forsikring.tittel')}>
            <div
                dangerouslySetInnerHTML={getHtmlLedetekst('ao.forsikring.tekst')} />
        </ArbeidsrettetOppfolgingRad>
    );
};

export default Forsikring;
