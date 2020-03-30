import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import Side from '../../Side';
import history from '../../../history';

const brodsmuler = [
    {
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Opprett egenmelding',
        sti: '/egensykmelding',
        erKlikkbar: true,
    },
    {
        tittel: 'Egenmeldingen ble ikke opprettet',
    },
];

const KoronaAvbruttKvittering = () => {
    return (
        <Side
            tittel="Koronameldingen opprettes"
            brodsmuler={brodsmuler}
            laster={false}
        >
            <Panel style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex' }}>
                    <img
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/red-cancel.svg`}
                        alt="rødt kryss"
                        style={{
                            marginRight: '2rem',
                            width: '2.5rem',
                            alignSelf: 'flex-start',
                        }}
                    />
                    <div>
                        <Undertittel tag="h2" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Du har avbrutt oppretting av egenmeldingen
                        </Undertittel>
                        <Normaltekst style={{ marginBottom: '1rem' }}>
                            Vil du prøve på nytt, følger du lenken under:
                        </Normaltekst>
                        <Knapp onClick={() => { return history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`); }}>Opprett 16-dagers egenmelding nå</Knapp>
                    </div>
                </div>
            </Panel>
            <Panel>
                <div style={{ display: 'flex' }}>
                    <img
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/blue-info.svg`}
                        alt="informasjon"
                        style={{
                            marginRight: '2rem',
                            width: '2.5rem',
                            alignSelf: 'flex-start',
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Normaltekst style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Er du usikker på hva som gjelder for deg under pandemien?
                            {' '}
                            <Lenke href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/sporsmal-og-svar-i-forbindelse-med-koronaviruset/selvstendig-naeringsdrivende-hva-gjelder-i-min-situasjon#chapter-1">
                                Les mer om sykepenger for selvstendig næringsdrivende og frilansere under koronapandemien.
                            </Lenke>
                        </Normaltekst>
                        <Normaltekst>
                            Les også om:
                            {' '}
                            <Lenke href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykepenger/sykepenger-til-selvstendig-naringsdrivende-og-frilansere">Generelle regler for selvstendig næringsdrivende og frilansere.</Lenke>
                        </Normaltekst>
                    </div>
                </div>
            </Panel>
        </Side>
    );
};

export default KoronaAvbruttKvittering;
