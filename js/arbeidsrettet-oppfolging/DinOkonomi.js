import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
import React from 'react';
import ArbeidsrettetOppfolgingUtvidbar from './ArbeidsrettetOppfolgingUtvidbar';
import { pushToDataAOLayer } from './pushToAODataLayer';

const DinOkonomi = () => {
    return (<ArbeidsrettetOppfolgingUtvidbar
        onClick={() => {
            pushToDataAOLayer('LES_MER_AAP');
        }}
        tittel={getLedetekst('ao.okonomi.tittel')}
        introTekst={getHtmlLedetekst('ao.okonomi.tekst')}
        utvidbarTittel={getLedetekst('ao.aap.tittel')}
        utvidbarInnhold={getHtmlLedetekst('ao.aap.tekst')}
    />);
};

export default DinOkonomi;
