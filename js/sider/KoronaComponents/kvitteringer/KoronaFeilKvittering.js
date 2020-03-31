/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Normaltekst, Undertittel, Element, Sidetittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import Side from '../../Side';

const brodsmuler = [
    {
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Opprett egenmelding',
    },
    {
        tittel: 'Egenmeldingen ble ikke opprettet',
    },
];

class KoronaFeilKvittering extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { kvitteringFeil } = this.props;

        return (
            <Side
                tittel="Koronameldingen opprettes"
                brodsmuler={brodsmuler}
                laster={false}
            >
                <Sidetittel tag="h1" style={{ marginBottom: '3rem', textAlign: 'center' }}>Egenmeldingen ble ikke opprettet</Sidetittel>
                <Panel style={{ marginBottom: '1rem' }}>
                    <div className="panel-innhold" style={{ display: 'flex' }}>
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
                            Vi kunne ikke opprette egenmeldingen
                            </Undertittel>
                            <Element>Årsak til feilen:</Element>
                            <Normaltekst style={{ marginBottom: '1rem' }}>
                                {kvitteringFeil}
                            </Normaltekst>
                            <Normaltekst style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            Hvis du ønsker å opprette en ny egenmelding kan du gjøre det her:
                            </Normaltekst>
                            <Knapp onClick={() => { window.location.reload(); }}>Opprett egenmelding</Knapp>
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
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
    }
}

KoronaFeilKvittering.propTypes = {
    kvitteringFeil: PropTypes.string,
};

export default KoronaFeilKvittering;
