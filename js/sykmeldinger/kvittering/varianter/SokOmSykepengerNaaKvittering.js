import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { getSykepengesoknaderUrl } from '../../../utils/urlUtils';

export default () => (
    <div className="panel blokk js-kvittering js-kvittering--sok-naa">
        <StegvisKvittering>
            <Kvitteringsteg
                nummer="1"
                ok
                tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-1.tittel-2')}>
                <HtmlAvsnitt
                    nokkel="sykmelding.kvittering.sok-na.steg-1.tekst-2" />
            </Kvitteringsteg>
            <Kvitteringsteg
                nummer="2"
                aktiv
                tittel={getLedetekst('sykmelding.kvittering.sok-na.steg-2.tittel-2')}>
                <HtmlAvsnitt
                    nokkel="sykmelding.kvittering.sok-na.steg-2.tekst-2" />
                <p className="kvitteringsteg__handling">
                    <a
                        href={getSykepengesoknaderUrl()}
                        className="js-sok knapp knapp--mini">
                        {getLedetekst('sykmelding.kvittering.sok-na.steg-2.knapp')}
                    </a>
                </p>
                <HtmlAvsnitt
                    nokkel="sykmelding.kvittering.sok-na.papir.tekst" />
            </Kvitteringsteg>
        </StegvisKvittering>
    </div>
);
