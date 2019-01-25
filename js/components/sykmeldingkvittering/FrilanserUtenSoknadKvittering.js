import React from 'react';
import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnholdGronnHake } from '../IllustrertInnhold';

export default () => {
    return (<div className="panel blokk js-kvittering s-kvittering--standard">
        <IllustrertInnholdGronnHake>
            <h2 className="panel__tittel">
                {getLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel')}
            </h2>
            <div
                className="redaksjonelt-innhold"
                dangerouslySetInnerHTML={getHtmlLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst')} />
        </IllustrertInnholdGronnHake>
    </div>);
};
