import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '../digisyfoNpm';
import ArbeidsrettetOppfolgingUtvidbar from './ArbeidsrettetOppfolgingUtvidbar';


const KanDuBytteJobb = () => {
    return (
        <ArbeidsrettetOppfolgingUtvidbar
            tittel={getLedetekst('ao.jobb.tittel')}
            introTekst={getHtmlLedetekst('ao.jobb.tekst')}
            utvidbarTittel={getLedetekst('ao.friskmelding.tittel')}
            utvidbarInnhold={getHtmlLedetekst('ao.friskmelding.tekst')} />
    );
};

export default KanDuBytteJobb;
