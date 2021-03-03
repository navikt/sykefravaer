import React from 'react';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { getLedetekst } from '../../../digisyfoNpm/ledetekster';
import { Bjorn } from '../../../digisyfoNpm';

const AnnetArbeidsledigKvittering = () => {
    return (
        <div className="js-kvittering js-kvittering--sok-papir">
            <div className="panel blokk">
                <StegvisKvittering className="stegvisKvittering">
                    <Kvitteringsteg
                        nummer="1"
                        ok
                        tittel={getLedetekst('bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.tittel')}>
                        <HtmlAvsnitt nokkel="bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-1.undertekst" />
                    </Kvitteringsteg>
                    <Kvitteringsteg
                        nummer="2"
                        tittel={getLedetekst('bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.tittel')}>
                        <HtmlAvsnitt nokkel="bekreft-sykmelding.annet-arbeidsledig.kvittering.steg-2.undertekst" />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
            <Bjorn
                className="blokk"
                hvit
                stor
                nokkel="bekreft-sykmelding.annet-arbeidsledig.kvittering.bjorn" />
        </div>
    );
};

export default AnnetArbeidsledigKvittering;
