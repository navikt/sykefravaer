import { Utvidbar, getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const KanDuBytteJobb = () => {
    return (
        <ArbeidsrettetOppfolgingRad tittel={getLedetekst('ao.jobb.tittel')}>
            <div className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('ao.jobb.tekst')} />
            <Utvidbar tittel={getLedetekst('ao.friskmelding.tittel')} className="blokk--s">
                <div dangerouslySetInnerHTML={getHtmlLedetekst('ao.friskmelding.tekst')} />
            </Utvidbar>
        </ArbeidsrettetOppfolgingRad>
    );
};

export default KanDuBytteJobb;
