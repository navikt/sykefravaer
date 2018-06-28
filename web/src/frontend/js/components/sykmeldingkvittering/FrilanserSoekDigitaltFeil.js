import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { FrilanserSelvstendigKvitteringstegEn } from './FrilanserSoekDigitaltNaa';

export default () => {
    return (<div className="panel blokk js-kvittering js-kvittering--sok-naa-frilanser">
        <div className="stegvisKvittering">
            <FrilanserSelvstendigKvitteringstegEn />
            <Kvitteringsteg
                nummer="2"
                feil
                tittel={getLedetekst('bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tittel')}>
                <HtmlAvsnitt
                    tag="div"
                    nokkel="bekreft-sykmelding.kvittering.digital-soknad-feil.steg-2.tekst" />
            </Kvitteringsteg>
        </div>
    </div>);
};
