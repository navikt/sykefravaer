import React from 'react';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../IllustrertInnhold';

export default () => {
    return (<div className="panel blokk js-kvittering--standard">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/kvitteringhake.svg" ikonAlt="Hake">
            <h2 className="panel__tittel">
                {getLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel')}
            </h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst')} />
        </IllustrertInnhold>
    </div>);
};
