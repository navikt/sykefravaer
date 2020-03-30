/* eslint-disable max-len */
import React from 'react';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';

const EgenmeldtKvittering = () => {
    return (
        <div className="js-kvittering js-kvittering--frilanser-sok-senere">
            <Panel style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/green-check.svg`} alt="checkmark" style={{ marginRight: '2rem', width: '2.5rem', alignSelf: 'flex-start' }} />
                    <Undertittel tag="h2" style={{ marginTop: '0.5rem' }}>Da har du bekreftet og sendt egenmeldingen til NAV</Undertittel>
                </div>
                <div style={{ display: 'flex' }}>
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/blue-info.svg`} alt="informasjon" style={{ marginRight: '2rem', width: '2.5rem', alignSelf: 'flex-start' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Undertittel tag="h2" style={{ marginTop: '0.5rem' }}>Hva skjer nå?</Undertittel>
                        <Normaltekst style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                                Når de 16 dagene er over, får du beskjed fra oss om å fylle ut
                                søknaden om sykepenger. Allerede nå kan du se tidspunktet under
                            {' '}
                            <Lenke href={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader`}>planlagte søknader</Lenke>
                            {' '}
                                på siden din.
                        </Normaltekst>
                        <Normaltekst style={{ marginBottom: '1rem' }}>
                                Du får en sms eller epost når den er klar.
                        </Normaltekst>
                        <Element style={{ marginBottom: '0.5rem' }}>Send inntektsopplysninger så fort som mulig</Element>
                        <Normaltekst style={{ marginBottom: '1rem' }}>
                                Før vi kan behandle søknaden din, må du fylle ut og sende
                            {' '}
                            <Lenke href="https://www.nav.no/soknader/nb/bedrift/inntekt-og-trekk/inntektsopplysninger-sykepenger/NAV%2008-35.01/dokumentinnsending">skjemaet for inntektsopplysninger</Lenke>
                        </Normaltekst>
                        <Element style={{ marginBottom: '0.5rem' }}>Hvorfor må du vente med å søke?</Element>
                        <Normaltekst>
                                Det er først når perioden på 16 dager er over, at du vet hvor
                                mange dager du prukte. Når vi får beskjed om antall dager, blir
                                utbetalingen riktig.
                        </Normaltekst>
                    </div>
                </div>
            </Panel>
            <div style={{ marginBottom: '3rem' }}>
                <Bjorn hvit>
                    <Normaltekst style={{ marginBottom: '0.5rem' }}>Folkehelseinsituttet ber alle som har symptomer på koronavirus om å melde fra. Da hjelper du til med å kartlegge situasjonen.</Normaltekst>
                    <Lenke href="https://helsehorge.no/koronavirus/koronasmitte">Meld fra til Folkehelseinsituttet her.</Lenke>
                </Bjorn>
            </div>
        </div>
    );
};

export default EgenmeldtKvittering;
