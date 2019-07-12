import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingUtvidbar from './ArbeidsrettetOppfolgingUtvidbar';


const KanDuBytteJobb = () => (
    <ArbeidsrettetOppfolgingUtvidbar
        tittel={getLedetekst('ao.jobb.tittel')}
        introTekst={getHtmlLedetekst('ao.jobb.tekst')}
        utvidbarTittel={getLedetekst('ao.friskmelding.tittel')}
        utvidbarInnhold={getHtmlLedetekst('ao.friskmelding.tekst')} />
);

export default KanDuBytteJobb;
