/* eslint-disable max-len */
import React from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { Knapp } from 'nav-frontend-knapper';
import history from '../../../history';
import { getSykepengesoknaderUrl } from '../../../utils/urlUtils';

const EgenmeldtKvitteringSokNa = () => {
    return (
        <div className="js-kvittering js-kvittering--frilanser-sok-senere">
            <Panel style={{ marginBottom: '2rem' }}>
                <div className="panel-innhold" style={{ marginBottom: '2rem' }}>
                    <img className="panel-ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/green-check.svg`} alt="checkmark" />
                    <Undertittel tag="h2" style={{ marginTop: '0.5rem' }}>Da har du bekreftet og sendt egenmeldingen til NAV</Undertittel>
                </div>
                <div className="panel-innhold" style={{ width: '100%' }}>
                    <img className="panel-ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/aktivert-soknad.svg`} alt="informasjon" />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Undertittel tag="h2" style={{ marginTop: '0.5rem' }}>Nå kan du søke om sykepenger</Undertittel>
                        <Normaltekst style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                            I søknaden svarer du på noen spørsmål vi trenger svar på for å beregne sykepengene dine.
                        </Normaltekst>
                        <Knapp mini style={{ marginBottom: '2rem' }} onClick={() => { history.push(getSykepengesoknaderUrl()); }}>Søk om sykepenger</Knapp>
                        <Element style={{ marginBottom: '0.5rem' }}>Husk: Send inntektsopplysninger så fort som mulig</Element>
                        <Normaltekst style={{ marginBottom: '1rem' }}>
                            Før vi kan behandle søknaden din, må du fylle ut og sende
                            {' '}
                            <Lenke href="https://www.nav.no/soknader/nb/bedrift/inntekt-og-trekk/inntektsopplysninger-sykepenger/NAV%2008-35.01/dokumentinnsending">skjemaet for inntektsopplysninger.</Lenke>
                        </Normaltekst>
                    </div>
                </div>
            </Panel>
            <div style={{ marginBottom: '3rem' }}>
                <Bjorn hvit>
                    <Normaltekst style={{ marginBottom: '0.5rem' }}>Folkehelseinsituttet ber alle som har symptomer på koronavirus om å melde fra. Da hjelper du til med å kartlegge situasjonen.</Normaltekst>
                    <Lenke href="https://helsenorge.no/koronavirus/koronasmitte">Meld fra til Folkehelseinsituttet her.</Lenke>
                </Bjorn>
            </div>
        </div>
    );
};

export default EgenmeldtKvitteringSokNa;
