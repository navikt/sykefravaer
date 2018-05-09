import React from 'react';
import { getLedetekst, Bjorn } from 'digisyfo-npm';
import { getContextRoot } from '../../routers/paths';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';

export default () => {
    return (<div className="js-kvittering js-kvittering--sok-papir">
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
            nokkel="bekreft-sykmelding.skal-opprettes-soknad.bjorn"
            rootUrl={getContextRoot()} />
    </div>);
};
