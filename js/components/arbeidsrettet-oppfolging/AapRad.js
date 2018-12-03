import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getHtmlLedetekst, getLedetekst, Utvidbar } from 'digisyfo-npm';
import React from 'react';

const AapRad = () => {
    return (
        <div className="infoside-fo__rad infoside-fo__rad--graa">
            <div className="begrensning">
                <Undertittel className="blokk-m">{getLedetekst('infoside-fo.dinokonomi.tittel')}</Undertittel>
                <Element className="blokk-xxs">{getLedetekst('infoside-fo.stotte-overskrift')}</Element>
                <Normaltekst className="blokk-s">{getLedetekst('infoside-fo.stotte-tekst')}</Normaltekst>
                <Utvidbar className="blokk-s" tittel={getLedetekst('infoside-fo.arbeidsavklaring-overskrift')}>
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('infoside-fo.arbeidsavklaring-tekst')} />
                </Utvidbar>
                <Element className="blokk-xxs">{getLedetekst('infoside-fo.forsikring-overskrift')}</Element>
                <Normaltekst>{getLedetekst('infoside-fo.forsikring-tekst')}</Normaltekst>
            </div>
        </div>
    );
};

export default AapRad;
