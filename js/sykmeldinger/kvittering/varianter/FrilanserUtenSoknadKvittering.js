import React from 'react';
import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
import { IllustrertInnholdGronnHake } from '../../../components/IllustrertInnhold';
import BjornMedUndersokelse from '../felles/BjornMedUndersokelse';

export default () => {
    return (
        <React.Fragment>
            <div className="panel blokk js-kvittering s-kvittering--standard">
                <IllustrertInnholdGronnHake>
                    <h2 className="panel__tittel">
                        {getLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.tittel')}
                    </h2>
                    <div
                        className="redaksjonelt-innhold"
                        dangerouslySetInnerHTML={getHtmlLedetekst('bekreft-sykmelding.skal-ikke-opprettes-soknad.kvittering.undertekst')} />
                </IllustrertInnholdGronnHake>
            </div>
            <BjornMedUndersokelse />
        </React.Fragment>
    );
};
