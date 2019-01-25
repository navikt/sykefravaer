import React from 'react';
import { getLedetekst, Bjorn } from '@navikt/digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt, StegvisKvittering } from './Kvitteringsteg';
import { FrilanserSelvstendigKvitteringHotjarTrigger } from '../HotjarTrigger';

const FrilanserMedPapirsoknadKvittering = () => {
    return (<FrilanserSelvstendigKvitteringHotjarTrigger>
        <div className="js-kvittering js-kvittering--sok-papir">
            <div className="panel blokk">
                <StegvisKvittering>
                    <Kvitteringsteg
                        nummer="1"
                        ok
                        tittel={getLedetekst('bekreft-sykmelding.skal-opprettes-soknad.steg-1.tittel')} />
                    <Kvitteringsteg
                        nummer="2"
                        tittel={getLedetekst('bekreft-sykmelding.skal-opprettes-soknad.steg-2.tittel')}>
                        <HtmlAvsnitt
                            nokkel="bekreft-sykmelding.skal-opprettes-soknad.steg-2.tekst" />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
            <Bjorn
                className="blokk"
                hvit
                stor
                nokkel="bekreft-sykmelding.skal-opprettes-soknad.bjorn" />
        </div>
    </FrilanserSelvstendigKvitteringHotjarTrigger>);
};

export default FrilanserMedPapirsoknadKvittering;
