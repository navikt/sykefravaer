import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { getHtmlLedetekst, getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';
import React from 'react';

const DinOkonomiRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--hvit">
            <div className="begrensning">
                <Systemtittel className="blokk-s">{getLedetekst('infoside-fo.dinokonomi.tittel')}</Systemtittel>
                <Normaltekst className="blokk">{getLedetekst('infoside-fo.dinokonomi.tekst')}</Normaltekst>
                <Utvidbar variant="lilla" className="blokk" tittel={getLedetekst('infoside-fo.arbeidsavklaring.overskrift')}>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.arbeidsavklaring.tekst')} />
                </Utvidbar>
                <Element className="blokk-xxxs" tag="h3">{getLedetekst('infoside-fo.forsikring.overskrift')}</Element>
                <Normaltekst>{getLedetekst('infoside-fo.forsikring.tekst')}</Normaltekst>
            </div>
        </div>
    );
};

export default DinOkonomiRad;
