/* eslint-disable max-len */
import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import { Knapp } from 'nav-frontend-knapper';
import history from '../../../history';

const EgenmeldingAvbruttKvittering = () => {
    return (
        <div className="js-kvittering js-kvittering--frilanser-sok-senere">
            <Panel style={{ marginBottom: '2rem' }}>
                <div className="panel-innhold" style={{ marginBottom: '2rem' }}>
                    <img
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/red-cancel.svg`}
                        alt="rødt kryss"
                        className="panel-ikon"
                    />
                    <div>
                        <Undertittel tag="h2" style={{ marginTop: '0.5rem' }}>
                            Du har avbrutt egenmeldingen
                        </Undertittel>
                        <Normaltekst style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            Hvis du ønsker å opprette en ny egenmelding kan du gjøre det her:
                        </Normaltekst>
                        <Knapp onClick={() => { return history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`); }}>Opprett egenmelding</Knapp>
                    </div>
                </div>
                <div className="panel-innhold">
                    <img
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/blue-info.svg`}
                        alt="informasjon"
                        className="panel-ikon"
                    />
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Normaltekst style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Hvis du er usikker på hva som gjelder for deg som selvstendig
                            næringsdrivende og frilanser kan du lese
                            {' '}
                            <Lenke href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/sporsmal-og-svar-i-forbindelse-med-koronaviruset/selvstendig-naeringsdrivende-hva-gjelder-i-min-situasjon#chapter-1">
                                mer om det her.
                            </Lenke>
                        </Normaltekst>
                        <Normaltekst>
                            Mer informasjon om egenmeldingstjenesten
                            {' '}
                            <Lenke href="#">finner du her.</Lenke>
                        </Normaltekst>
                    </div>
                </div>
            </Panel>
            <div style={{ marginBottom: '3rem' }}>
                <Bjorn hvit>
                    <Normaltekst style={{ marginBottom: '0.5rem' }}>
                        Folkehelseinsituttet ber alle som har symptomer på koronavirus om å
                        melde fra. Da hjelper du til med å kartlegge situasjonen.
                    </Normaltekst>
                    <Lenke href="https://helsenorge.no/koronavirus/koronasmitte">
                        Meld fra til Folkehelseinsituttet her.
                    </Lenke>
                </Bjorn>
            </div>
        </div>
    );
};

export default EgenmeldingAvbruttKvittering;
