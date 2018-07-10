import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Bjorn, getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';

const Feilmelding = ({ opprettFeilet }) => {
    return (<div aria-live="polite">
        {
            opprettFeilet
                ? (<Alertstripe type="advarsel">
                    <p className="sist">Beklager, det oppstod en feil! Prøv igjen senere.</p>
                </Alertstripe>)
                : null
        }
    </div>);
};

Feilmelding.propTypes = {
    opprettFeilet: PropTypes.bool,
};

export const FoerDuBegynner = ({ opprettSoknad, opprettFeilet, oppretterSoknad }) => {
    return (<div>
        <div className="sidebanner sidebanner--utenramme">
            <div className="sidebanner__innhold blokk--xl">
                <Bjorn rootUrl={getContextRoot()} stor hvit vertikal>
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
                dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad-utland.tekst')}
            />
            <Feilmelding opprettFeilet={opprettFeilet} />
            <div className="knapperad">
                <p>
                    <Hovedknapp
                        disabled={oppretterSoknad}
                        spinner={oppretterSoknad}
                        className="js-submit"
                        onClick={(event) => {
                            event.preventDefault();
                            opprettSoknad();
                        }}>{getLedetekst('sykepengesoknad-utland.knapp')}</Hovedknapp>
                </p>
                <p className="blokk">
                    <a
                        className="lenke"
                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                        target="_blank"
                        rel="noopener noreferrer">
                        { getLedetekst('sykepengesoknad-utland.personvern') }
                    </a>
                </p>
            </div>
        </div>
    </div>);
};

FoerDuBegynner.propTypes = {
    opprettSoknad: PropTypes.func,
    opprettFeilet: PropTypes.bool,
    oppretterSoknad: PropTypes.bool,
};
