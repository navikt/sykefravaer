import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt, StegvisKvittering } from '../felles/Kvitteringsteg';
import { FrilanserSelvstendigKvitteringstegEn } from './FrilanserSoekDigitaltNaa';
import BjornMedUndersokelse from '../felles/BjornMedUndersokelse';

export default () => {
    return (
        <React.Fragment>
            <div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
                <StegvisKvittering>
                    <FrilanserSelvstendigKvitteringstegEn />
                    <Kvitteringsteg
                        nummer="2"
                        feil
                        tittel={getLedetekst('bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tittel')}>
                        <HtmlAvsnitt
                            tag="div"
                            nokkel="bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tekst" />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
            <BjornMedUndersokelse />
        </React.Fragment>
    );
};
