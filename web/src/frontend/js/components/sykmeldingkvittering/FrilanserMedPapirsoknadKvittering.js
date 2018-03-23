import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { Bjorn } from '../Hjelpeboble';

export default () => {
    return (<div className="js-kvittering--sok-papir">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg
                    ikon="kvitteringhake.svg"
                    alt="Grønn hake"
                    tittel={getLedetekst('bekreft-sykmelding.skal-opprettes-soknad.steg-1.tittel')} />
                <Kvitteringsteg
                    ikon="kvitteringKonvolutt.svg"
                    alt="Konvolutt"
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
            nokkel="bekreft-sykmelding.skal-opprettes-soknad.bjorn" />
    </div>);
};
