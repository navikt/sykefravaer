import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { getSykepengesoknaderUrl } from '../../../utils/urlUtils';

export default () => {
    return (
        <div className="panel blokk js-kvittering js-kvittering--sok-naa">
            <StegvisKvittering>
                <Kvitteringsteg
                    nummer="1"
                    ok
                    tittel={getLedetekst('sykmelding.kvittering.sok-na.arbeidsledig.steg-1.tittel')}>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.arbeidsledig.steg-1.tekst" />
                </Kvitteringsteg>
                <Kvitteringsteg
                    nummer="2"
                    aktiv
                    tittel={getLedetekst('sykmelding.kvittering.sok-na.arbeidsledig.steg-2.tittel')}>
                    <p className="kvitteringsteg__handling">
                        <a
                            href={getSykepengesoknaderUrl()}
                            className="js-sok knapp knapp--mini">
                            {getLedetekst('sykmelding.kvittering.sok-na.arbeidsledig.steg-2.knapp')}
                        </a>
                    </p>
                    <HtmlAvsnitt nokkel="sykmelding.kvittering.sok-na.arbeidsledig.papir.tekst" />
                </Kvitteringsteg>
            </StegvisKvittering>
        </div>
    );
};
