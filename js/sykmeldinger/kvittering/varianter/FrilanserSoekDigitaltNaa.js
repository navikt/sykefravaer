import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt, StegvisKvittering } from '../felles/Kvitteringsteg';
import { getSykepengesoknaderUrl } from '../../../utils/urlUtils';

export const FrilanserSelvstendigKvitteringstegEn = () => (
    <Kvitteringsteg
        nummer="1"
        ok
        tittel={getLedetekst('bekreft-sykmelding.kvittering.digital-soknad.steg-1.tittel')}>
        <HtmlAvsnitt
            tag="div"
            nokkel="bekreft-sykmelding.kvittering.digital-soknad.steg-1.tekst" />
    </Kvitteringsteg>
);

export default () => (
    <div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
        <StegvisKvittering>
            <FrilanserSelvstendigKvitteringstegEn />
            <Kvitteringsteg
                nummer="2"
                aktiv
                tittel={getLedetekst('bekreft-sykmelding.kvittering.sok-na.steg-2.tittel')}>
                <HtmlAvsnitt
                    tag="div"
                    nokkel="bekreft-sykmelding.kvittering.sok-na.steg-2.tekst" />
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
