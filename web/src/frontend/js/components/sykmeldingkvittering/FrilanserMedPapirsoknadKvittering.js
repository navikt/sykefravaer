import React, { Component } from 'react';
import { getLedetekst, Bjorn } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';

class FrilanserMedPapirsoknadKvittering extends Component {
    componentDidMount() {
        if (typeof window.hj === 'function') {
            window.hj('trigger', 'SELVSTENDIG_FRILANS_JULI_2018');
        }
    }

    render() {
        return (<div className="js-kvittering js-kvittering--sok-papir">
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
        </div>);
    }
}

export default FrilanserMedPapirsoknadKvittering;
