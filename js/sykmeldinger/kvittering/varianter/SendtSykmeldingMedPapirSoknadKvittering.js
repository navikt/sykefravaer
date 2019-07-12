import React from 'react';
import { getLedetekst, Bjorn } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt, StegvisKvittering } from '../felles/Kvitteringsteg';

const SendtSykmeldingMedPapirSoknadKvittering = () => (
    <div className="js-kvittering js-kvittering--sok-papir">
        <div className="panel blokk">
            <StegvisKvittering>
                <Kvitteringsteg
                    nummer="1"
                    ok
                    tittel={getLedetekst('send-til-arbeidsgiver.kvittering.steg-1.tittel')}>
                    <HtmlAvsnitt nokkel="send-til-arbeidsgiver.kvittering.steg-1.undertekst" />
                </Kvitteringsteg>
                <Kvitteringsteg
                    nummer="2"
                    tittel={getLedetekst('send-til-arbeidsgiver.kvittering.steg-2.tittel')}>
                    <HtmlAvsnitt nokkel="send-til-arbeidsgiver.kvittering.steg-2.undertekst" />
                </Kvitteringsteg>
            </StegvisKvittering>
        </div>
        <Bjorn
            className="blokk"
            hvit
            stor
            nokkel="send-til-arbeidsgiver.kvittering.bjorn" />
    </div>
);

export default SendtSykmeldingMedPapirSoknadKvittering;
