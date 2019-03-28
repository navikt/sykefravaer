import { Utvidbar, getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const DinOkonomi = () => {
    return (
        <ArbeidsrettetOppfolgingRad tittel={getLedetekst('ao.okonomi.tittel')}>
            <div className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('ao.okonomi.tittel')} />
            <Utvidbar tittel={getLedetekst('ao.aap.tittel')} className="blokk--s">
                <div dangerouslySetInnerHTML={getHtmlLedetekst('ao.aap.tekst')} />
            </Utvidbar>
        </ArbeidsrettetOppfolgingRad>
    );
};

export default DinOkonomi;
