import React from 'react';
import { Bjorn, getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';


export const FoerDuBegynner = () => {
    return (<div>
        <div className="sidebanner sidebanner--utenramme">
            <div className="sidebanner__innhold blokk--xl">
                <Bjorn rootUrl={ getContextRoot() } stor hvit vertikal>
                    <p>{ getLedetekst('sykepengesoknad-utland.bjorn') }</p>
                </Bjorn>
            </div>
        </div>
        <div className="begrensning">
            <header className="sidetopp">
                <h1 className="sidetopp__tittel">{ getLedetekst('sykepengesoknad-utland.tittel') }</h1>
            </header>
            <div
                className="panel blokk redaksjonelt-innhold"
                dangerouslySetInnerHTML={ getHtmlLedetekst('sykepengesoknad-utland.tekst') }
            />
            <div className="knapperad">
                <p>
                    <button type="submit" className="knapp">{ getLedetekst('sykepengesoknad-utland.knapp') }</button>
                </p>
                <p>
                    <a className="lenke"
                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        { getLedetekst('sykepengesoknad-utland.personvern') }
                    </a>
                </p>
            </div>
        </div>
    </div>);
};
