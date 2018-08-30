import React from 'react';
import { getLedetekst, Bjorn } from 'digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { FrilanserSelvstendigKvitteringHotjarTrigger } from '../HotjarTrigger';

const FrilanserMedPapirsoknadKvittering = () => {
    return (<FrilanserSelvstendigKvitteringHotjarTrigger>
        <div className="js-kvittering js-kvittering--sok-papir">
            <div className="panel blokk">
                <div className="stegvisKvittering">
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
                </div>
            </div>
            <Bjorn
                className="blokk"
                hvit
                stor
                nokkel="bekreft-sykmelding.skal-opprettes-soknad.bjorn"
                rootUrl={getContextRoot()} />
        </div>
    </FrilanserSelvstendigKvitteringHotjarTrigger>);
};

export default FrilanserMedPapirsoknadKvittering;
